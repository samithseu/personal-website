<script lang="ts" setup>
const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
] as const;
</script>

<template>
  <header
    class="w-full max-w-prefer mx-auto px-6 pt-10 sm:pt-16 pb-4 flex items-center justify-between"
  >
    <NuxtLink
      to="/"
      class="inline-flex items-center text-foreground hover:opacity-75 transition-opacity"
      aria-label="Samith Seu - Home"
    >
      <M class="w-4.5 h-5" />
    </NuxtLink>

    <nav
      aria-label="Main Navigation"
      class="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground"
    >
      <NuxtLink
        v-for="link in navLinks"
        :key="link.label"
        :href="link.href"
        class="transition-colors hover:text-foreground"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
