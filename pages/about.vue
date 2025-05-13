<script lang="ts" setup>
// FOR SEO
import MLogo from "@/assets/imgs/m-logo.svg";
const desc =
  "Telling more information about Samith Seu also specifying his skills and technologies he's using.";
const ttl = "%s - About";
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
  <div>
    <h2 class="text-center">This is about page!</h2>
  </div>
</template>
