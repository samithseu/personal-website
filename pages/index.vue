<script lang="ts" setup>
import { useSeo } from "~/composables/useSeo";
const { allContacts } = useContacts();

useSeo({
  title: "Home",
  description:
    "First page of the website which telling brief information about Samith Seu.",
});
</script>

<template>
  <div class="w-full h-full px-4 py-4 lg:py-0 prefer:px-0 flex items-center">
    <div
      class="max-w-prefer mx-auto grid grid-cols-1 lg:grid-cols-2 lg:items-center lg:px-8 2xl:px-0 lg:gap-0 gap-4 sm:gap-6 md:gap-8"
    >
      <!-- left side -->
      <div
        class="space-y-5 md:space-y-6 lg:space-y-8 w-full lg:col-start-1 lg:row-start-1 col-start-1 row-start-2"
      >
        <div class="space-y-3 lg:space-y-2">
          <!-- badge -->
          <p
            class="mx-auto lg:mx-0 w-max h-max text-xs text-primary border rounded-full px-3 py-1 bg-primary/10 border-primary/30 flex items-center gap-2"
          >
            <span
              class="block z-20 isolate size-2 bg-primary rounded-full relative before:content-[''] before:absolute before:inset-0 before:bg-primary before:rounded-full before:animate-ping"
            ></span>
            <span>Available for work</span>
          </p>
          <!-- name -->
          <h1
            class="text-3xl md:text-4xl md:leading-10 font-black text-center lg:text-left lg:text-4xl xl:text-6xl lg:leading-12 xl:leading-16"
          >
            <span class="block"
              >I'm <span class="text-primary">Samith</span></span
            >
            <span class="text-zinc-400">Web Developer</span>
          </h1>
        </div>
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
            aria-label=" This will go to projects page"
            title="Projects"
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
            aria-label="This will go to about page"
            title="About"
            to="/about"
            class="text-nowrap transition-colors duration-200 border-zinc-50/20 hover:bg-zinc-50/20 hover:border-transparent"
            >about me</NuxtLink
          >
        </div>
        <!-- social medias-->
        <div
          class="flex items-center gap-5 *:text-2xl justify-center *:transition-all *:duration-200 *:hover:text-primary lg:justify-start *:text-zinc-400 *:hover:scale-105 lg:*:hover:scale-110"
        >
          <NuxtLink
            v-for="contact in allContacts"
            :key="contact.name"
            :to="contact.link"
            :title="contact.name"
            :aria-label="`This is Samith's ${contact.name}`"
          >
            <Icon :name="contact.iconName" />
          </NuxtLink>
        </div>
      </div>
      <!-- right side -->
      <div
        class="lg:w-full col-start-1 row-start-1 lg:flex lg:items-center lg:justify-end lg:col-start-2 lg:row-start-1"
      >
        <M
          class="size-24 sm:size-32 md:size-40 mx-auto lg:mx-0 lg:size-60 xl:size-80 [&>path]:stroke-[4] [&>path]:stroke-primary lg:[&>path]:fill-primary/0 lg:[&>path]:transition-all lg:[&>path]:duration-[400ms] lg:[&:hover_path]:fill-primary [&>path]:fill-primary/10"
        />
      </div>
    </div>
  </div>
</template>
