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
    class="rounded-xl border border-border bg-card p-5 sm:p-6 hover:border-foreground/30 hover:shadow-md transition-all duration-200 space-y-2"
  >
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
      <h3 class="text-base sm:text-lg font-semibold text-foreground">
        {{ title }}
      </h3>
      <span v-if="subtitleRight" class="font-mono text-xs text-muted-foreground whitespace-nowrap">
        {{ subtitleRight }}
      </span>
    </div>
    <div class="font-mono text-xs text-muted-foreground">
      {{ subtitleLeft }}
    </div>
    <p class="text-sm text-muted-foreground leading-relaxed pt-1">
      {{ description }}
    </p>
  </li>
</template>
