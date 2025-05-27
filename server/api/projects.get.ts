const CACHE_TTL: number = 60 * 5;
export default defineCachedEventHandler(
  async (event) => {
    const { githubToken } = useRuntimeConfig(event);

    // setting headers
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
    };
    if (githubToken) {
      headers.Authorization = `Bearer ${githubToken}`;
    }

    // fetching datas
    let rawRepos: Project[];
    try {
      rawRepos = await $fetch<Project[]>(
        "https://api.github.com/users/samithseu/repos",
        { headers }
      );
    } catch (error: Error | any) {
      console.error("Error fetching GitHub repositories:", error.message);
      throw createError({
        statusCode: error.response?.status || 500,
        statusMessage: `Failed to fetch projects from GitHub: ${
          error.message || "Unknown error"
        }`,
      });
    }

    // validating response types
    if (!Array.isArray(rawRepos)) {
      console.error("Unexpected response format from GitHub API:", rawRepos);
      throw createError({
        statusCode: 500,
        statusMessage: "Unexpected response format from GitHub API.",
      });
    }

    // filter github repos
    const projects: GitHubRepo[] = rawRepos
      .filter(
        (project: Project) =>
          Array.isArray(project.topics) &&
          project.topics.includes("project") &&
          project.homepage &&
          project.homepage !== ""
      )
      .map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        topics: p.topics,
        homepage: p.homepage,
        html_url: p.html_url,
      }));

    // caching for client-side/CDN
    setResponseHeader(
      event,
      "Cache-Control",
      `public, max-age=${CACHE_TTL}, s-maxage=${CACHE_TTL}`
    );
    // return filtered projects (repos)
    return projects;
  },
  // caching for server-side/edge
  { maxAge: CACHE_TTL, swr: true }
);
