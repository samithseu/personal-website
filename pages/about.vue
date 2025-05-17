<script lang="ts" setup>
import { useSeo } from "~/composables/useSeo";
const img = useImage();

useSeo({
  title: "About",
  description:
    "Telling more information about Samith Seu also specifying his skills and technologies he's using",
});
</script>

<template>
  <div class="w-full px-4 py-4 sm:px-14 md:px-6 lg:px-8 prefer:px-0">
    <div
      class="max-w-prefer mx-auto mb-8 sm:mt-4 md:mt-8 lg:mt-12 xl:mt-16 3xl:mt-32"
    >
      <!-- 2 col wrapper -->
      <div
        class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] md:items-start gap-4 lg:gap-16"
      >
        <!-- left side -->
        <div
          class="w-full col-start-1 row-start-1 aspect-square overflow-hidden rounded-2xl group"
        >
          <NuxtImg
            :placeholder="
              img(`/mith-gen-photo.jpg`, { h: 10, f: 'png', blur: 1, q: 40 })
            "
            class="group-hover:scale-105 transition-transform duration-400 w-full object-cover"
            src="/mith-gen-photo.jpg"
            format="webp"
            quality="80"
            sizes="300px sm:400px md:600px lg:800px xl:1000px xxl:1024px"
            alt="Samith Seu's AI generated photo with Ghibli style"
          />
        </div>
        <!-- right side -->
        <div class="space-y-4 lg:space-y-6">
          <h2
            class="capitalize text-center md:text-left mt-4 md:mt-0 text-3xl font-black"
          >
            Little bit about me...
          </h2>
          <div class="*:text-zinc-400 *:text-lg space-y-4 lg:space-y-6">
            <p>
              When I was a student in high school, I was always fascinated by
              the world of technology especially in programming. When 2020 had
              come, learning through online classes really pushed me more to be
              curious about technologies. After constantly having those
              curiosity, I decided to learn programming.
            </p>
            <p>
              My programming journey started when I was in
              <NuxtLink
                class="transition-colors duration-200 hover:text-primary"
                to="https://www.facebook.com/brachnasastraBTI/"
                target="_blank"
                >college</NuxtLink
              >, 2<sup>nd</sup>
              year, where I was learning with a professor who is a software
              engineer a government institution. He showed me one of his
              projects,
              <NuxtLink
                class="transition-colors duration-200 hover:text-primary"
                to="https://laravel.com"
                target="_blank"
                >Laravel web application</NuxtLink
              >, and I was so impressed. After that moment, I've started
              learning more about programming specially in Web Development.
            </p>
            <p>
              Right now, I can say that I'm comfortable with creating UI
              elements on the web with technologies like React.JS and Vue.JS and
              also keep learning more about backend technologies as well.
            </p>
          </div>
          <!-- view resume button -->
          <NuxtLink
            aria-label="This will go to Samith Seu' resume"
            title="Resume"
            target="_blank"
            to="https://resume.samith.info"
            class="flex items-center gap-2 bg-primary text-dark transition-colors duration-200 hover:bg-primary/70 w-fit border py-2 px-4 rounded-full capitalize text-sm"
          >
            <span class="text-nowrap">view resume</span>
            <Icon name="tabler:external-link" class="text-lg" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
