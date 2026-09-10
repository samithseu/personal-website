<script lang="ts" setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

useHead({
  htmlAttrs: { lang: "en" },
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "color-scheme", content: "dark light" },
  ],
  link: [
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "alternate icon", type: "image/x-icon", href: "/favicon.ico" },
  ],
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

let mediaQuery: MediaQueryList | null = null;
let updateThemeFn: ((e: MediaQueryList | MediaQueryListEvent) => void) | null = null;

onMounted(() => {
  mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  updateThemeFn = (e: MediaQueryList | MediaQueryListEvent) => {
    if (e.matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  updateThemeFn(mediaQuery);
  mediaQuery.addEventListener("change", updateThemeFn);
});

onBeforeUnmount(() => {
  if (mediaQuery && updateThemeFn) {
    mediaQuery.removeEventListener("change", updateThemeFn);
  }
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
