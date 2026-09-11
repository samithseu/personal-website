import type { Project, GitHubRepo } from "#shared/types/project";

const CACHE_TTL: number = 60 * 5; // 5 minutes

export default defineCachedEventHandler(
  async (event) => {
    const { githubToken } = useRuntimeConfig(event);

    // Standard GitHub API headers
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "samithseu-portfolio",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (githubToken) {
      headers.Authorization = `Bearer ${githubToken}`;
    }

    // Fetch repositories with per_page=100 and sort=updated to prevent silent pagination cut-offs
    let rawRepos: Project[];
    try {
      rawRepos = await $fetch<Project[]>(
        "https://api.github.com/users/samithseu/repos?per_page=100&sort=updated&direction=desc",
        { headers }
      );
    } catch (error: any) {
      console.error("Error fetching GitHub repositories:", error?.message || error);
      throw createError({
        statusCode: error?.response?.status || 500,
        statusMessage: `Failed to fetch projects from GitHub: ${
          error?.message || "Unknown error"
        }`,
      });
    }

    if (!Array.isArray(rawRepos)) {
      console.error("Unexpected response format from GitHub API:", rawRepos);
      throw createError({
        statusCode: 500,
        statusMessage: "Unexpected response format from GitHub API.",
      });
    }

    // Filter for valid portfolio projects (non-forks, tagged with "project", having live demo URL)
    const projects: GitHubRepo[] = rawRepos
      .filter(
        (project: Project) =>
          !project.fork &&
          Array.isArray(project.topics) &&
          project.topics.includes("project") &&
          Boolean(project.homepage?.trim())
      )
      .map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description ?? "",
        topics: p.topics ?? [],
        homepage: p.homepage!,
        html_url: p.html_url,
        updated_at: p.updated_at,
      }))
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );

    // CDN / Edge cache: 5m browser max-age, 1h CDN s-maxage, 24h background stale-while-revalidate
    setResponseHeader(
      event,
      "Cache-Control",
      "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400"
    );

    return projects;
  },
  {
    maxAge: CACHE_TTL,
    staleMaxAge: 60 * 60 * 24, // 24 hours stale fallback if upstream is down or rate-limited
    swr: true,
    name: "github-projects",
    getKey: () => "github-projects",
  }
);

