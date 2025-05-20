<script lang="ts" setup>
useSeo({
  title: "Projects",
  description:
    "Showing all projects that Samith Seu has done in the free time whether it's small or large.",
});

const { data: projects } = await useFetch<Project[]>("/api/projects");
</script>

<template>
  <div class="w-full h-fit px-4 py-4 prefer:px-0">
    <div
      class="max-w-prefer mx-auto my-4 lg:my-12 xl:my-14 space-y-10 lg:space-y-12 xl:space-y-14 2xl:space-y-16"
    >
      <div class="space-y-4 md:space-y-6 lg:space-y-8">
        <!-- project title & subtitle -->
        <div class="space-y-2 lg:space-y-3">
          <LazySimpleBadge class="md:mx-0">
            <span>Projects</span>
          </LazySimpleBadge>
          <h2 class="capitalize text-center md:text-left text-3xl font-bold">
            Projects
          </h2>
          <p class="text-zinc-400 text-pretty text-center md:text-left">
            A collection of projects I've worked on, from web applications to
            websites and little tools.
          </p>
        </div>
        <!-- projects list -->
        <ul
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:items-start gap-6 lg:gap-8"
        >
          <LazyProjectCard
            v-for="p in projects"
            :key="p.id"
            :title="p.name"
            :description="p.description"
            :tags="p.topics"
            :live-url="p.homepage"
            :source-url="p.html_url"
          />
        </ul>
      </div>
    </div>
  </div>
</template>
