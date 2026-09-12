import fs from "node:fs";
import crypto from "node:crypto";
import tailwindcss from "@tailwindcss/vite";

const takumiTemplatePath = "./app/components/OgImage/EachPage.takumi.vue";
const ogTemplateHash = fs.existsSync(takumiTemplatePath)
  ? crypto
      .createHash("md5")
      .update(fs.readFileSync(takumiTemplatePath))
      .digest("hex")
      .slice(0, 8)
  : "v1";
const projectsOgImagePath = `/_og/s/c_EachPage.takumi,v_${ogTemplateHash},p_Ii9wcm9qZWN0cyI.png`;

const staticAssetRule = {
  headers: {
    "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
  },
};

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  nitro: {
    preset: "vercel",
    prerender: {
      routes: [projectsOgImagePath],
      ignore: ["/_ipx"],
    },
    serverAssets: [
      {
        baseName: "svg",
        dir: "./server/assets/svg",
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  hooks: {
    "vite:extendConfig"(config) {
      if (config.optimizeDeps?.include) {
        config.optimizeDeps.include = config.optimizeDeps.include.filter(
          (entry) => !entry.startsWith("@nuxtjs/mdc >"),
        );
      }
    },
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "nuxt-og-image",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxtjs/seo",
  ],
  icon: {
    mode: "css",
    cssLayer: "base",
    serverBundle: false,
  },
  routeRules: {
    "/": { prerender: true },
    "/about": { prerender: true },
    "/projects": {
      isr: 60 * 5, // 5 minutes
      ogImage: {
        component: "EachPage.takumi",
        props: {
          headline: "personal website",
          title: "Samith Seu - Projects",
          desc: "See what I've been building lately. Browse through my featured projects, view the tech stacks I used, and check out the live demos.",
          v: ogTemplateHash,
          fontFamily: "Geist Mono",
        },
      },
    },
    "/certificates": { prerender: true },
    "/blogs": { prerender: true },
    "/api/certificates": { prerender: true },
    "/logos/**": {
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
      },
    },
    "/certs/**": staticAssetRule,
    "/about-picture.jpg": staticAssetRule,
    "/favicon.svg": staticAssetRule,
    "/favicon.ico": staticAssetRule,
    "/_ipx/**": { prerender: false },

    "/llm.txt": {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=3600, s-maxage=86400",
      },
    },
    "/llms.txt": { redirect: "/llm.txt" },

    // social media
    "/github": { redirect: "https://github.com/samithseu" },
    "/linkedin": { redirect: "https://linkedin.com/in/samithseu/" },
    "/x": { redirect: "https://x.com/seumith" },
    "/telegram": { redirect: "https://t.me/samithseu" },
  },
  experimental: { viewTransition: true },
  app: { head: { titleTemplate: "%s" } },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://samith.dev",
    name: "Samith Seu - Personal Website",
  },
  runtimeConfig: {
    githubToken:
      process.env.NUXT_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "",
    public: {
      ogVersion: ogTemplateHash,
      projectsOgImage: projectsOgImagePath,
      site: {
        url: process.env.NUXT_PUBLIC_SITE_URL || "https://samith.dev",
        name: "Samith Seu - Personal Website",
      },
    },
  },
  sitemap: {
    zeroRuntime: true,
    sources: [],
  },
  fonts: {
    defaults: {
      preload: true,
    },
    families: [
      {
        name: "Geist Mono",
        styles: ["normal"],
        weights: [400, 500, 600, 700],
        subsets: ["latin"],
        preload: true,
        global: true,
      },
      {
        name: "Inter",
        styles: ["normal"],
        weights: [400, 500, 600, 700, 800],
        subsets: ["latin"],
        preload: true,
      },
    ],
  },
  ogImage: { zeroRuntime: true },
  image: {
    format: ["webp"],
    quality: 80,
    screens: {
      sm: 350,
      md: 600,
      lg: 700,
    },
  },
  content: {
    build: {
      markdown: {
        highlight: false,
      },
    },
  },
  $development: {
    runtimeConfig: {
      public: {
        site: {
          url: "http://localhost:3000",
          name: "Samith Seu - Personal Website",
        },
      },
    },
  },
  $production: {
    sourcemap: false,
    runtimeConfig: {
      public: {
        site: {
          url:
            process.env.NUXT_PUBLIC_SITE_URL || "https://samith.dev",
          name: "Samith Seu - Personal Website",
        },
      },
    },
  },
});
