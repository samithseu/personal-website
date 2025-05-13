<script lang="ts" setup>
// FOR SEO
import MLogo from "@/assets/imgs/m-logo.svg";
const desc =
  "A place where Samith Seu writes about his experiences and some technologies.";
const ttl = "%s - Blogs";
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
  <h2 class="text-center">This is blogs page!</h2>
</template>
