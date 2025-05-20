<script lang="ts" setup>
const { icon } = defineProps<{
  icon?: string;
}>();
</script>

<template>
  <div class="w-fit h-fit flex flex-col items-center gap-2 lg:gap-4">
    <Icon
      :name="icon ?? 'tabler:settings'"
      class="text-8xl animate-pulse text-primary"
    />
    <div>
      <slot />
    </div>
  </div>
</template>
