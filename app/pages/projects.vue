<script lang="ts" setup>
const { allContacts } = useContacts();
const config = useRuntimeConfig();
const desc =
  "See what I've been building lately. Browse through my featured projects, view the tech stacks I used, and check out the live demos.";
useSeo({
  title: "Projects",
  description: desc,
  ogImageUrl: config.public.projectsOgImage as string,
});

const { data: projects, error } = await useFetch("/api/projects", {
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});

const searchInput = ref("");
const searchQuery = ref("");
const selectedLanguage = ref("All");

// Supported programming languages & frameworks mapping to GitHub topics
const LANGUAGE_FRAMEWORK_MAP: Record<string, string[]> = {
  Vue: ["vue", "vuejs", "vuejs3"],
  Nuxt: ["nuxt", "nuxtjs", "nuxtjs3", "nuxt-on-github-pages"],
  React: ["react", "reactjs"],
  "Next.js": ["nextjs", "next"],
  Svelte: ["svelte", "sveltekit"],
  Astro: ["astrojs", "astro"],
  "Tailwind CSS": ["tailwindcss", "tailwind"],
  JavaScript: ["javascript", "js"],
  TypeScript: ["typescript", "ts"],
  Laravel: ["laravel"],
  PHP: ["php"],
  Python: ["python", "django", "flask", "fastapi"],
  "Node.js": ["nodejs", "node", "express"],
  "Alpine.js": ["alpinejs"],
  "C#": ["csharp", "c#", ".net", "dotnet"],
  "C++": ["cpp", "c++"],
  C: ["c-lang"],
  Go: ["golang", "go"],
  Rust: ["rust"],
  Java: ["java", "spring", "springboot"],
  Kotlin: ["kotlin"],
  Flutter: ["flutter", "dart"],
  Swift: ["swift"],
  Ruby: ["ruby", "rails"],
  HTML: ["html", "html5"],
  CSS: ["css", "css3", "sass", "scss"],
};

// Dynamically list only languages & frameworks present in the fetched projects
const languageFilters = computed(() => {
  if (!projects.value || !Array.isArray(projects.value)) return ["All"];

  const presentTopics = new Set(
    projects.value.flatMap((p) => p.topics || []).map((t) => t.toLowerCase()),
  );

  const available = Object.keys(LANGUAGE_FRAMEWORK_MAP).filter((label) =>
    LANGUAGE_FRAMEWORK_MAP[label]?.some((alias) =>
      presentTopics.has(alias.toLowerCase()),
    ),
  );

  return ["All", ...available];
});

const filteredProjects = computed(() => {
  if (!projects.value) return [];
  const query = searchQuery.value.trim().toLowerCase();

  return projects.value.filter((p) => {
    // Language / framework filter
    let matchesLanguage = true;
    if (selectedLanguage.value !== "All") {
      const aliases = LANGUAGE_FRAMEWORK_MAP[selectedLanguage.value] || [
        selectedLanguage.value.toLowerCase(),
      ];
      matchesLanguage =
        p.topics?.some((t) =>
          aliases.some((alias) => alias.toLowerCase() === t.toLowerCase()),
        ) ?? false;
    }

    // Search query filter
    if (!query) return matchesLanguage;

    const matchesName = p.name?.toLowerCase().includes(query) ?? false;
    const matchesDesc = p.description?.toLowerCase().includes(query) ?? false;
    const matchesTopic =
      p.topics?.some((t) => t.toLowerCase().includes(query)) ?? false;

    return matchesLanguage && (matchesName || matchesDesc || matchesTopic);
  });
});

const { applyCardTransition, isCardTransitioning } = useCardTransition();

// Debounce text search to ensure smooth typing before morphing cards
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function clearDebounce() {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
}

watch(searchInput, (newVal) => {
  clearDebounce();
  debounceTimer = setTimeout(() => {
    applyCardTransition(() => {
      searchQuery.value = newVal;
    });
  }, 120);
});

onBeforeUnmount(() => {
  clearDebounce();
});

function selectLanguage(lang: string) {
  if (selectedLanguage.value === lang) return;
  applyCardTransition(() => {
    selectedLanguage.value = lang;
  });
}

function clearSearch() {
  clearDebounce();
  searchInput.value = "";
  applyCardTransition(() => {
    searchQuery.value = "";
  });
}

function resetFilters() {
  clearDebounce();
  searchInput.value = "";
  applyCardTransition(() => {
    searchQuery.value = "";
    selectedLanguage.value = "All";
  });
}
</script>

<template>
  <div class="w-full h-fit px-4 py-8 sm:py-12 prefer:px-0">
    <div class="max-w-prefer mx-auto space-y-10 lg:space-y-14">
      <div class="space-y-6">
        <!-- project title & subtitle -->
        <div class="space-y-3">
          <SimpleBadge style="view-transition-name: page-badge">
            <span>My works</span>
          </SimpleBadge>
          <h1
            style="view-transition-name: page-title"
            class="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
          >
            Projects
          </h1>
          <p class="text-muted-foreground text-sm sm:text-base leading-relaxed">
            A collection of
            <span class="text-foreground font-semibold">{{
              projects?.length ?? 0
            }}</span>
            projects I've worked on, from web applications to websites and
            developer tools.
          </p>
          <!-- error -->
          <p v-if="error" class="text-destructive text-sm">
            {{ error?.message ?? "Cannot fetch all projects!" }}
          </p>
        </div>

        <!-- Search bar and language filter buttons in the same row on desktop -->
        <div
          class="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1"
        >
          <!-- Search box -->
          <div class="relative w-full md:w-64 lg:w-72 shrink-0">
            <Icon
              name="tabler:search"
              class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
            />
            <input
              v-model="searchInput"
              type="text"
              placeholder="Search projects..."
              aria-label="Search projects by name, description, or technology"
              class="w-full h-9 pl-9 pr-8 rounded-lg border border-border/70 bg-card/60 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors"
            />
            <button
              v-if="searchInput"
              type="button"
              @click="clearSearch"
              aria-label="Clear search"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded cursor-pointer"
            >
              <Icon name="tabler:x" class="size-3.5" />
            </button>
          </div>

          <!-- Language/framework filter buttons (same row on large screens, horizontally scrollable on mobile) -->
          <div
            v-if="languageFilters.length > 1"
            class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar max-w-full"
          >
            <button
              v-for="lang in languageFilters"
              :key="lang"
              type="button"
              :aria-pressed="selectedLanguage === lang"
              @click="selectLanguage(lang)"
              :class="[
                'rounded-full font-mono text-xs px-3 py-1 transition-colors cursor-pointer border whitespace-nowrap',
                selectedLanguage === lang
                  ? 'bg-primary text-primary-foreground border-primary font-medium'
                  : 'bg-secondary/70 text-secondary-foreground border-border/60 hover:text-foreground hover:bg-secondary',
              ]"
            >
              {{ lang }}
            </button>
          </div>
        </div>

        <!-- projects list with individual card view transitions -->
        <ul
          v-if="filteredProjects.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-5 sm:gap-6 pt-2"
        >
          <li
            v-for="p in filteredProjects"
            :key="p.id"
            :style="
              isCardTransitioning
                ? {
                    viewTransitionName: `project-${String(p.id).replace(/[^a-zA-Z0-9_-]/g, '_')}`,
                  }
                : undefined
            "
            class="h-full list-none"
          >
            <ProjectCard
              :title="p.name!"
              :description="p.description"
              :tags="p.topics"
              :live-url="p.homepage"
              :source-url="p.html_url"
            />
          </li>
        </ul>

        <!-- Empty state when no results found -->
        <div
          v-else-if="!error"
          class="py-12 sm:py-16 text-center space-y-3 border border-dashed border-border/70 rounded-xl bg-card/30"
        >
          <Icon
            name="tabler:folder-off"
            class="size-10 mx-auto text-muted-foreground/50"
          />
          <p class="text-sm font-medium text-foreground">No projects found</p>
          <p class="text-xs text-muted-foreground max-w-xs mx-auto">
            Try adjusting your search query or selecting a different language
            filter.
          </p>
          <button
            type="button"
            @click="resetFilters"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-border/60 bg-background hover:bg-muted text-foreground transition-colors cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      </div>

      <!-- Have a project in mind? -->
      <AskingEnd style="view-transition-name: asking-end">
        <h2
          class="text-xl sm:text-2xl font-bold tracking-tight text-foreground"
        >
          Have a project in mind?
        </h2>
        <p class="text-muted-foreground text-xs sm:text-sm max-w-md">
          Let's talk about how we can work together to bring your ideas to life!
        </p>
        <ul class="flex flex-wrap justify-center items-center gap-3 pt-2">
          <li v-for="c in allContacts" :key="c.name">
            <NuxtLink
              :aria-label="c.name"
              :title="c.name"
              :to="c.link"
              class="size-9 rounded-md border border-border/60 bg-background hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
              external
            >
              <Icon :name="c.iconName" class="text-lg" />
            </NuxtLink>
          </li>
        </ul>
      </AskingEnd>
    </div>
  </div>
</template>
