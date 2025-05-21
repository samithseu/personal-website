<script lang="ts" setup>
const { allContacts } = useContacts();

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
            <span>My works</span>
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
      <!-- Have a project in mind? -->
      <LazyAskingEnd>
        <h2 class="text-2xl font-bold text-primary text-center">
          Have a project in mind?
        </h2>
        <p class="text-zinc-300 text-center">
          Feel free to reach out to me via:
        </p>
        <ul class="flex flex-wrap justify-center items-center gap-4">
          <li v-for="c in allContacts" :key="c.name">
            <NuxtLink
              :aria-label="c.name"
              :title="c.name"
              :to="c.link"
              class="grid place-items-center border border-primary/50 aspect-square w-8 rounded-full hover:*:text-primary"
            >
              <Icon
                :name="c.iconName"
                class="transition-all duration-200 text-xl"
              />
            </NuxtLink>
          </li>
        </ul>
      </LazyAskingEnd>
    </div>
  </div>
</template>
