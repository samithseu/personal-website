<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";
</script>

<template>
  <div
    class="min-h-screen h-full grid grid-rows-[auto_1fr_auto] transition-discrete duration-300"
  >
    <Header />
    <main>
      <slot />
      <Analytics />
    </main>
    <Footer />
  </div>
</template>
