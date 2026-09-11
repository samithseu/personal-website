<script lang="ts" setup>
import type { NuxtError } from "#app";

const props = defineProps<{
  error?: NuxtError;
}>();

const statusCode = computed(() => props.error?.statusCode ?? 500);
const statusMessage = computed(
  () =>
    props.error?.statusMessage ||
    props.error?.message ||
    "An unexpected error occurred",
);

useSeo({
  title: `Error ${statusCode.value}`,
  description: statusMessage.value,
  noPrefix: true,
});

const handleClearError = () => clearError({ redirect: "/" });
</script>

<template>
  <div
    class="w-full min-h-dvh bg-background text-foreground bg-grid-pattern flex flex-col items-center justify-center gap-4 px-4 text-center"
  >
    <div
      class="p-8 sm:p-12 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md shadow-2xl flex flex-col items-center gap-4 max-w-md w-full"
    >
      <div class="font-mono text-5xl sm:text-6xl font-extrabold text-destructive">
        {{ statusCode }}
      </div>
      <p class="text-muted-foreground text-base sm:text-lg flex items-center gap-2">
        <Icon name="tabler:info-circle" class="size-5 text-destructive" />
        <span>{{ statusMessage }}</span>
      </p>
      <button
        type="button"
        class="inline-flex items-center gap-2 h-10 px-5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors shadow-xs mt-2 cursor-pointer"
        @click="handleClearError"
      >
        <Icon name="tabler:arrow-left" class="size-4" />
        <span>Back to home</span>
      </button>
    </div>
  </div>
</template>
