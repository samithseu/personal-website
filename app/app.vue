<script setup lang="ts">
import favicon from "/favicon.ico";

useHead({
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "color-scheme", content: "dark" },
  ],
  link: [{ rel: "icon", type: "image/svg+xml", href: favicon }],
});

useSeoMeta({
  charset: "utf-8",
  title: "Samith Seu",
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator :throttle="150" color="#15d0ff" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
