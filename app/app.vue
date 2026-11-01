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
});

useSeoMeta({
  charset: "utf-8",
  title: "Samith Seu - Website",
  description:
    "Web Developer specializing in crafting responsive, performant, and user-friendly web interfaces.",
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col justify-between selection:bg-foreground/10"
  >
    <NuxtLoadingIndicator :throttle="150" color="hsl(var(--foreground))" />
    <main class="flex-1 w-full max-w-prefer mx-auto px-6 py-12 sm:py-20">
      <NuxtPage />
    </main>
    <LazyFooter hydrate-never />
  </div>
</template>
