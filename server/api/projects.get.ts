import type { Project, GitHubRepo } from "#shared/types/project";

const CACHE_TTL = 60 * 5; // 5 minutes

async function getFallbackProjects(): Promise<GitHubRepo[]> {
  try {
    const raw = await useStorage("assets:server").getItem("projects.json");
    if (raw) {
      return typeof raw === "string" ? JSON.parse(raw) : (raw as GitHubRepo[]);
    }
  } catch {
    // Ignore storage lookup error and return empty array
  }
  return [];
}

export default defineCachedEventHandler(
  async (event) => {
    const { githubToken } = useRuntimeConfig(event);

    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "samithseu-portfolio",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (githubToken) {
      headers.Authorization = `Bearer ${githubToken}`;
    }

    const cacheStorage = useStorage("cache");
    const cachedEtag = await cacheStorage.getItem<string>("gh-etag");
    if (cachedEtag) {
      headers["If-None-Match"] = cachedEtag;
    }

    let rawRepos: Project[] | null = null;
    try {
      const response = await $fetch.raw<Project[]>(
        "https://api.github.com/users/samithseu/repos?per_page=100&sort=updated&direction=desc",
        { headers }
      );

      if (response.status === 200 && Array.isArray(response._data)) {
        rawRepos = response._data;
        const newEtag = response.headers.get("etag");
        if (newEtag) {
          await cacheStorage.setItem("gh-etag", newEtag);
          await cacheStorage.setItem("gh-repos", rawRepos);
        }
      }
    } catch (error: any) {
      // 304 Not Modified means cached repos are still valid
      if (error?.status === 304) {
        rawRepos = await cacheStorage.getItem<Project[]>("gh-repos");
      } else {
        console.warn(
          "Failed to fetch GitHub repositories:",
          error?.message || error
        );
      }
    }

    // If fetch failed or threw an error, check cache storage first
    if (!rawRepos) {
      rawRepos = await cacheStorage.getItem<Project[]>("gh-repos");
    }

    let projects: GitHubRepo[] = [];

    if (Array.isArray(rawRepos) && rawRepos.length > 0) {
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
          homepage: p.homepage!.trim(),
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

    // Edge CDN cache: 1m browser max-age, 5m CDN s-maxage, 24h background stale-while-revalidate
    setResponseHeader(
      event,
      "Cache-Control",
      "public, max-age=60, s-maxage=300, stale-while-revalidate=86400"
    );

    return projects;
  },
  {
    maxAge: CACHE_TTL,
    staleMaxAge: 60 * 60 * 24, // 24 hours stale fallback
    swr: true,
    name: "github-projects",
    getKey: () => "github-projects",
  }
);
