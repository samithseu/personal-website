<script lang="ts" setup>
defineOptions({ inheritAttrs: false });
</script>

<template>
  <NuxtImg v-bind="$attrs" :custom="true" v-slot="{ src, imgAttrs, isLoaded }">
    <div class="relative">
      <!-- Skeleton placeholder -->
      <div
        v-show="!isLoaded"
        class="absolute inset-0 bg-zinc-700/80 animate-pulse"
      />
      <!-- Actual image with fade-in -->
      <img
        v-bind="imgAttrs"
        :src="src"
        class="transition-opacity duration-500 ease-out"
        :style="{ opacity: isLoaded ? 1 : 0 }"
      />
    </div>
  </NuxtImg>
</template>
