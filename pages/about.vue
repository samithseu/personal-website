<script lang="ts" setup>
// FOR SEO
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
defineOgImageComponent("EachPage", {
  headline: "personal website",
  title: ttl,
  desc: desc,
});
</script>

<template>
  <div>
    <h2 class="text-center">This is about page!</h2>
  </div>
</template>
