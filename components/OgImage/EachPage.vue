<script lang="ts" setup>
defineProps<{
  headline: string;
  title: string;
  desc: string;
}>();
</script>

<template>
  <div
    class="p-8 w-full h-full bg-radial-[at_100%_0%] from-primary/25 from-10% to-zinc-950 to-45%"
  >
    <div class="w-full flex flex-col gap-4 relative">
      <h3
        id="headline"
        class="font-mono uppercase font-bold text-primary text-xl"
      >
        {{ headline }}
      </h3>
      <h4 id="title" class="text-4xl w-2/4 text-pretty leading-11 font-bold">
        {{ title }}
      </h4>
      <p id="desc" class="text-xl line-clamp-3 text-zinc-400 w-3/4 text-pretty">
        {{ desc }}
      </p>

      <img
        class="h-20 absolute top-0 right-0"
        src="@/assets/imgs/m-logo.svg"
        alt="Samith Seu's Logo"
      />
    </div>
  </div>
</template>
