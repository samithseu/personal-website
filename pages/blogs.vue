<script lang="ts" setup>
// FOR SEO
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
defineOgImageComponent("EachPage", {
  headline: "personal website",
  title: ttl,
  desc: desc,
});
</script>

<template>
  <h2 class="text-center">This is blogs page!</h2>
</template>
