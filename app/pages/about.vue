<script lang="ts" setup>
const { allContacts } = useContacts();
const desc =
  "Get to know the person behind the screen. Read my brief story, and why I love to build things.";
useSeo({
  title: "About",
  description: desc,
});

defineOgImage("EachPage.takumi", {
  headline: "personal website",
  title: "Samith Seu - About",
  desc: desc,
});
</script>

<template>
  <div class="w-full px-4 py-8 sm:py-12 prefer:px-0">
    <div class="max-w-prefer mx-auto space-y-12 lg:space-y-16">
      <!-- 2 col wrapper -->
      <div
        class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] md:items-start gap-8 lg:gap-16"
      >
        <!-- left side: Framed Profile Image -->
        <div
          class="rounded-2xl border border-border bg-card shadow-sm p-1.5 w-full max-w-[280px] sm:max-w-sm md:max-w-none mx-auto"
        >
          <div class="rounded-xl aspect-square overflow-hidden bg-muted group">
            <LazyImageWithPlaceholder
              preload
              width="700"
              height="700"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src="/about-picture.jpg"
              format="webp"
              quality="80"
              sizes="(max-width: 350px) 350px, (max-width: 600px) 600px, 700px"
              alt="Samith Seu's profile photo"
            />
          </div>
        </div>

        <!-- right side -->
        <div class="space-y-6">
          <!-- badge & title -->
          <div class="space-y-3">
            <LazySimpleBadge style="view-transition-name: page-badge">
              <span>About me</span>
            </LazySimpleBadge>
            <h1
              style="view-transition-name: page-title"
              class="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
            >
              Hi, I'm Samith Seu
            </h1>
          </div>

          <div
            class="text-muted-foreground text-base leading-relaxed space-y-4"
          >
            <p>
              When I was a
              <NuxtLink
                class="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors font-medium"
                to="https://maps.app.goo.gl/v2CP1f6JuUVK6pUm8"
                external
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
                class="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors font-medium"
                to="https://www.facebook.com/brachnasastraBTI/"
                title="Brachñāsāstra Technology Institute"
                aria-label="This links will go to Brachñāsāstra Technology Institute facebook page"
                external
                target="_blank"
                >2nd year of college</NuxtLink
              >, where I learned from a professor who is a software engineer at
              a government institution. He showed me one of his projects,
              <NuxtLink
                class="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors font-medium"
                to="https://laravel.com"
                title="Laravel"
                external
                aria-label="This link will go to Laravel official website"
                target="_blank"
                >a Laravel web application</NuxtLink
              >, and I was truly impressed. That moment inspired me to delve
              deeper into programming, particularly in
              <span class="text-foreground font-medium">Web Development</span>.
            </p>
            <p>
              Today, I feel comfortable working on frontend part of websites
              whether it's about API integration or creating UI elements with
              React.js and Vue.js, while also continuing to learn about backend
              technologies as well. Currently, I am based in
              <NuxtLink
                class="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors font-medium"
                to="https://en.wikipedia.org/wiki/Chbar_Mon_Municipality"
                title="Chbarmon municipality"
                aria-label="This link will go to Chbarmon municipality wiki page for more information"
                external
                target="_blank"
                >Chbarmon municipality</NuxtLink
              >.
            </p>
          </div>

          <!-- view resume button -->
          <NuxtLink
            aria-label="This will go to Samith Seu' resume"
            title="Resume"
            external
            target="_blank"
            to="https://resume.samith.dev"
            class="inline-flex items-center gap-2 h-10 px-5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors shadow-xs"
          >
            <span class="capitalize">view resume</span>
            <Icon name="tabler:external-link" class="text-base" />
          </NuxtLink>
        </div>
      </div>

      <!-- education -->
      <div class="space-y-6">
        <h2
          class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
        >
          Education
        </h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
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
      <div class="space-y-6">
        <h2
          class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
        >
          Skills &amp; Technologies
        </h2>
        <ul
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6"
        >
          <LazyListSubList title="frontend">
            <li>Vue / Nuxt.JS</li>
            <li>Astro / SSG</li>
            <li>TypeScript / JavaScript</li>
            <li>Tailwind / Styled Component</li>
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
            <li>Cloudflare / Vercel / Netlify</li>
            <li>Figma / Adobe XD</li>
          </LazyListSubList>
        </ul>
      </div>

      <!-- working together? -->
      <LazyAskingEnd style="view-transition-name: asking-end" hydrate-never>
        <h2 class="text-2xl font-bold tracking-tight text-foreground">
          Interested in working together?
        </h2>
        <p class="text-muted-foreground max-w-md">
          I'm always open to discuss new projects or opportunities. Feel free to
          reach out to me via:
        </p>
        <ul class="flex flex-wrap justify-center items-center gap-3 pt-2">
          <li v-for="c in allContacts" :key="c.name">
            <NuxtLink
              :aria-label="c.name"
              :title="c.name"
              :to="c.link"
              class="size-9 rounded-md border border-border/60 bg-background hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
              external
            >
              <Icon :name="c.iconName" class="text-lg" />
            </NuxtLink>
          </li>
        </ul>
      </LazyAskingEnd>
    </div>
  </div>
</template>
