<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>

<template>
  <li
    class="border border-zinc-50/15 p-4 lg:p-6 bg-primary/0 transition-all duration-300 hover:bg-primary/5 hover:border-primary/70 backdrop-blur-sm"
  >
    <h3 class="capitalize text-xl font-bold text-primary mb-2 lg:mb-3">
      {{ title }}
    </h3>
    <ul
      class="list-inside marker:text-primary *:text-zinc-400 space-y-1 lg:space-y-2 *:relative *:pl-5 *:after:content-[''] *:after:absolute *:after:left-0 *:after:top-1/2 *:after:-translate-y-1/2 *:after:size-2 *:after:bg-primary *:text-sm md:*:text-[1rem]"
    >
      <slot />
    </ul>
  </li>
</template>
