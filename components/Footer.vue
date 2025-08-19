<template>
  <footer
    class="w-full h-fit px-4 prefer:px-0 py-4 border-t border-zinc-50/5 bg-dark *:text-center"
  >
    <div
      class="max-w-prefer mx-auto flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between"
    >
      <p class="text-zinc-400 text-sm">
        &copy; {{ new Date().getFullYear() }} Samith Seu - Personal Website
      </p>
      <p
        class="text-zinc-400 text-sm [&:has(span)_span]:text-primary flex items-center gap-1 mx-auto md:mx-0 [&:has(a)_a:hover]:text-primary [&:has(a)_a]:transition-colors [&:has(a)_a]:duration-200"
      >
        Made with
        <NuxtLink
          title="Nuxt.js official website"
          aria-label="This will go to Nuxt.js official website"
          target="_blank"
          to="https://nuxt.com"
          >Nuxt.js</NuxtLink
        >
        and
        <Icon name="tabler:heart-filled" size="medium" />
        <NuxtLink
          class="font-mono"
          title="Source code"
          aria-label="This will go to this website source code on github"
          target="_blank"
          to="https://github.com/samithseu/personal-website"
          >(source)</NuxtLink
        >
      </p>
    </div>
  </footer>
</template>
