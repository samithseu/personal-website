<script lang="ts" setup>
useSeo({
  title: "Blogs",
  description:
    "Thoughts, tutorials, and deep dives are stuff that will get shared here!",
});
</script>

<template>
  <div class="w-full h-full px-4 py-4 lg:py-0 prefer:px-0 flex items-center">
    <div class="max-w-prefer mx-auto lg:px-8 2xl:px-0">
      <LazyPageState hydrate-never icon="tabler:file-description">
        <h1
          style="view-transition-name: title"
          class="text-3xl font-mono font-bold text-zinc-400"
        >
          No blogs!
        </h1>
      </LazyPageState>
    </div>
  </div>
</template>
