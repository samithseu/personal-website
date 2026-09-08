<script lang="ts" setup>
defineProps<{
  small?: boolean;
}>();
</script>

<template>
  <div
    :class="[
      'inline-flex items-center gap-1.5 rounded-full font-mono border border-border/60 bg-secondary/70 text-secondary-foreground transition-colors',
      small ? 'text-[11px] px-2.5 py-0.5' : 'text-xs px-3.5 py-1 font-medium'
    ]"
  >
    <slot />
  </div>
</template>
