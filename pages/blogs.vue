<script lang="ts" setup>
useSeo({
  title: "Blogs",
  description:
    "A place where Samith Seu writes about his experiences and some technologies.",
});
</script>

<template>
  <div class="w-full h-full px-4 py-4 lg:py-0 prefer:px-0 flex items-center">
    <div class="max-w-prefer mx-auto lg:px-8 2xl:px-0">
      <LazyPageState icon="tabler:file-description">
        <h1 class="text-3xl">No blogs yet! 😁</h1>
      </LazyPageState>
    </div>
  </div>
</template>
