<script lang="ts" setup>
withDefaults(
  defineProps<{
    icon?: string;
  }>(),
  {
    icon: "tabler:file-text",
  },
);
</script>

<template>
  <div class="w-fit h-fit flex flex-col items-center gap-3 p-8 sm:p-12 rounded-2xl border border-dashed border-border/80 bg-card/40 backdrop-blur-sm text-center">
    <Icon
      :name="icon"
      class="size-12 text-muted-foreground/50"
    />
    <div>
      <slot />
    </div>
  </div>
</template>
