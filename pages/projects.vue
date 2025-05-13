<script lang="ts" setup>
// FOR SEO
import MLogo from "@/assets/imgs/m-logo.svg";
const desc =
  "Showing all projects that Samith Seu has done in the free time whether it's small or large.";
const ttl = "%s - Projects";
useSeoMeta({
  titleTemplate: ttl,
  ogTitle: ttl,
  twitterTitle: ttl,
  description: desc,
  ogDescription: desc,
  twitterDescription: desc,
});
defineOgImageComponent("NuxtSeo", {
  title: ttl,
  description: desc,
  theme: "#15D0FF",
  colorMode: "dark",
  siteLogo: MLogo,
});
</script>

<template>
  <h2 class="text-center">This is projects page!</h2>
</template>
