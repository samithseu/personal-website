<script lang="ts" setup>
import { useSeo } from "~/composables/useSeo";

useSeo({
  title: "About",
  description:
    "Telling more information about Samith Seu also specifying his skills and technologies he's using",
});
</script>

<template>
  <div class="w-full px-4 py-4 sm:px-14 md:px-6 lg:px-8 prefer:px-0">
    <div
      class="max-w-prefer mx-auto mb-8 sm:mt-4 md:mt-8 lg:mt-12 xl:mt-16 2xl:mt-28 3xl:mt-32"
    >
      <!-- 2 col wrapper -->
      <div
        class="grid grid-cols-1 md:grid-cols-[1fr_2fr] md:items-start gap-4 lg:gap-16"
      >
        <!-- left side -->
        <div
          class="w-full col-start-1 row-start-1 aspect-square overflow-hidden rounded-2xl group"
        >
          <NuxtImg
            class="group-hover:scale-105 transition-transform duration-400 w-full object-cover"
            src="/mith-gen-photo.jpg"
            format="webp"
            sizes="350px sm:500px md:800px lg:1024px"
            alt="Samith Seu's AI generated photo with Ghibli style"
          />

          <!-- social medias-->
          <!-- <div
            class="flex items-center gap-4 lg:gap-6 *:text-xl justify-center *:transition-colors *:duration-200 *:hover:text-primary lg:justify-start lg:*:text-xl *:text-zinc-400"
          >
            <NuxtLink
              title="GitHub"
              aria-label="This is Samith's GitHub"
              target="_blank"
              to="https://github.com/samithseu"
            >
              <Icon name="lucide:github" />
            </NuxtLink>
            <NuxtLink
              title="LinkedIn"
              aria-label="This is Samith's LinkedIn"
              target="_blank"
              to="https://www.linkedin.com/in/samith-seu-500193205/"
            >
              <Icon name="lucide:linkedin" />
            </NuxtLink>
            <NuxtLink
              title="Twitter/X"
              aria-label="This is Samith's Twitter/X"
              target="_blank"
              to="https://twitter.com/seumith"
            >
              <Icon name="prime:twitter" />
            </NuxtLink>
            <NuxtLink
              title="Telegram"
              aria-label="This is Samith's Telegram"
              target="_blank"
              to="https://t.me/samithseu"
            >
              <Icon name="hugeicons:telegram" />
            </NuxtLink>
            <NuxtLink
              title="Email"
              aria-label="This is Samith's Email"
              target="_blank"
              to="mailto:seusamith@gmail.com"
            >
              <Icon name="lucide:mail" />
            </NuxtLink>
          </div> -->
        </div>
        <!-- right side -->
        <div class="*:text-zinc-400 *:text-lg space-y-4 lg:space-y-6">
          <p>
            I don't know if I'm good enough to be called a developer, but when I
            was a student in high school, I was always fascinated by the world
            of technology specially in programming. When 2020 had come, learning
            through online classes really pushed me more to be curious about
            technologies and how they work. After having those curiosity again
            and again, I decided to learn more about computer and programming.
          </p>
          <p>
            My programming journey started when I was in
            <NuxtLink
              class="transition-colors duration-200 hover:text-primary"
              to="https://www.facebook.com/brachnasastraBTI/"
              target="_blank"
              >college</NuxtLink
            >, 2<sup>nd</sup>
            year, where I was learning a subject related to Database and SQL
            from professor who is a software engineer and also working as a
            full-stack developer for a government institution. He demonstrated
            one of his projects to me,
            <NuxtLink
              class="transition-colors duration-200 hover:text-primary"
              to="https://laravel.com"
              target="_blank"
              >Laravel</NuxtLink
            >
            web application, and I was so impressed by his coding skiils. After
            that moment, I've started learning more about programming specially
            in Web Development.
          </p>
          <p>
            Right now, I can say that I'm comfortable with creating UI elements
            on the web with technologies like React.JS and Vue.JS and also keep
            learning more about backend technologies as well.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
