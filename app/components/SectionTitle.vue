<script lang="ts" setup>
withDefaults(
  defineProps<{
    id: string;
    classNames?: string;
  }>(),
  {
    classNames:
      "text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground",
  },
);
</script>

<template>
  <h2 :id="id" :class="classNames">
    <slot />
  </h2>
</template>
