<script lang="ts" setup>
import type { useSeoProps } from "~/composables/useSeo";
import { useSeo } from "~/composables/useSeo";

useSeo<useSeoProps>({
  title: "About",
  description:
    "Telling more information about Samith Seu also specifying his skills and technologies he's using",
});
</script>

<template>
  <div>
    <h2 class="text-center">This is about page!</h2>
  </div>
</template>
