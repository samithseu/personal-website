<script lang="ts" setup>
defineProps<{
  title: string;
  subtitleLeft: string;
  subtitleRight?: string;
  description: string;
}>();
</script>

<template>
  <li
    class="border-l-2 px-6 border-primary/30 relative after:content-[''] after:absolute after:rounded-full after:size-3.5 after:left-0 after:bg-primary after:top-1.5 after:-translate-x-[calc(50%+0.5px)] transition-all duration-300 hover:border-primary"
  >
    <h3 class="text-white text-xl font-semibold leading-tight line-clamp-1">
      {{ title }}
    </h3>
    <small class="text-sm text-primary space-x-1 line-clamp-1">
      <span>{{ subtitleLeft }}</span>
      <span v-if="subtitleRight" class="text-lg">•</span>
      <span v-if="subtitleRight">{{ subtitleRight }}</span>
    </small>
    <p class="text-sm mt-2 line-clamp-2 text-zinc-400">
      {{ description }}
    </p>
  </li>
</template>
