const CACHE_TTL: number = 60 * 5;
export default defineCachedEventHandler(
  async (event) => {
    setResponseHeader(event, "Cache-Control", `public, max-age=${CACHE_TTL}`);
    const res = await $fetch<Project[]>(
      "https://api.github.com/users/samithseu/repos"
    );
    return res.filter(
      (project: Project) =>
        project.topics.includes("project") && project.homepage !== ""
    );
  },
  { maxAge: CACHE_TTL }
);
