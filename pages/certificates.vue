<script lang="ts" setup>
import type { useSeoProps } from "~/composables/useSeo";
import { useSeo } from "~/composables/useSeo";

useSeo<useSeoProps>({
  title: "Certificates",
  description:
    "A place where all certificates that Samith Seu has earned throughout his career and studies.",
});
</script>

<template>
  <h2 class="text-center">This is certificates page!</h2>
</template>
