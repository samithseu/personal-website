<template>
  <footer
    class="w-full max-w-prefer mx-auto px-6 py-12 text-xs text-muted-foreground border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
  >
    <p>&copy; {{ new Date().getFullYear() }} Samith Seu</p>
    <NuxtLink
      external
      href="https://github.com/samithseu/personal-website"
      target="_blank"
      rel="noopener noreferrer"
      class="prose-link"
    >
      Source
    </NuxtLink>
  </footer>
</template>
