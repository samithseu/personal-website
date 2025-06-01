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
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#15d0ff" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
