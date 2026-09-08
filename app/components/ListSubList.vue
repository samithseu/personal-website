<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>

<template>
  <li
    class="rounded-xl border border-border bg-card p-5 sm:p-6 hover:border-foreground/30 hover:shadow-md transition-all duration-200"
  >
    <h3 class="capitalize text-base sm:text-lg font-semibold text-foreground mb-3 font-mono">
      <span class="text-muted-foreground/60 mr-1">//</span>{{ title }}
    </h3>
    <ul
      class="space-y-2 text-sm text-muted-foreground *:flex *:items-center *:gap-2"
    >
      <slot />
    </ul>
  </li>
</template>
