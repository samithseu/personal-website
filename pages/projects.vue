<script lang="ts" setup>
// FOR SEO
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
defineOgImageComponent("EachPage", {
  headline: "personal website",
  title: ttl,
  desc: desc,
});
</script>

<template>
  <h2 class="text-center">This is projects page!</h2>
</template>
