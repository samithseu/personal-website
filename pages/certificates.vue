<script lang="ts" setup>
// FOR SEO
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
defineOgImageComponent("EachPage", {
  headline: "personal website",
  title: ttl,
  desc: desc,
});
</script>

<template>
  <h2 class="text-center">This is certificates page!</h2>
</template>
