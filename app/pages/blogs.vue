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
  <div class="w-full h-full px-4 py-4 lg:py-0 prefer:px-0 flex items-center">
    <div class="max-w-prefer mx-auto lg:px-8 2xl:px-0">
      <LazyPageState hydrate-never icon="tabler:file-description">
        <h1
          style="view-transition-name: title"
          class="text-3xl font-mono font-semibold text-zinc-400"
        >
          No blogs!
        </h1>
      </LazyPageState>
    </div>
  </div>
</template>
