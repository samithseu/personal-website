<script lang="ts" setup>
const allLinks = ref([
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Certificates", path: "/certificates" },
  { name: "Blogs", path: "/blogs" },
]);
</script>

<template>
  <header class="w-full border-b border-zinc-50/10 py-4 px-4 prefer:px-0">
    <nav class="max-w-prefer mx-auto flex items-center justify-between">
      <!-- logo -->
      <NuxtLink
        to="/"
        class="text-xl font-semibold uppercase flex items-center gap-1 transition duration-200 hover:text-primary"
      >
        <Icon name="ic:round-code" class="text-primary text-2xl" />
        samithseu
      </NuxtLink>

      <!-- nav links -->
      <ul class="hidden md:flex items-center gap-6 *:capitalize *:font-medium">
        <li v-for="link in allLinks" :key="link.name">
          <NuxtLink
            class="transition-colors duration-200 hover:text-primary"
            active-class="text-primary"
            :to="link.path"
            >{{ link.name }}
          </NuxtLink>
        </li>
      </ul>

      <!-- resume button -->
      <NuxtLink
        class="hidden md:grid size-7 md:size-8 border border-zinc-50/20 place-items-center rounded-full transition-colors duration-200 hover:bg-zinc-50/20 hover:border-transparent"
        to="https://resume.samith.info"
        target="_blank"
      >
        <Icon name="ic:baseline-attach-file" class="" />
      </NuxtLink>

      <!-- burger menu trigger button -->
      <button
        class="md:hidden size-7 md:size-8 border border-zinc-50/20 grid place-items-center rounded-full transition-colors duration-200 hover:bg-zinc-50/20 hover:border-transparent cursor-pointer"
      >
        <Icon name="ic:round-menu" class="text-xl" />
      </button>
    </nav>
  </header>
</template>
