<script lang="ts" setup>
defineProps<{
  class?: string;
}>();
</script>

<template>
  <div
    :class="[
      'rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200',
      $props.class,
    ]"
  >
    <slot />
  </div>
</template>
