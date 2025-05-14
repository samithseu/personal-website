<script lang="ts" setup>
import type { useSeoProps } from "~/composables/useSeo";
import { useSeo } from "~/composables/useSeo";

useSeo<useSeoProps>({
  title: "Projects",
  description:
    "Showing all projects that Samith Seu has done in the free time whether it's small or large.",
});
</script>

<template>
  <h2 class="text-center">This is projects page!</h2>
</template>
