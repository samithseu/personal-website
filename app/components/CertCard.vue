<script lang="ts" setup>
defineProps<{
  imageUrl: string;
  date: string;
  title: string;
  org: string;
}>();

defineEmits<{
  (e: "preview"): void;
}>();
</script>

<template>
  <article
    class="rounded-xl border border-border bg-card hover:border-foreground/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group h-full"
  >
    <!-- Card Top / Image -->
    <div>
      <div
        class="aspect-video overflow-hidden border-b border-border/40 relative cursor-pointer bg-muted"
        @click="$emit('preview')"
      >
        <NuxtImg
          :src="imageUrl"
          loading="lazy"
          decoding="async"
          width="600"
          height="338"
          sizes="(max-width: 350px) 350px, (max-width: 600px) 600px, 600px"
          quality="80"
          format="webp"
          class="aspect-video object-cover h-full w-full object-top group-hover:scale-105 transition-transform duration-500"
          :alt="`${title} certificate image`"
        />
        <div
          class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-background/90 text-foreground shadow-lg backdrop-blur-sm"
          >
            <Icon name="tabler:eye" class="size-3.5" />
            <span>Click to preview</span>
          </span>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-5 sm:p-6 space-y-3">
        <span
          class="rounded-full font-mono text-[11px] px-2.5 py-0.5 bg-secondary text-secondary-foreground border border-border/40 inline-flex items-center gap-1.5"
        >
          <Icon name="tabler:calendar-due" class="size-3.5" />
          <span>{{ date }}</span>
        </span>

        <h3
          class="text-lg font-semibold text-foreground leading-snug"
        >
          {{ title }}
        </h3>

        <p class="font-mono text-xs text-muted-foreground">
          Issued by {{ org }}
        </p>

        <p
          :title="`This certificate is issued to me by ${org} to certify my skills and knowledge in ${title}.`"
          class="text-sm text-muted-foreground line-clamp-2 leading-relaxed"
        >
          This certificate is issued to me by {{ org }} to certify my skills and
          knowledge in {{ title }}.
        </p>
      </div>
    </div>

    <!-- Distinct Bottom Action Row -->
    <div
      class="border-t border-border/40 px-5 py-3 bg-muted/20 flex items-center justify-between gap-2"
    >
      <button
        type="button"
        @click="$emit('preview')"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
      >
        <Icon name="tabler:eye" class="size-3.5" />
        <span>Preview</span>
      </button>

      <NuxtLink
        aria-label="View full certificate"
        title="View full certificate in new tab"
        external
        target="_blank"
        :to="imageUrl"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-border/60 bg-background/80 hover:bg-muted text-foreground transition-colors"
      >
        <span>Full File</span>
        <Icon name="tabler:external-link" class="size-3.5" />
      </NuxtLink>
    </div>
  </article>
</template>
