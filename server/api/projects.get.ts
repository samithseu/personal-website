import fs from "node:fs";
import path from "node:path";
import type { Project, GitHubRepo } from "#shared/types/project";

const CACHE_TTL: number = 60 * 5; // 5 minutes

async function getFallbackProjects(): Promise<GitHubRepo[]> {
  try {
    const raw = await useStorage("assets:server").getItem("projects.json");
    if (raw) {
      return typeof raw === "string" ? JSON.parse(raw) : (raw as GitHubRepo[]);
    }
  } catch {
    // Ignore storage lookup error and try direct filesystem fallback
  }

  try {
    const filePath = path.resolve(process.cwd(), "server/assets/projects.json");
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      return JSON.parse(content) as GitHubRepo[];
    }
  } catch {
    // Ignore filesystem read error
  }

  return [];
}

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
    let rawRepos: Project[] = [];
    try {
      rawRepos = await $fetch<Project[]>(
        "https://api.github.com/users/samithseu/repos?per_page=100&sort=updated&direction=desc",
        { headers }
      );
    } catch (error: any) {
      console.warn("Failed to fetch GitHub repositories:", error?.message || error);
    }

    let projects: GitHubRepo[] = [];

    if (Array.isArray(rawRepos) && rawRepos.length > 0) {
      // Filter for valid portfolio projects (non-forks, tagged with "project", having live demo URL)
      projects = rawRepos
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
    }

    // If upstream fetch failed or returned 0 items, use the automated snapshot fallback
    if (projects.length === 0) {
      projects = await getFallbackProjects();
    }

    // CDN / Edge cache: 1m browser max-age, 5m CDN s-maxage, 24h background stale-while-revalidate
    setResponseHeader(
      event,
      "Cache-Control",
      "public, max-age=60, s-maxage=300, stale-while-revalidate=86400"
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
