<script lang="ts" setup>
type Link = {
  label: string;
  name: string;
  path: string;
  prefetch: boolean;
  iconName?: string;
};
const allLinks = ref<Link[]>([
  {
    label: "This will go to home page",
    name: "Home",
    path: "/",
    prefetch: false,
    iconName: "tabler:home",
  },
  {
    label: "This will go to about page",
    name: "About",
    path: "/about",
    prefetch: false,
    iconName: "tabler:info-circle",
  },
  {
    label: "This will go to projects page",
    name: "Projects",
    path: "/projects",
    prefetch: true,
    iconName: "tabler:folder-open",
  },
  {
    label: "This will go to certificates page",
    name: "Certificates",
    path: "/certificates",
    prefetch: true,
    iconName: "tabler:certificate",
  },
  {
    label: "This will go to blogs page",
    name: "Blogs",
    path: "/blogs",
    prefetch: false,
    iconName: "tabler:book",
  },
]);

// change `open` state to false when route value changes
const open = ref<boolean>(false);
watch(
  () => useRoute().name,
  () => (open.value = false),
);
</script>

<template>
  <header
    class="bg-dark/70 w-full border-b border-zinc-50/5 py-4 px-4 prefer:px-0 sticky top-0 left-0 z-50 backdrop-blur-md h-fit"
  >
    <nav class="max-w-prefer mx-auto flex items-center justify-between">
      <!-- logo -->
      <NuxtLink aria-label="This will go to home page" title="Home page" to="/">
        <Icon
          name="tabler:code"
          class="text-primary md:text-zinc-400 transition-colors duration-150 md:hover:text-primary text-xl lg:text-2xl"
        />
      </NuxtLink>

      <!-- nav links -->
      <ul class="hidden md:flex items-center gap-7 *:capitalize *:font-medium">
        <li v-for="link in allLinks" :key="link.name">
          <NuxtLink
            :aria-label="link.label"
            :title="link.name"
            :prefetch="link.prefetch"
            class="text-[0.9375rem] text-zinc-400 transition-colors duration-200 hover:text-white hover:font-bold flex items-center gap-1 font-light!"
            active-class="text-white!"
            :to="link.path"
          >
            <Icon class="text-base -mt-0.5" :name="link.iconName!" />
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>

      <!-- resume button -->
      <div class="flex items-center gap-2">
        <NuxtLink
          aria-label="This will go to resume page"
          title="Resume"
          class="grid size-7 md:size-8 border border-zinc-50/15 place-items-center transition-colors duration-200 hover:bg-zinc-50/15 hover:border-transparent"
          to="https://resume.samith.dev"
          target="_blank"
        >
          <Icon name="tabler:paperclip" />
        </NuxtLink>

        <!-- burger menu trigger button -->
        <button
          title="Open menu"
          aria-label="This will open the menu"
          @click="open = true"
          class="md:hidden size-7 md:size-8 border border-zinc-50/15 grid place-items-center transition-colors duration-200 hover:bg-zinc-50/15 hover:border-transparent cursor-pointer"
        >
          <Icon name="tabler:menu-4" class="text-xl" />
        </button>
      </div>

      <LazySimpleDialog
        hydrate-on-media-query="(width <= 768px)"
        v-model="open"
        modal-classes="grid place-items-center"
      >
        <ul
          class="flex flex-col items-center gap-6 *:capitalize *:font-medium *:text-xl"
        >
          <li v-for="link in allLinks" :key="link.name">
            <NuxtLink
              :aria-label="link.label"
              :title="link.name"
              :prefetch="link.prefetch"
              class="text-zinc-400 transition-colors duration-200 hover:text-white hover:font-bold flex items-center gap-2 font-light!"
              active-class="text-white!"
              :to="link.path"
            >
              <Icon class="text-xl -mt-1" :name="link.iconName!" />
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
      </LazySimpleDialog>
    </nav>
  </header>
</template>
