<script lang="ts" setup>
useHead({
  htmlAttrs: { lang: "en" },
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "color-scheme", content: "dark light" },
  ],
  link: [
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  ],
  script: [
    {
      innerHTML: `try { if (window.matchMedia('(prefers-color-scheme: dark)').matches) { document.documentElement.classList.add('dark'); } } catch (_) {}`,
    },
  ],
});

useSeoMeta({
  charset: "utf-8",
  title: "Samith Seu - Web Developer",
  description:
    "Web Developer specializing in crafting responsive, performant, and user-friendly web interfaces.",
});

let mediaQuery: MediaQueryList | null = null;
let updateThemeFn: ((e: MediaQueryList | MediaQueryListEvent) => void) | null =
  null;

onMounted(() => {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
  });

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
    class="min-h-screen flex flex-col justify-between selection:bg-foreground/10"
  >
    <NuxtLoadingIndicator :throttle="150" color="hsl(var(--foreground))" />
    <Header />
    <main class="flex-1 w-full max-w-prefer mx-auto px-6 py-10 sm:py-16">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>
