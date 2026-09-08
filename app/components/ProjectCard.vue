<script lang="ts" setup>
const props = defineProps<{
  title: string;
  description: string;
  tags?: Array<string>;
  liveUrl?: string;
  sourceUrl?: string;
}>();
</script>

<template>
  <article
    class="rounded-xl border border-border bg-card hover:border-foreground/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group h-full"
  >
    <!-- Card Top / Body -->
    <div class="p-5 sm:p-6 space-y-3.5 flex-1 flex flex-col">
      <!-- Header with Title and Quick Links -->
      <div class="flex items-start justify-between gap-3">
        <h3
          class="text-lg font-semibold capitalize text-foreground leading-snug"
        >
          {{ props.title.replaceAll("-", " ") }}
        </h3>
        <div class="flex items-center gap-1 text-muted-foreground">
          <NuxtLink
            v-if="props.liveUrl"
            :to="props.liveUrl"
            external
            target="_blank"
            title="Live Demo"
            :aria-label="`Live demo of ${props.title}`"
            class="p-1 rounded hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <Icon name="tabler:external-link" class="size-4" />
          </NuxtLink>
          <NuxtLink
            v-if="props.sourceUrl"
            :to="props.sourceUrl"
            external
            target="_blank"
            title="Source Code"
            :aria-label="`Source code of ${props.title}`"
            class="p-1 rounded hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <Icon name="tabler:brand-github" class="size-4" />
          </NuxtLink>
        </div>
      </div>

      <!-- Description -->
      <p
        :title="props.description"
        class="text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1"
      >
        {{ props.description }}
      </p>

      <!-- Pill Badges -->
      <div v-if="props.tags && props.tags.length > 0" class="flex flex-wrap gap-1.5 pt-1">
        <span
          v-for="t in props.tags"
          :key="t"
          class="rounded-full font-mono text-[11px] px-2.5 py-0.5 bg-secondary text-secondary-foreground border border-border/40 select-none"
        >
          {{ t }}
        </span>
      </div>
    </div>

    <!-- Distinct Bottom Action Row -->
    <div
      class="border-t border-border/40 px-5 py-3 bg-muted/20 flex items-center justify-between gap-2"
    >
      <NuxtLink
        v-if="props.liveUrl"
        :to="props.liveUrl"
        external
        target="_blank"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <span>Live</span>
        <Icon name="tabler:external-link" class="size-3.5" />
      </NuxtLink>
      <span v-else class="text-xs text-muted-foreground/60">No live preview</span>

      <NuxtLink
        v-if="props.sourceUrl"
        :to="props.sourceUrl"
        external
        target="_blank"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-border/60 bg-background/80 hover:bg-muted text-foreground transition-colors"
      >
        <Icon name="tabler:brand-github" class="size-3.5" />
        <span>Source</span>
      </NuxtLink>
    </div>
  </article>
</template>
