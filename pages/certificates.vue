<script lang="ts" setup>
// FOR SEO
import MLogo from "@/assets/imgs/m-logo.svg";
const desc =
  "A place where all certificates that Samith Seu has earned throughout his career and studies.";
const ttl = "%s - Certificates";
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
  <h2 class="text-center">This is certificates page!</h2>
</template>
