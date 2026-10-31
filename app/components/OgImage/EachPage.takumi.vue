<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    headline?: string;
    title?: string;
    desc?: string;
    v?: string | number;
    fontFamily?: string;
  }>(),
  {
    fontFamily: "Geist Mono",
  }
);
</script>

<template>
  <div
    class="w-full h-full bg-[#0a0a0a] text-[#ededed] flex flex-col justify-between p-20"
    style="font-family: 'Inter', sans-serif;"
  >
    <div class="flex items-center justify-between text-zinc-500 font-mono text-xl">
      <span>samith.dev</span>
      <span>Web Developer</span>
    </div>

    <div class="max-w-5xl py-12">
      <h1 class="text-7xl font-semibold tracking-tight text-white leading-tight">
        {{ title || "Samith Seu" }}
      </h1>
    </div>

    <div />
  </div>
</template>
