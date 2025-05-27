<script lang="ts" setup>
const img = useImage();
defineProps<{
  imageUrl: string;
  date: string;
  title: string;
  org: string;
}>();
</script>

<template>
  <li
    class="border border-zinc-50/20 rounded-xl lg:rounded-2xl overflow-hidden group hover:border-primary transition-colors duration-200 h-full backdrop-blur-sm"
  >
    <!-- card image -->
    <div class="h-48 overflow-hidden">
      <NuxtImg
        :src="imageUrl"
        loading="lazy"
        width="600"
        sizes="300px sm:400px md:500px lg:600px"
        quality="65"
        :placeholder="img(imageUrl, { h: 10, f: 'webp', blur: 1, q: 30 })"
        format="webp"
        class="aspect-video object-cover h-full object-top"
        :alt="`${title} certificate image`"
      />
    </div>
    <div class="p-4 lg:p-6 space-y-4 lg:space-y-3">
      <!-- content header -->
      <div class="space-y-1 lg:space-y-1.5">
        <p class="text-sm text-primary flex items-center gap-2">
          <Icon name="tabler:calendar-due" class="text-[1rem]" />
          <span>{{ date }}</span>
        </p>
        <h3
          class="transition-colors duration-200 group-hover:text-primary text-lg font-semibold text-white"
        >
          {{ title }}
        </h3>
        <p class="text-sm text-zinc-400">Issued by {{ org }}</p>
      </div>
      <!-- content body -->
      <p class="text-zinc-400 line-clamp-2 text-sm lg:text-[1rem]">
        This certificate is issued to me by {{ org }} to certify my skills and
        knowledge in {{ title }}.
      </p>
      <!-- content footer -->
      <NuxtLink
        aria-label="This will go to Samith Seu' resume"
        title="Resume"
        target="_blank"
        :to="imageUrl"
        class="flex items-center gap-2 bg-primary text-dark transition-colors duration-200 hover:bg-primary/70 w-fit border py-1 lg:py-1.5 px-4 rounded-full capitalize text-sm"
      >
        <span class="text-nowrap">view credential</span>
        <Icon name="tabler:external-link" class="text-lg" />
      </NuxtLink>
    </div>
  </li>
</template>
