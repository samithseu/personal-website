<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div
    class="w-full min-h-dvh bg-dark text-white flex flex-col items-center justify-center gap-3 lg:gap-6 px-3 md:px-0"
  >
    <h1 class="text-2xl font-bold text-primary sm:text-3xl md:text-5xl">
      {{ props.error!.statusCode }}
    </h1>
    <p class="text-red-500 text-xl sm:text-2xl text-center">
      <Icon
        name="material-symbols:error-circle-rounded-outline-sharp"
        class="text-xl"
      />
      {{ props.error!.message }}
    </p>
    <NuxtLink
      class="border-2 rounded-xl hover:border-primary/50 px-4 py-2 flex items-center gap-2 border-light transition duration-200"
      to="/"
    >
      <Icon name="tabler:arrow-left" class="text-xl" />
      Back home</NuxtLink
    >
  </div>
</template>
