<script lang="ts" setup>
const allLinks = ref<Array<{ label: string; name: string; path: string }>>([
  { label: "This will go to home page", name: "Home", path: "/" },
  { label: "This will go to about page", name: "About", path: "/about" },
  {
    label: "This will go to projects page",
    name: "Projects",
    path: "/projects",
  },
  {
    label: "This will go to certificates page",
    name: "Certificates",
    path: "/certificates",
  },
  { label: "This will go to blogs page", name: "Blogs", path: "/blogs" },
]);
// for navlink modal
const open = ref<boolean>(false);
const route = useRoute();

// change `open` state to false when route value changes
watch(
  () => route.name,
  () => {
    open.value = false;
  }
);
</script>

<template>
  <header
    class="bg-dark/70 w-full border-b border-zinc-50/10 py-4 px-4 prefer:px-0 sticky top-0 left-0 z-50 backdrop-blur-sm h-fit"
  >
    <nav class="max-w-prefer mx-auto flex items-center justify-between">
      <!-- logo -->
      <NuxtLink
        aria-label="This will go to home page"
        title="Home page"
        to="/"
        class="text-xl font-semibold uppercase flex items-center gap-1 transition duration-200 hover:text-primary"
      >
        <Icon name="ic:round-code" class="text-primary text-3xl" />
        samithseu
      </NuxtLink>

      <!-- nav links -->
      <ul class="hidden md:flex items-center gap-6 *:capitalize *:font-medium">
        <li v-for="link in allLinks" :key="link.name">
          <NuxtLink
            :aria-label="link.label"
            :title="link.name"
            class="transition-colors duration-200 hover:text-primary"
            active-class="text-primary"
            :to="link.path"
            >{{ link.name }}
          </NuxtLink>
        </li>
      </ul>

      <!-- resume button -->
      <div class="flex items-center gap-2">
        <NuxtLink
          aria-label="This will go to resume page"
          title="Samith Seu's Resume"
          class="grid size-7 md:size-8 border border-zinc-50/20 place-items-center rounded-full transition-colors duration-200 hover:bg-zinc-50/20 hover:border-transparent"
          to="https://resume.samith.info"
          target="_blank"
        >
          <Icon name="ic:baseline-attach-file" class="" />
        </NuxtLink>

        <!-- burger menu trigger button -->
        <button
          title="Open menu"
          aria-label="This will open the menu"
          @click="open = true"
          class="md:hidden size-7 md:size-8 border border-zinc-50/20 grid place-items-center rounded-full transition-colors duration-200 hover:bg-zinc-50/20 hover:border-transparent cursor-pointer"
        >
          <Icon name="ic:round-menu" class="text-xl" />
        </button>
      </div>

      <LazySimpleDialog v-model="open" modal-classes="grid place-items-center">
        <ul
          class="flex flex-col items-center gap-7 *:capitalize *:font-medium *:text-2xl"
        >
          <li v-for="link in allLinks" :key="link.name">
            <NuxtLink
              :aria-label="link.label"
              :title="link.name"
              class="transition-colors duration-200 hover:text-primary"
              active-class="text-primary"
              :to="link.path"
              >{{ link.name }}
            </NuxtLink>
          </li>
        </ul>
      </LazySimpleDialog>
    </nav>
  </header>
</template>
