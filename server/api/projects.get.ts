export default defineEventHandler(async () => {
  const response = await $fetch<Project[]>(
    "https://api.github.com/users/samithseu/repos"
  );
  return response.filter(
    (project: Project) =>
      project.topics.includes("project") && project.homepage !== ""
  );
});
