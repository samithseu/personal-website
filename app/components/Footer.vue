<template>
  <footer
    style="view-transition-name: main-footer"
    class="w-full h-fit px-4 sm:px-6 lg:px-8 py-6 border-t border-border/60 bg-background/50 backdrop-blur-sm transition-colors"
  >
    <div
      class="max-w-prefer mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground"
    >
      <p>
        &copy; {{ new Date().getFullYear() }} Samith Seu &dash; Personal Website
      </p>
      <p class="flex items-center gap-1.5">
        <span>Made with</span>
        <NuxtLink
          title="Nuxt.js official website"
          aria-label="This will go to Nuxt.js official website"
          external
          target="_blank"
          to="https://nuxt.com"
          class="font-medium text-foreground hover:underline underline-offset-4 transition-colors"
          >Nuxt</NuxtLink
        >
        <span class="text-border">/</span>
        <NuxtLink
          class="font-mono hover:text-foreground transition-colors"
          title="Source code"
          aria-label="This will go to this website source code on github"
          external
          target="_blank"
          to="https://github.com/samithseu/personal-website"
          >(source)</NuxtLink
        >
      </p>
    </div>
  </footer>
</template>
