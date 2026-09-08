<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

const props = withDefaults(
  defineProps<{
    variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive";
    size?: "default" | "sm" | "lg" | "icon";
    to?: RouteLocationRaw | string;
    href?: string;
    target?: string;
    external?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  {
    variant: "default",
    size: "default",
    type: "button",
  }
);

const variantClasses = computed(() => {
  switch (props.variant) {
    case "secondary":
      return "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/40";
    case "outline":
      return "border border-border/60 bg-background hover:bg-muted hover:text-foreground text-foreground";
    case "ghost":
      return "hover:bg-muted hover:text-foreground text-foreground";
    case "destructive":
      return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
    case "link":
      return "text-foreground underline-offset-4 hover:underline p-0 h-auto";
    case "default":
    default:
      return "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs";
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "h-8 rounded-md px-3 text-xs";
    case "lg":
      return "h-11 rounded-md px-8 text-base";
    case "icon":
      return "size-9 rounded-md p-0 flex items-center justify-center";
    case "default":
    default:
      return "h-10 px-4 py-2 rounded-md text-sm";
  }
});

const baseClasses =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer";
</script>

<template>
  <NuxtLink
    v-if="to || href"
    :to="to || href"
    :target="target"
    :external="external"
    :class="[baseClasses, variantClasses, sizeClasses]"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="[baseClasses, variantClasses, sizeClasses]"
  >
    <slot />
  </button>
</template>
