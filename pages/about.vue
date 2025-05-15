<script lang="ts" setup>
import { useSeo } from "~/composables/useSeo";

useSeo({
  title: "About",
  description:
    "Telling more information about Samith Seu also specifying his skills and technologies he's using",
});

const showDialog = ref<boolean>(false);
</script>

<template>
  <div class="w-full px-4 py-4 lg:py-0 prefer:px-0 flex items-center">
    <div
      class="max-w-prefer mx-auto lg:px-8 2xl:px-0 w-full flex justify-center"
    >
      <button
        @click="showDialog = true"
        class="px-4 py-2 border rounded-lg cursor-pointer border-zinc-50/20 text-white transition-colors duration-200 hover:bg-zinc-50/20 hover:border-transparent"
        role="button"
        aria-label="Opening modal"
      >
        Open Modal
      </button>

      <LazyDialog v-model="showDialog">
        <h1>Hello from about page!</h1>
      </LazyDialog>
    </div>
  </div>
</template>
