<script lang="ts" setup>
const { allContacts } = useContacts();
const desc =
  "Proof of learning! View my verified certificates and credentials.";
useSeo({
  title: "Certificates",
  description: desc,
});

defineOgImage("EachPage.takumi", {
  headline: "personal website",
  title: "Samith Seu - Certificates",
  desc: desc,
});

const { data: certs, error } = await useAsyncData(
  "certificates",
  fetchingCertificates,
  {
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);

const searchInput = ref("");
const searchQuery = ref("");
const selectedOrg = ref("All");
const previewCert = ref<any | null>(null);
const isModalOpen = ref(false);

// Dynamically extract distinct organizations from certificate data
const orgOptions = computed(() => {
  if (!certs.value || !Array.isArray(certs.value)) return ["All"];
  const orgSet = new Set<string>();
  for (const c of certs.value) {
    if (c.org && typeof c.org === "string" && c.org.trim()) {
      orgSet.add(c.org.trim());
    }
  }
  return ["All", ...Array.from(orgSet).sort()];
});

const filteredCerts = computed(() => {
  if (!certs.value) return [];
  const query = searchQuery.value.trim().toLowerCase();

  return certs.value.filter((c: any) => {
    // Organization filter (BTI, HackerRank, All)
    const matchesOrg =
      selectedOrg.value === "All" ||
      c.org?.toLowerCase() === selectedOrg.value.toLowerCase();

    // Search query filter
    if (!query) return matchesOrg;

    const matchesTitle = c.title?.toLowerCase().includes(query) ?? false;
    const matchesIssuer = c.org?.toLowerCase().includes(query) ?? false;
    const matchesDate = c.issue_date?.toLowerCase().includes(query) ?? false;

    return matchesOrg && (matchesTitle || matchesIssuer || matchesDate);
  });
});

const { applyCardTransition } = useCardTransition();

// Debounce text search to ensure smooth typing before morphing cards
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
watch(searchInput, (newVal) => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    applyCardTransition(() => {
      searchQuery.value = newVal;
    });
  }, 120);
});

function selectOrg(org: string) {
  if (selectedOrg.value === org) return;
  applyCardTransition(() => {
    selectedOrg.value = org;
  });
}

function clearSearch() {
  if (debounceTimer) clearTimeout(debounceTimer);
  searchInput.value = "";
  applyCardTransition(() => {
    searchQuery.value = "";
  });
}

function resetFilters() {
  if (debounceTimer) clearTimeout(debounceTimer);
  searchInput.value = "";
  applyCardTransition(() => {
    searchQuery.value = "";
    selectedOrg.value = "All";
  });
}

function openPreview(c: any) {
  previewCert.value = c;
  isModalOpen.value = true;
}
</script>

<template>
  <div class="w-full h-fit px-4 py-8 sm:py-12 prefer:px-0">
    <div class="max-w-prefer mx-auto space-y-10 lg:space-y-14">
      <div class="space-y-6">
        <!-- certificate title & subtitle -->
        <div class="space-y-3">
          <LazySimpleBadge style="view-transition-name: page-badge">
            <span>Qualifications</span>
          </LazySimpleBadge>
          <h1
            style="view-transition-name: page-title"
            class="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
          >
            Certificates
          </h1>
          <p class="text-muted-foreground text-sm sm:text-base leading-relaxed">
            A collection of
            <span class="text-foreground font-semibold">{{
              certs?.length ?? 0
            }}</span>
            certificates and qualifications I've earned throughout my journey.
          </p>
          <p v-if="error" class="text-destructive text-sm">
            {{ error?.message ?? "Cannot fetch all certificates!" }}
          </p>
        </div>

        <!-- Search bar and organization filter buttons in the same row on desktop -->
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
              placeholder="Search certificates..."
              aria-label="Search certificates by title, organization, or date"
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

          <!-- Organization filter buttons (same row on large screens, horizontally scrollable on mobile) -->
          <div
            class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar max-w-full"
          >
            <button
              v-for="org in orgOptions"
              :key="org"
              type="button"
              @click="selectOrg(org)"
              :class="[
                'rounded-full font-mono text-xs px-3.5 py-1 transition-colors cursor-pointer border whitespace-nowrap',
                selectedOrg === org
                  ? 'bg-primary text-primary-foreground border-primary font-medium'
                  : 'bg-secondary/70 text-secondary-foreground border-border/60 hover:text-foreground hover:bg-secondary',
              ]"
            >
              {{ org }}
            </button>
          </div>
        </div>

        <!-- Certificates list with individual card view transitions -->
        <ul
          v-if="filteredCerts.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-5 sm:gap-6 pt-2"
        >
          <li
            v-for="c in filteredCerts"
            :key="c.id"
            :style="{
              viewTransitionName: `cert-${String(c.id).replace(/[^a-zA-Z0-9_-]/g, '_')}`,
            }"
            class="h-full list-none"
          >
            <LazyCertCard
              :image-url="`/certs/${c.url}`"
              :date="c.issue_date"
              :title="c.title"
              :org="c.org"
              @preview="openPreview(c)"
            />
          </li>
        </ul>

        <!-- Empty state when no results found -->
        <div
          v-else-if="!error"
          class="py-12 sm:py-16 text-center space-y-3 border border-dashed border-border/70 rounded-xl bg-card/30"
        >
          <Icon
            name="tabler:certificate-off"
            class="size-10 mx-auto text-muted-foreground/50"
          />
          <p class="text-sm font-medium text-foreground">
            No certificates found
          </p>
          <p class="text-xs text-muted-foreground max-w-xs mx-auto">
            Try adjusting your search query or selecting a different
            organization filter.
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

      <!-- Certificate Modal Preview -->
      <LazySimpleDialog
        v-model="isModalOpen"
        modal-classes="w-full max-w-2xl bg-card border border-border rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
        aria-label="Certificate Preview"
      >
        <div v-if="previewCert" class="flex flex-col">
          <!-- Modal Header -->
          <div
            class="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-border/50 bg-muted/20"
          >
            <div>
              <h3
                class="font-semibold text-foreground text-sm sm:text-base md:text-lg leading-snug"
              >
                {{ previewCert.title }}
              </h3>
              <p class="font-mono text-xs text-muted-foreground mt-0.5">
                {{ previewCert.org }} &bull; {{ previewCert.issue_date }}
              </p>
            </div>
            <button
              type="button"
              @click="isModalOpen = false"
              class="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <Icon name="tabler:x" class="size-5" />
            </button>
          </div>

          <!-- Modal Image Preview -->
          <div
            class="p-3 sm:p-5 bg-muted/10 max-h-[60vh] sm:max-h-[68vh] overflow-auto flex items-center justify-center *:w-full *:h-auto"
          >
            <ImageWithPlaceholder
              :src="`/certs/${previewCert.url}`"
              loading="lazy"
              decoding="async"
              quality="70"
              format="webp"
              imgClasses="w-full h-auto rounded-lg object-contain border border-border/40 shadow-sm"
              :alt="previewCert.title"
            />
          </div>

          <!-- Modal Footer -->
          <div
            class="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-border/50 bg-muted/20"
          >
            <NuxtLink
              :to="`/certs/${previewCert.url}`"
              external
              target="_blank"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-border/60 bg-background/80 hover:bg-muted text-foreground transition-colors"
            >
              <Icon name="tabler:external-link" class="size-3.5" />
              <span>Open full file</span>
            </NuxtLink>
            <button
              type="button"
              @click="isModalOpen = false"
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      </LazySimpleDialog>

      <!-- Have a project in mind? -->
      <LazyAskingEnd style="view-transition-name: asking-end" hydrate-never>
        <h2
          class="text-xl sm:text-2xl font-bold tracking-tight text-foreground"
        >
          Need a skilled developer?
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
      </LazyAskingEnd>
    </div>
  </div>
</template>
