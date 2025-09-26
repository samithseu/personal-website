<script lang="ts" setup>
defineProps<{
  small?: boolean;
}>();
</script>

<template>
  <p
    :class="
      'mx-auto lg:mx-0 w-max h-max text-xs text-primary bg-primary/5 flex items-center gap-2 border ' +
      (small ? 'border-primary/10 py-0.5 px-2' : 'border-primary/25 py-1 px-3')
    "
  >
    <slot />
  </p>
</template>
