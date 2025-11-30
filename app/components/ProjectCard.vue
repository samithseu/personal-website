<script lang="ts" setup>
const { title } = defineProps<{
  imageUrl?: string;
  title: string;
  description: string;
  tags: Array<string>;
  liveUrl: string;
  sourceUrl: string;
}>();

const cleanedTitle = computed(() => {
  return title.replaceAll("-", " ");
});
</script>

<template>
  <li
    v-if="imageUrl !== undefined"
    class="border border-zinc-50/15 overflow-hidden group hover:border-primary transition-colors duration-200 h-full backdrop-blur-sm"
  >
    <!-- card image -->
    <div class="h-48 overflow-hidden">
      <NuxtImg
        loading="lazy"
        width="700"
        placeholder
        class="aspect-video object-cover h-full w-full"
        :src="imageUrl"
        format="webp"
        quality="80"
        sizes="300px sm:400px md:500px lg:600px"
        :alt="`${title}'s project image'`"
      />
    </div>
    <!-- card content -->
    <div class="p-4 lg:p-6 space-y-4 lg:space-y-5">
      <h3
        class="text-sm lg:text-xl font-semibold transition-colors duration-200 group-hover:text-primary"
      >
        {{ cleanedTitle }}
      </h3>
      <p class="text-sm lg:text-[1rem] line-clamp-2 text-zinc-400">
        {{ description }}
      </p>
      <div class="flex flex-wrap items-center justify-start gap-2">
        <SimpleBadge v-for="t in tags" :key="t" class="mx-0! select-none" small>
          {{ t }}</SimpleBadge
        >
      </div>
      <!-- buttons -->
      <div class="flex items-center justify-start gap-2">
        <NuxtLink
          aria-label="This will go to Samith Seu' resume"
          title="Resume"
          target="_blank"
          :to="liveUrl"
          class="flex items-center gap-2 bg-primary text-dark transition-colors duration-200 hover:bg-primary/70 w-fit border py-1 lg:py-1.5 px-4 capitalize text-sm"
        >
          <span class="text-nowrap">live</span>
          <Icon name="tabler:external-link" class="text-lg" />
        </NuxtLink>
        <NuxtLink
          aria-label="This will go to Samith Seu' resume"
          title="Resume"
          target="_blank"
          :to="sourceUrl"
          class="border border-zinc-50/15 flex items-center gap-2 text-white transition-colors duration-200 hover:bg-zinc-50/15 hover:border-transparent w-fit py-1 lg:py-1.5 px-4 capitalize text-sm"
        >
          <Icon name="tabler:brand-github" class="text-lg" />
          <span class="text-nowrap">source</span>
        </NuxtLink>
      </div>
    </div>
  </li>
  <li
    v-else
    class="border border-zinc-50/15 overflow-hidden group hover:border-primary transition-colors duration-200 h-full backdrop-blur-sm"
  >
    <!-- card content -->
    <div class="p-4 lg:p-6 space-y-4 lg:space-y-5">
      <h3
        class="text-sm lg:text-xl font-semibold transition-colors duration-200 group-hover:text-primary"
      >
        {{ cleanedTitle }}
      </h3>
      <p :title="description" class="text-sm line-clamp-2 text-zinc-400">
        {{ description }}
      </p>
      <div class="flex flex-wrap items-center justify-start gap-2">
        <LazySimpleBadge
          hydrate-on-visible
          v-for="t in tags"
          :key="t"
          class="mx-0! select-none"
          small
        >
          {{ t }}</LazySimpleBadge
        >
      </div>
      <!-- buttons -->
      <div class="flex items-center justify-start gap-2">
        <NuxtLink
          aria-label="This will go to Samith Seu' resume"
          title="Resume"
          target="_blank"
          :to="liveUrl"
          class="flex items-center gap-2 bg-primary text-dark transition-colors duration-200 hover:bg-primary/70 w-fit border py-1 lg:py-1.5 px-4 capitalize text-sm"
        >
          <span class="text-nowrap">live</span>
          <Icon name="tabler:external-link" class="text-lg" />
        </NuxtLink>
        <NuxtLink
          aria-label="This will go to Samith Seu' resume"
          title="Resume"
          target="_blank"
          :to="sourceUrl"
          class="border border-zinc-50/15 flex items-center gap-2 text-white transition-colors duration-200 hover:bg-zinc-50/15 hover:border-transparent w-fit py-1 lg:py-1.5 px-4 capitalize text-sm"
        >
          <Icon name="tabler:brand-github" class="text-lg" />
          <span class="text-nowrap">source</span>
        </NuxtLink>
      </div>
    </div>
  </li>
</template>
