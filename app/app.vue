<script lang="ts" setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
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
  <div
    class="min-h-svh h-full grid grid-rows-[auto_1fr_auto] transition-discrete duration-300"
  >
    <NuxtLoadingIndicator :throttle="150" color="#15d0ff" />
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>
