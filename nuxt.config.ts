import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: true,
    },
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "@unhead/schema-org/vue",
      ],
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
  icon: { compile: true },
  content: { build: { storage: "json" } },
  routeRules: {
    "/": { prerender: true },
    "/about": { prerender: true },
    "/projects": { isr: 60 * 5 }, // 5 minutes
    "/certificates": { isr: 3600 },
    "/blogs": { prerender: true },

    // social media
    "/github": { redirect: "https://github.com/samithseu" },
    "/linkedin": { redirect: "https://linkedin.com/in/samithseu/" },
    "/x": { redirect: "https://x.com/seumith" },
    "/telegram": { redirect: "https://t.me/samithseu" },
  },
  experimental: { viewTransition: true },
  app: { head: { titleTemplate: "%s" }, viewTransition: true },
  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN || "",
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://samith.dev",
      siteName: "Samith Seu - Home",
    },
    ogImage: { secret: process.env.OG_IMAGE_SECRET || "" },
  },
  sitemap: { 
    zeroRuntime: true, 
    sources: [],
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://samith.dev'
  },
  fonts: {
    families: [
      {
        name: "Inter",
        styles: ["normal"],
        weights: [300, 400, 600, 700],
        subsets: ["latin"],
        global: true,
      },
      {
        name: "Geist Mono",
        styles: ["normal"],
        weights: [400, 600],
        subsets: ["latin"],
        global: true,
      },
    ],
  },
  ogImage: {
    security: { strict: true },
    zeroRuntime: true,
    compatibility: {
      runtime: { takumi: "wasm" },
    },
  },
  $development: {
    runtimeConfig: {
      githubToken: "",
      public: {
        siteUrl: "http://localhost:3000",
        siteName: "Samith Seu - Home",
      },
      ogImage: { secret: "" },
    },
  },
  $production: {
    sourcemap: false,
    runtimeConfig: {
      githubToken: "",
      public: {
        siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://samith.dev",
        siteName: "Samith Seu - Home",
      },
      ogImage: { secret: "" },
    },
    image: {
      format: ["webp", "avif"],
      screens: {
        sm: 350,
        md: 600,
        lg: 700,
      },
    },
  },
});
