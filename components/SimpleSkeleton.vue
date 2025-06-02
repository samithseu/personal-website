<script lang="ts" setup>
const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <li
    :class="props.class"
    class="border border-zinc-50/5 rounded-xl lg:rounded-2xl overflow-hidden transition-colors duration-200 h-full aspect-video bg-primary/20 animate-pulse"
  ></li>
</template>
