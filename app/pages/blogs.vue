<script lang="ts" setup>
const desc =
  "Thoughts, tutorials, and deep dives are stuff that will get shared here!";
useSeo({
  title: "Blogs",
  description: desc,
});

defineOgImage("EachPage.takumi", {
  headline: "personal website",
  title: "Samith Seu - Blogs",
  desc: desc,
});
</script>

<template>
  <div
    class="w-full h-full px-4 py-16 prefer:px-0 flex items-center justify-center min-h-[calc(100vh-12rem)]"
  >
    <div class="max-w-prefer mx-auto flex items-center justify-center">
      <PageState icon="tabler:file-text">
        <h1
          style="view-transition-name: page-title"
          class="text-2xl sm:text-3xl font-mono font-semibold text-foreground tracking-tight"
        >
          No articles yet
        </h1>
        <p class="text-sm text-muted-foreground mt-1 max-w-sm">
          Thoughts, technical deep dives, and tutorials will be published here
          soon.
        </p>
      </PageState>
    </div>
  </div>
</template>
