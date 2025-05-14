<script lang="ts" setup>
import type { useSeoProps } from "~/composables/useSeo";
import { useSeo } from "~/composables/useSeo";

useSeo<useSeoProps>({
  title: "Blogs",
  description:
    "A place where Samith Seu writes about his experiences and some technologies.",
});
</script>

<template>
  <h2 class="text-center">This is blogs page!</h2>
</template>
