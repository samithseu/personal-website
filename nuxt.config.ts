import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  nitro: {
    preset: "vercel",
    prerender: {
      crawlLinks: true,
      routes: ["/", "/certificates", "/blogs"],
      ignore: ["/about"],
    },
  },
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
  icon: {
    mode: "css",
    cssLayer: "base",
    serverBundle: { collections: ["tabler"] },
  },
  content: { build: { storage: "json" } },
  routeRules: {
    "/": { prerender: true },
    "/about": { prerender: true },
    "/projects": { isr: 60 * 5 }, // 5 minutes
    "/certificates": { prerender: true },
    "/blogs": { prerender: true },

    // social media
    "/github": { redirect: "https://github.com/samithseu" },
    "/linkedin": { redirect: "https://linkedin.com/in/samithseu/" },
    "/x": { redirect: "https://x.com/seumith" },
    "/telegram": { redirect: "https://t.me/samithseu" },
  },
  experimental: { viewTransition: true },
  app: { head: { titleTemplate: "%s" }, viewTransition: true },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://samithseu.vercel.app",
    name: "Samith Seu - Home",
  },
  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN || "",
    public: {
      site: {
        url: process.env.NUXT_PUBLIC_SITE_URL || "https://samithseu.vercel.app",
        name: "Samith Seu - Home",
      },
    },
  },
  sitemap: {
    zeroRuntime: true,
    sources: [],
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://samithseu.vercel.app",
  },
  fonts: {
    families: [
      {
        name: "Geist Mono",
        styles: ["normal"],
        weights: [400, 600],
        subsets: ["latin"],
        global: true,
      },
      {
        name: "Inter",
        styles: ["normal"],
        weights: [300, 400, 600, 700],
        subsets: ["latin"],
        global: true,
      },
    ],
  },
  ogImage: { zeroRuntime: true },
  $development: {
    runtimeConfig: {
      githubToken: "",
      public: {
        site: {
          url: "http://localhost:3000",
          name: "Samith Seu - Home",
        },
      },
    },
  },
  $production: {
    sourcemap: false,
    runtimeConfig: {
      githubToken: "",
      public: {
        site: {
          url:
            process.env.NUXT_PUBLIC_SITE_URL || "https://samithseu.vercel.app",
          name: "Samith Seu - Home",
        },
      },
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
