<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

useSeo({
  title: `Error ${props.error!.statusCode}`,
  description: props.error!.message,
  noPrefix: true,
});
</script>

<template>
  <div
    class="w-full min-h-dvh bg-dark text-white flex flex-col items-center justify-center gap-3 lg:gap-6 px-3 md:px-0"
  >
    <h1 class="text-3xl font-bold text-red-500 sm:text-3xl md:text-5xl">
      {{ props.error!.statusCode }}
    </h1>
    <p class="text-gray-400 text-xl sm:text-2xl text-center">
      <Icon
        name="material-symbols:error-circle-rounded-outline-sharp"
        class="text-xl"
      />
      {{ props.error?.statusMessage }}
    </p>
    <NuxtLink
      class="text-sm border-2 border-red-500/50 rounded-xl hover:border-red-500 px-4 py-2 flex items-center gap-2 border-light transition duration-200"
      to="/"
    >
      <Icon name="tabler:arrow-left" class="text-xl" />
      Back home</NuxtLink
    >
  </div>
</template>
