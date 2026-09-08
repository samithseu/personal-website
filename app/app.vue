<script lang="ts" setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import favicon from "/favicon.ico";

useHead({
  htmlAttrs: { lang: "en" },
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "color-scheme", content: "dark light" },
  ],
  link: [{ rel: "icon", type: "image/svg+xml", href: favicon }],
  script: [
    {
      innerHTML: `try { if (window.matchMedia('(prefers-color-scheme: dark)').matches) { document.documentElement.classList.add('dark'); } } catch (_) {}`,
    },
  ],
});

useSeoMeta({
  charset: "utf-8",
  title: "Samith Seu",
});

const keepAlivePages = ["index", "about", "certificates", "blogs"];

onMounted(() => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const updateTheme = (e: MediaQueryList | MediaQueryListEvent) => {
    if (e.matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  updateTheme(media);
  media.addEventListener("change", updateTheme);
});
</script>

<template>
  <div
    class="min-h-svh h-full flex flex-col justify-between transition-colors duration-300"
  >
    <NuxtLoadingIndicator :throttle="150" color="hsl(var(--foreground))" />
    <Header />
    <main class="flex-1">
      <NuxtPage :keepalive="{ include: keepAlivePages }" />
    </main>
    <Footer />
  </div>
</template>
