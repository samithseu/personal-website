<script lang="ts" setup>
useSeo({
  title: "Projects",
  description:
    "Showing all projects that Samith Seu has done in the free time whether it's small or large.",
});
</script>

<template>
  <div class="w-full h-fit px-4 py-4 lg:py-0 prefer:px-0">
    <div
      class="max-w-prefer mx-auto my-4 lg:my-12 xl:my-14 space-y-10 lg:space-y-12 xl:space-y-14 2xl:space-y-16"
    >
      <!-- project title & subtitle -->
      <div class="space-y-2 lg:space-y-3">
        <LazySimpleBadge>
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
    </div>
  </div>
</template>
