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
    class="w-full min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 text-center"
  >
    <div class="max-w-[400px] w-full space-y-4">
      <div class="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        Error {{ statusCode }}
      </div>
      <h1 class="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
        {{ statusMessage }}
      </h1>
      <div class="pt-4">
        <button
          type="button"
          class="prose-link text-sm cursor-pointer"
          @click="handleClearError"
        >
          ← Return to home
        </button>
      </div>
    </div>
  </div>
</template>
