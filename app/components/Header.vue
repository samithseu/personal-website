<script lang="ts" setup>
type Link = {
  label: string;
  name: string;
  path: string;
  prefetch: boolean;
  iconName: string;
};

const allLinks: readonly Link[] = [
  {
    label: "Go to Home page",
    name: "Home",
    path: "/",
    prefetch: true,
    iconName: "tabler:smart-home",
  },
  {
    label: "Go to About page",
    name: "About",
    path: "/about",
    prefetch: true,
    iconName: "tabler:user",
  },
  {
    label: "Go to Projects page",
    name: "Projects",
    path: "/projects",
    prefetch: true,
    iconName: "tabler:folder-code",
  },
  {
    label: "Go to Certificates page",
    name: "Certificates",
    path: "/certificates",
    prefetch: true,
    iconName: "tabler:award",
  },
  {
    label: "Go to Blogs page",
    name: "Blogs",
    path: "/blogs",
    prefetch: true,
    iconName: "tabler:article",
  },
] as const;

// Change `open` state to false when route value changes
const open = ref<boolean>(false);
watch(
  () => useRoute().path,
  () => (open.value = false),
);
</script>

<template>
  <header
    style="view-transition-name: main-header"
    class="bg-background/92 w-full border-b border-border/60 py-3 px-4 sm:px-6 lg:px-8 sticky top-0 left-0 z-40 backdrop-blur-md h-fit transition-colors"
  >
    <nav class="max-w-prefer mx-auto flex items-center justify-between">
      <!-- logo -->
      <NuxtLink
        aria-label="Samith Seu - Home"
        title="Home page"
        to="/"
        class="flex items-center gap-2.5 text-foreground hover:opacity-80 transition-opacity select-none group"
      >
        <span
          class="size-8 rounded-lg border border-border/70 bg-card/80 flex items-center justify-center text-foreground group-hover:border-foreground/30 transition-colors shadow-2xs"
        >
          <M class="size-4.5" />
        </span>
        <span class="font-mono text-sm font-bold tracking-tight"
          >samith.dev</span
        >
      </NuxtLink>

      <!-- desktop nav links with stable spacing and smooth color transitions -->
      <ul
        class="hidden md:flex items-center gap-1.5 p-1.5 rounded-xl bg-card/60 border border-border/50 backdrop-blur-xs min-w-max"
      >
        <li v-for="link in allLinks" :key="link.name">
          <NuxtLink
            :aria-label="link.label"
            :title="link.name"
            :prefetch="link.prefetch"
            class="text-xs lg:text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-muted/40 border border-transparent select-none"
            exact-active-class="text-foreground! bg-muted border-border/70! shadow-2xs"
            :to="link.path"
          >
            <Icon class="text-base shrink-0" :name="link.iconName" />
            <span class="whitespace-nowrap tracking-normal">{{
              link.name
            }}</span>
          </NuxtLink>
        </li>
      </ul>

      <!-- actions -->
      <div class="flex items-center gap-2">
        <NuxtLink
          aria-label="View resume"
          title="Resume"
          external
          class="grid size-8 rounded-md border border-border/60 place-items-center text-muted-foreground transition-colors duration-200 hover:text-foreground hover:bg-muted/50"
          to="https://resume.samith.dev"
          target="_blank"
        >
          <Icon name="tabler:file-text" class="text-base" />
        </NuxtLink>

        <!-- burger menu trigger button (mobile only) -->
        <button
          type="button"
          title="Open navigation menu"
          aria-label="Open navigation menu"
          @click="open = true"
          class="md:hidden size-8 rounded-md border border-border/60 grid place-items-center text-muted-foreground transition-colors duration-200 hover:text-foreground hover:bg-muted/50 cursor-pointer"
        >
          <Icon name="tabler:menu-2" class="text-lg" />
        </button>
      </div>

      <!-- mobile menu dialog (clean text-only links, no icons) -->
      <LazySimpleDialog
        hydrate-on-media-query="(width <= 768px)"
        v-model="open"
        modal-classes="w-full max-w-xs p-5 rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl space-y-4"
        aria-label="Navigation Menu"
      >
        <div
          class="flex items-center justify-between pb-3 border-b border-border/40"
        >
          <span
            class="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider"
          >
            Navigation
          </span>
          <button
            type="button"
            @click="open = false"
            aria-label="Close navigation menu"
            class="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <Icon name="tabler:x" class="size-4" />
          </button>
        </div>

        <ul class="flex flex-col gap-1.5 w-full">
          <li v-for="link in allLinks" :key="link.name" class="w-full">
            <NuxtLink
              :aria-label="link.label"
              :title="link.name"
              :prefetch="link.prefetch"
              @click="open = false"
              class="block w-full text-center text-muted-foreground transition-all duration-200 hover:text-foreground text-sm font-medium py-2 rounded-lg hover:bg-muted/40 border border-transparent"
              exact-active-class="text-foreground! bg-muted font-semibold! border-border/70! shadow-2xs"
              :to="link.path"
            >
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
      </LazySimpleDialog>
    </nav>
  </header>
</template>
