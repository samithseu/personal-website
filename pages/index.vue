<script lang="ts" setup>
// FOR SEO
const desc =
  "First page of the website which telling brief information about Samith Seu.";
const ttl = "%s - Home";
useSeoMeta({
  titleTemplate: ttl,
  ogTitle: ttl,
  twitterTitle: ttl,
  description: desc,
  ogDescription: desc,
  twitterDescription: desc,
});
defineOgImageComponent("EachPage", {
  headline: "personal website",
  title: ttl,
  desc: desc,
});
</script>

<template>
  <div class="w-full px-4 py-4 lg:py-0 prefer:px-0 flex items-center">
    <div
      class="max-w-prefer mx-auto grid grid-cols-1 lg:grid-cols-2 lg:items-center lg:px-8 2xl:px-0"
    >
      <!-- left side -->
      <div class="space-y-8 w-full col-start-1 row-start-1">
        <!-- name -->
        <h1
          class="text-3xl font-black text-center lg:text-left lg:text-4xl xl:text-6xl md:leading-8 lg:leading-12 xl:leading-16"
        >
          <span class="block"
            >I'm <span class="text-primary">Samith</span></span
          >
          <span class="text-zinc-400">Web Developer</span>
        </h1>
        <!-- short description -->
        <p
          class="text-center text-zinc-400 md:w-3/4 mx-auto lg:text-left lg:mx-0 lg:w-full lg:text-xl text-balance"
        >
          I build websites with modern technologies, specializing in crafting
          responsive, user-friendly and eye-catching interfaces for web
          applications.
        </p>
        <!-- cta -->
        <div
          class="flex flex-wrap items-center justify-center gap-2 *:border *:py-2 *:px-6 *:rounded-full *:capitalize *:text-sm lg:justify-start"
        >
          <NuxtLink
            to="/projects"
            class="group flex items-center gap-1 bg-primary text-dark transition-colors duration-200 hover:bg-primary/70"
          >
            <span class="text-nowrap">view my work</span>
            <Icon
              name="material-symbols:arrow-right-alt-rounded"
              class="text-lg group-hover:translate-x-1 transition-transform duration-200"
            />
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-nowrap transition-colors duration-200 border-zinc-50/20 hover:bg-zinc-50/20 hover:border-transparent"
            >about me</NuxtLink
          >
        </div>
        <!-- social medias-->
        <div
          class="flex items-center gap-4 lg:gap-6 *:text-xl justify-center *:transition-colors *:duration-200 *:hover:text-primary lg:justify-start lg:*:text-xl *:text-zinc-400"
        >
          <NuxtLink target="_blank" to="https://github.com/samithseu">
            <Icon name="lucide:github" />
          </NuxtLink>
          <NuxtLink
            target="_blank"
            to="https://www.linkedin.com/in/samith-seu-500193205/"
          >
            <Icon name="lucide:linkedin" />
          </NuxtLink>
          <NuxtLink target="_blank" to="https://twitter.com/seumith">
            <Icon name="prime:twitter" />
          </NuxtLink>
          <NuxtLink target="_blank" to="https://t.me/samithseu">
            <Icon name="hugeicons:telegram" />
          </NuxtLink>
          <NuxtLink target="_blank" to="mailto:seusamith@gmail.com">
            <Icon name="lucide:mail" />
          </NuxtLink>
        </div>
      </div>
      <!-- right side -->
      <div
        class="hidden w-full lg:flex lg:items-center lg:justify-end col-start-2 row-start-1"
      >
        <div
          class="lg:size-52 xl:size-72 z-30 relative flex justify-end items-center"
        >
          <img
            class="animate-pulse object-cover h-full drop-shadow-2xl drop-shadow-primary/20"
            src="@/assets/imgs/m-logo.svg"
            alt="Samith Seu's Logo"
          />
        </div>
      </div>
    </div>
  </div>
</template>
