<script setup lang="ts">
import favSVG from "@/assets/imgs/m-logo.svg";

useHead({
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "color-scheme", content: "dark" },
  ],
  link: [{ rel: "icon", type: "image/svg+xml", href: favSVG }],
});

useSeoMeta({
  charset: "utf-8",
  title: "Samith Seu",
  description: "This is Samith Seu's Personal Website.",
  ogTitle: "Samith Seu",
  ogDescription: "This is Samith Seu's Personal Website.",
  twitterTitle: "Samith Seu",
  twitterDescription: "This is Samith Seu's Personal Website.",
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
