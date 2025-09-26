<script lang="ts" setup>
const { allContacts } = useContacts();
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
      class="max-w-prefer mx-auto my-4 lg:my-12 xl:my-14 space-y-10 lg:space-y-12 xl:space-y-14 2xl:space-y-16"
    >
      <!-- 2 col wrapper -->
      <div
        class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] md:items-start gap-4 md:gap-6 lg:gap-16"
      >
        <!-- left side -->
        <div
          class="w-full col-start-1 row-start-1 aspect-square overflow-hidden rounded-2xl group"
        >
          <NuxtImg
            preload
            width="700"
            height="700"
            :placeholder="
              img(`/about-picture.jpg`, { h: 10, f: 'webp', blur: 1, q: 30 })
            "
            class="group-hover:scale-105 transition-transform duration-400 w-full object-cover"
            src="/about-picture.jpg"
            format="webp"
            quality="80"
            sizes="sm:350px md:600px lg:700px"
            alt="Samith Seu's AI generated photo with Ghibli style"
          />
        </div>
        <!-- right side -->
        <div class="space-y-4 lg:space-y-6">
          <!-- badge & title -->
          <div class="space-y-2 lg:space-y-3">
            <LazySimpleBadge>
              <span>About me</span>
            </LazySimpleBadge>
            <h2
              style="view-transition-name: title"
              class="text-white lg:text-zinc-200 lg:transition-colors lg:duration-200 lg:hover:text-white capitalize text-center md:text-left mt-4 md:mt-0 text-xl sm:text-2xl md:text-3xl font-semibold font-mono tracking-tight"
            >
              Hi, I'm Samith Seu
            </h2>
          </div>
          <div class="*:text-zinc-400 *:text-lg space-y-4 lg:space-y-6">
            <p>
              When I was a
              <NuxtLink
                class="transition-colors duration-200 hover:text-primary"
                to="https://maps.app.goo.gl/v2CP1f6JuUVK6pUm8"
                target="_blank"
                title="Kampong Speu High School"
                aria-label="Kampong Speu High School"
                >high school</NuxtLink
              >
              student, I was always fascinated by technology, especially
              programming. In 2020, learning through online classes sparked my
              curiosity about technology even more. Driven by this curiosity, I
              decided to learn programming.
            </p>
            <p>
              My first coding experience began in my
              <NuxtLink
                class="transition-colors duration-200 hover:text-primary"
                to="https://www.facebook.com/brachnasastraBTI/"
                title="Brachñāsāstra Technology Institute"
                aria-label="This links will go to Brachñāsāstra Technology Institute facebook page"
                target="_blank"
                >2nd year of college</NuxtLink
              >, where I learned from a professor who is a software engineer at
              a government institution. He showed me one of his
              <span style="view-transition-name: project">projects</span>,
              <NuxtLink
                class="transition-colors duration-200 hover:text-primary"
                to="https://laravel.com"
                title="Laravel"
                aria-label="This link will go to Laravel official website"
                target="_blank"
                >a Laravel web application</NuxtLink
              >, and I was truly impressed. That moment inspired me to delve
              deeper into programming, particularly in
              <span>Web Development</span>.
            </p>
            <p>
              Today, I feel comfortable working on frontend part of websites
              whether it's about API integration or creating UI elements with
              React.js and Vue.js, while also continuing to learn about backend
              technologies as well. Currently, I am based in
              <NuxtLink
                class="transition-colors duration-200 hover:text-primary"
                to="https://en.wikipedia.org/wiki/Chbar_Mon_Municipality"
                title="Chbarmon municipality"
                aria-label="This link will go to Chbarmon municipality wiki page for more information"
                target="_blank"
                >Chbarmon municipality</NuxtLink
              >.
            </p>
          </div>
          <!-- view resume button -->
          <NuxtLink
            aria-label="This will go to Samith Seu' resume"
            title="Resume"
            target="_blank"
            to="https://resume.samith.info"
            class="flex items-center gap-2 bg-primary text-dark transition-colors duration-200 hover:bg-primary/70 w-fit border py-2 px-4 rounded-full capitalize text-sm mx-auto md:mx-0"
          >
            <span class="text-nowrap">view resume</span>
            <Icon name="tabler:external-link" class="text-lg" />
          </NuxtLink>
        </div>
      </div>
      <!-- education -->
      <div class="space-y-6 md:space-y-8">
        <h2 class="capitalize text-3xl font-bold">education</h2>
        <ul
          class="grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-6 lg:gap-8"
        >
          <LazyListItem
            title="Bachelor of Information Technology"
            subtitle-left="Brachñāsāstra Technology Institute"
            subtitle-right="2021 - 2025"
            description="Studied about software, hardware and also focus on web development, algorithms, and software engineering as well."
          />
          <LazyListItem
            title="Baccalaureate Degree"
            subtitle-left="Kampong Speu High School"
            subtitle-right="2017 - 2020"
            description="Studied about Khmer Literature, Mathematics, Foreign Language, Social Studies (History...) to get high school diploma from MoEYS."
          />
        </ul>
      </div>
      <!-- skills & technologies -->
      <div class="space-y-6 md:space-y-8">
        <h2 class="capitalize text-3xl font-bold">Skills & Technologies</h2>
        <ul
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:items-start gap-6 lg:gap-8"
        >
          <LazyListSubList title="frontend">
            <li>Vue / Nuxt.JS</li>
            <li>Astro / SSG</li>
            <li>TypeScript / JavaScript</li>
            <li>TailwindCSS / Styled Components</li>
          </LazyListSubList>
          <LazyListSubList title="backend">
            <li>Node.js / Laravel</li>
            <li>REST API Design</li>
            <li>SQL / PostgreSQL</li>
            <li>Supabase</li>
          </LazyListSubList>
          <LazyListSubList title="tools & others">
            <li>Git / GitHub</li>
            <li>Docker / CI/CD</li>
            <li>Vercel / Netlify</li>
            <li>Figma / Adobe XD</li>
          </LazyListSubList>
        </ul>
      </div>
      <!-- working together? -->
      <LazyAskingEnd hydrate-never>
        <h2 class="capitalize text-2xl font-bold text-primary text-center">
          interested in working together?
        </h2>
        <p class="text-zinc-300 text-center">
          I'm always open to discuss about new projects or opportunities. <br />
          Feel free to reach out to me via:
        </p>
        <ul class="flex flex-wrap justify-center items-center gap-4">
          <li v-for="c in allContacts" :key="c.name">
            <NuxtLink
              :aria-label="c.name"
              :title="c.name"
              :to="c.link"
              class="grid place-items-center border border-primary/50 aspect-square w-8 rounded-full hover:*:text-primary"
              external
            >
              <Icon
                :name="c.iconName"
                class="transition-all duration-200 text-xl"
              />
            </NuxtLink>
          </li>
        </ul>
      </LazyAskingEnd>
    </div>
  </div>
</template>
