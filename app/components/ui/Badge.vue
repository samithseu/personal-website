<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    variant?: "default" | "secondary" | "outline" | "destructive";
  }>(),
  {
    variant: "secondary",
  }
);

const variantClasses = computed(() => {
  switch (props.variant) {
    case "default":
      return "border-transparent bg-primary text-primary-foreground shadow-xs hover:bg-primary/80";
    case "outline":
      return "border-border/60 text-foreground";
    case "destructive":
      return "border-transparent bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/80";
    case "secondary":
    default:
      return "border-border/40 bg-secondary text-secondary-foreground hover:bg-secondary/80";
  }
});
</script>

<template>
  <div
    :class="[
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-mono font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      variantClasses,
    ]"
  >
    <slot />
  </div>
</template>
