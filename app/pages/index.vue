<script lang="ts" setup>
import type { GitHubRepo } from "#shared/types/project";

const { allContacts } = useContacts();

useSeo({
  title: "Samith Seu",
  description:
    "Web Developer specializing in crafting responsive, performant, and user-friendly web interfaces.",
  noPrefix: true,
});

interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

const fallbackProjects: ProjectItem[] = [
  {
    title: "personal-website",
    description:
      "Minimalist personal website built with Nuxt 4 and Tailwind CSS v4, featuring high-contrast light/dark mode, SSR, and zero-runtime OG image generation.",
    tags: ["Nuxt 4", "Tailwind CSS v4", "TypeScript"],
    liveUrl: "/",
    sourceUrl: "https://github.com/samithseu/personal-website",
  },
  {
    title: "ghm",
    description:
      "Utility to discover public GitHub email addresses by username via GitHub's public API.",
    tags: ["JavaScript", "GitHub API", "REST"],
    liveUrl: "https://ghm.samith.dev",
    sourceUrl: "https://github.com/samithseu/ghm",
  },
  {
    title: "tl-bot-webhook",
    description:
      "Production Telegram Bot implementation running serverless webhooks on Node.js.",
    tags: ["Node.js", "Telegram API", "Webhooks"],
    liveUrl: "https://tl-bot-webhook.vercel.app",
    sourceUrl: "https://github.com/samithseu/tl-bot-webhook",
  },
  {
    title: "sosei",
    description:
      "Khmer document typesetting, pagination, and HTML-to-PDF printing tool built with Paged.js and Astro.",
    tags: ["Astro", "Paged.js", "CSS Paged Media"],
    liveUrl: "http://sosei.madebymith.site",
    sourceUrl: "https://github.com/samithseu/sosei",
  },
  {
    title: "cover-maker",
    description:
      "Khmer notebook cover generator for A5 formats without relying on Microsoft Word.",
    tags: ["JavaScript", "HTML", "Print CSS"],
    liveUrl: "https://samithseu.github.io/cover-maker/",
    sourceUrl: "https://github.com/samithseu/cover-maker",
  },
  {
    title: "edcongress-clone",
    description:
      "Lightweight clone of edcongress.org built with Alpine.js and clean semantics.",
    tags: ["Alpine.js", "Tailwind CSS", "HTML5"],
    liveUrl: "https://samithseu.github.io/edcongress-clone/",
    sourceUrl: "https://github.com/samithseu/edcongress-clone",
  },
  {
    title: "saas-homepage",
    description:
      "Modern marketing layout for SaaS products built with Tailwind CSS.",
    tags: ["Tailwind CSS", "Responsive UI"],
    liveUrl: "https://saas-homepage-site.vercel.app",
    sourceUrl: "https://github.com/samithseu/saas-homepage",
  },
  {
    title: "landing-page",
    description:
      "Responsive, accessible product landing page crafted with clean HTML and Tailwind CSS.",
    tags: ["HTML5", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://samithseu.github.io/landing-page/",
    sourceUrl: "https://github.com/samithseu/landing-page",
  },
];

// Silently revalidate projects in background when user returns to the tab
onMounted(() => {
  const onVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      refreshNuxtData("github-projects-list");
    }
  };
  document.addEventListener("visibilitychange", onVisibilityChange);
});

// Dynamically fetch repositories from /api/projects with fallback & client revalidation
const { data: apiProjects } = await useFetch<GitHubRepo[]>("/api/projects", {
  key: "github-projects-list",
  getCachedData(key, nuxtApp) {
    if (nuxtApp.isHydrating) {
      return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key];
    }
    return undefined;
  },
});

const projects = computed<ProjectItem[]>(() => {
  if (
    apiProjects.value &&
    Array.isArray(apiProjects.value) &&
    apiProjects.value.length > 0
  ) {
    return apiProjects.value.map((p) => {
      const filteredTopics = (p.topics || []).filter(
        (t) => t.toLowerCase() !== "project",
      );
      const isInternal =
        p.homepage === "https://samith.dev" ||
        p.homepage === "http://localhost:3000";
      return {
        title: p.name,
        description: p.description || "",
        tags: filteredTopics.length > 0 ? filteredTopics : ["Web"],
        liveUrl: isInternal ? "/" : p.homepage,
        sourceUrl: p.html_url,
      };
    });
  }
  return fallbackProjects;
});

interface CredentialItem {
  title: string;
  issuer: string;
  year: string;
  url?: string;
  featured?: boolean;
}

const allCredentials: CredentialItem[] = [
  {
    title: "Frontend Developer (React)",
    issuer: "HackerRank",
    year: "2025",
    url: "/certs/frontend-react.png",
    featured: true,
  },
  {
    title: "Software Engineering I",
    issuer: "BTI",
    year: "2024",
    url: "/certs/swe-i.jpg",
    featured: true,
  },
  {
    title: "Java Programming I",
    issuer: "BTI",
    year: "2024",
    url: "/certs/java-i.jpg",
    featured: true,
  },
  {
    title: "Internet Programming II",
    issuer: "BTI",
    year: "2024",
    url: "/certs/html-ii.jpg",
  },
  {
    title: "Computer Graphic II",
    issuer: "BTI",
    year: "2024",
    url: "/certs/computer-graphic-ii.jpg",
  },
  {
    title: "Visual Basic Programming II",
    issuer: "BTI",
    year: "2024",
    url: "/certs/vb-ii.jpg",
  },
  {
    title: "Information System Analysis & Design I",
    issuer: "BTI",
    year: "2024",
    url: "/certs/isad-i.jpg",
  },
  {
    title: "Data Communication II",
    issuer: "BTI",
    year: "2023",
    url: "/certs/data-com-ii.jpg",
  },
  {
    title: "Computer Network II",
    issuer: "BTI",
    year: "2023",
    url: "/certs/computer-network-ii.jpg",
  },
  {
    title: "Computer Network I",
    issuer: "BTI",
    year: "2023",
    url: "/certs/computer-network-i.jpg",
  },
  {
    title: "Data Structures & Algorithms II",
    issuer: "BTI",
    year: "2023",
    url: "/certs/dsa-ii.jpg",
    featured: true,
  },
  {
    title: "CSS (Basic)",
    issuer: "HackerRank",
    year: "2023",
    url: "/certs/css-basic.png",
    featured: true,
  },
  {
    title: "Computer Graphic I",
    issuer: "BTI",
    year: "2023",
    url: "/certs/computer-graphic-i.jpg",
  },
  {
    title: "Visual Basic Programming I",
    issuer: "BTI",
    year: "2023",
    url: "/certs/vb-i.jpg",
  },
  {
    title: "Project Management",
    issuer: "BTI",
    year: "2022",
    url: "/certs/project-mgmt-i.jpg",
  },
  {
    title: "C++ Programming II",
    issuer: "BTI",
    year: "2022",
    url: "/certs/cpp-ii.jpg",
  },
];

const valuableCredentials: CredentialItem[] = allCredentials.filter(
  (cert) => cert.featured,
);

const showAllCredentials = ref(false);
const displayedCredentials = computed(() =>
  showAllCredentials.value ? allCredentials : valuableCredentials,
);

const copiedEmail = ref(false);
async function copyEmail() {
  try {
    await navigator.clipboard.writeText("contact@samith.dev");
    copiedEmail.value = true;
    setTimeout(() => {
      copiedEmail.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy email", err);
  }
}
</script>

<template>
  <div class="space-y-16 sm:space-y-20">
    <!-- Intro / Hero -->
    <section
      id="hero"
      aria-labelledby="intro-heading"
      class="space-y-4 scroll-mt-20"
    >
      <div class="space-y-1.5">
        <h1
          id="intro-heading"
          class="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground"
        >
          Samith Seu
        </h1>
        <p class="text-sm sm:text-base text-muted-foreground">Web Developer</p>
        <p class="text-xs font-mono text-muted-foreground/80">
          Kampong Speu, Cambodia
        </p>
      </div>

      <p
        class="text-sm sm:text-base text-muted-foreground leading-relaxed pt-1"
      >
        I build websites with modern technologies, specializing in crafting
        responsive, accessible, and user-friendly interfaces for web
        applications.
      </p>
    </section>

    <!-- About Section (Summarized, preserving original meaning) -->
    <section
      id="about"
      aria-labelledby="about-heading"
      class="space-y-3 scroll-mt-20"
    >
      <h2
        id="about-heading"
        class="text-xs font-mono uppercase tracking-wider text-muted-foreground"
      >
        About
      </h2>
      <div
        class="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
      >
        <p>
          My fascination with programming began in 2020 at
          <a
            href="https://maps.app.goo.gl/v2CP1f6JuUVK6pUm8"
            target="_blank"
            rel="noopener noreferrer"
            class="prose-link"
            >Kampong Speu High School</a
          >, where remote classes during the pandemic ignited a deep curiosity
          for how software works.
        </p>
        <p>
          During my second year of college at
          <a
            href="https://www.facebook.com/brachnasastraBTI/"
            target="_blank"
            rel="noopener noreferrer"
            class="prose-link"
            >Brachñāsāstra Technology Institute (BTI)</a
          >, a professor who was a software engineer in government demonstrated
          a production Laravel web application. Seeing code create real-world
          tools inspired me to pursue web development seriously.
        </p>
        <p>
          Today, I specialize in modern frontend engineering-from REST API
          integration to building performant, accessible UI components with Vue,
          Nuxt, React, TypeScript, and Tailwind CSS.
        </p>
      </div>
    </section>

    <!-- Projects Section -->
    <section
      id="projects"
      aria-labelledby="projects-heading"
      class="space-y-6 scroll-mt-20"
    >
      <div class="flex items-baseline justify-between">
        <h2
          id="projects-heading"
          class="text-xs font-mono uppercase tracking-wider text-muted-foreground"
        >
          Selected Projects
        </h2>
        <span class="text-xs text-muted-foreground font-mono">
          {{ projects.length }} projects
        </span>
      </div>

      <div class="divide-y divide-border">
        <article
          v-for="project in projects"
          :key="project.title"
          class="py-5 first:pt-0 last:pb-0 space-y-2 group"
        >
          <div class="flex items-baseline justify-between gap-4">
            <h3 class="text-sm sm:text-base font-medium text-foreground">
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                :target="
                  project.liveUrl.startsWith('http') ? '_blank' : undefined
                "
                :rel="
                  project.liveUrl.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                "
                class="hover:underline underline-offset-4 decoration-border group-hover:decoration-foreground transition-colors inline-flex items-center gap-1"
              >
                <span>{{ project.title }}</span>
                <span class="text-xs text-muted-foreground font-normal">↗</span>
              </a>
              <span v-else>{{ project.title }}</span>
            </h3>

            <div
              class="text-xs font-mono text-muted-foreground shrink-0 capitalize"
            >
              {{ project.tags[0] }}
            </div>
          </div>

          <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {{ project.description }}
          </p>

          <div class="flex items-center gap-3 text-xs pt-1">
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              :target="
                project.liveUrl.startsWith('http') ? '_blank' : undefined
              "
              :rel="
                project.liveUrl.startsWith('http')
                  ? 'noopener noreferrer'
                  : undefined
              "
              class="prose-link"
            >
              Live Demo
            </a>
            <span
              v-if="project.liveUrl && project.sourceUrl"
              class="text-border"
              aria-hidden="true"
              >&middot;</span
            >
            <a
              v-if="project.sourceUrl"
              :href="project.sourceUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="prose-link"
            >
              Source
            </a>
          </div>
        </article>
      </div>
    </section>

    <!-- Skills & Stack Section -->
    <section
      id="skills"
      aria-labelledby="skills-heading"
      class="space-y-4 scroll-mt-20"
    >
      <h2
        id="skills-heading"
        class="text-xs font-mono uppercase tracking-wider text-muted-foreground"
      >
        Technologies
      </h2>

      <div class="space-y-3 text-xs sm:text-sm">
        <div class="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-4">
          <span class="font-mono text-muted-foreground">Frontend</span>
          <span class="text-foreground">
            Vue.js, Nuxt 4, React, TypeScript, Tailwind CSS, HTML5 / CSS3
          </span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-4">
          <span class="font-mono text-muted-foreground">Backend &amp; DB</span>
          <span class="text-foreground">
            Node.js, Laravel (PHP), REST APIs, PostgreSQL, Supabase
          </span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-4">
          <span class="font-mono text-muted-foreground">Platforms</span>
          <span class="text-foreground">
            Git, GitHub, Docker, Vercel, Cloudflare, Figma
          </span>
        </div>
      </div>
    </section>

    <!-- Education & Credentials Section (supports #credentials and #certificates) -->
    <section
      id="credentials"
      aria-labelledby="credentials-heading"
      class="space-y-4 scroll-mt-20"
    >
      <div id="certificates" class="scroll-mt-20" aria-hidden="true" />
      <h2
        id="credentials-heading"
        class="text-xs font-mono uppercase tracking-wider text-muted-foreground"
      >
        Education &amp; Credentials
      </h2>

      <div class="space-y-3.5 text-xs sm:text-sm">
        <!-- Education -->
        <div class="space-y-3 pb-2 border-b border-border/40">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="font-medium text-foreground">
                Bachelor of Information Technology
              </p>
              <p class="text-muted-foreground">
                Brachñāsāstra Technology Institute (BTI)
              </p>
              <p
                v-if="showAllCredentials"
                class="text-xs text-muted-foreground/80 mt-1"
              >
                Coursework in Software Engineering, Web Development, Algorithms,
                Database Systems &amp; Computer Networks.
              </p>
            </div>
            <span class="font-mono text-xs text-muted-foreground shrink-0">
              2021 - 2025
            </span>
          </div>

          <!-- High School Diploma (shown when expanded) -->
          <div
            v-if="showAllCredentials"
            class="flex items-start justify-between gap-4 pt-2 border-t border-border/20"
          >
            <div>
              <p class="font-medium text-foreground">
                Baccalaureate (High School Diploma)
              </p>
              <p class="text-muted-foreground">Kampong Speu High School</p>
              <p class="text-xs text-muted-foreground/80 mt-1">
                MoEYS High School Diploma in Mathematics, Sciences, and Social
                Studies.
              </p>
            </div>
            <span class="font-mono text-xs text-muted-foreground shrink-0">
              2017 - 2020
            </span>
          </div>
        </div>

        <!-- Verified Certificates List -->
        <div class="space-y-1">
          <a
            v-for="cert in displayedCredentials"
            :key="cert.title"
            :href="cert.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-baseline justify-between gap-4 py-1.5 group text-muted-foreground hover:text-foreground transition-colors"
          >
            <div class="flex items-baseline gap-2 min-w-0">
              <span
                class="text-foreground group-hover:underline underline-offset-4 decoration-border group-hover:decoration-foreground truncate"
              >
                {{ cert.title }}
              </span>
              <span class="text-xs text-muted-foreground shrink-0">
                ({{ cert.issuer }})
              </span>
            </div>
            <span class="font-mono text-xs text-muted-foreground shrink-0">
              {{ cert.year }}
            </span>
          </a>
        </div>

        <div class="pt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
          <button
            type="button"
            @click="showAllCredentials = !showAllCredentials"
            class="prose-link cursor-pointer"
          >
            {{
              showAllCredentials
                ? "Show fewer credentials"
                : `Show full education & credentials (${allCredentials.length})`
            }}
          </button>
          <span class="text-border" aria-hidden="true">&middot;</span>
          <a
            href="https://www.credly.com/users/samithseu/badges/credly"
            target="_blank"
            rel="noopener noreferrer"
            class="prose-link"
          >
            View all verified skill badges on Credly ↗
          </a>
        </div>
      </div>
    </section>

    <!-- Connect / Contact Section -->
    <section
      id="contact"
      aria-labelledby="contact-heading"
      class="space-y-4 scroll-mt-20"
    >
      <h2
        id="contact-heading"
        class="text-xs font-mono uppercase tracking-wider text-muted-foreground"
      >
        Contact
      </h2>

      <p class="text-sm text-muted-foreground leading-relaxed">
        I'm always open to discussing new projects, frontend engineering
        opportunities, or web design collaborations.
      </p>

      <div class="space-y-2 text-xs sm:text-sm">
        <div
          v-for="contact in allContacts"
          :key="contact.name"
          class="flex items-baseline justify-between py-1 border-b border-border/40"
        >
          <span class="text-muted-foreground font-mono">{{
            contact.name
          }}</span>
          <div class="flex items-center gap-2">
            <a
              :href="contact.link"
              :target="contact.external ? '_blank' : undefined"
              :rel="contact.external ? 'noopener noreferrer' : undefined"
              class="prose-link"
            >
              {{ contact.label }}
              <span v-if="contact.external" class="text-xs">↗</span>
            </a>
            <button
              v-if="contact.name === 'Email'"
              type="button"
              @click="copyEmail"
              class="text-[11px] font-mono px-1.5 py-0.5 rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors cursor-pointer"
            >
              {{ copiedEmail ? "copied!" : "copy" }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
