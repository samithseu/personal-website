import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "nuxt-og-image",
    "@nuxt/image",
    "@nuxt/content",
  ],
  routeRules: {
    "/": { prerender: true },
    "/about": { prerender: true },
    "/projects": { isr: 3600 },
    "/certificates": { prerender: true },
    "/blogs": { prerender: true },
  },
  experimental: {
    viewTransition: true,
  },
  ogImage: {
    defaults: {
      renderer: "satori",
      extension: "png",
    },
  },
  $development: {
    icon: {
      serverBundle: "auto",
    },
    runtimeConfig: {
      githubToken: "",
      public: {
        siteUrl: "http://localhost:3000",
      },
    },
  },
  $production: {
    icon: {
      serverBundle: "auto",
    },
    runtimeConfig: {
      githubToken: "",
      public: {
        siteUrl:
          process.env.NUXT_PUBLIC_SITE_URL || "https://samithseu.vercel.app",
      },
    },
    image: {
      format: ["webp", "avif"],
      provider: "vercel",
      domains: ["samithseu.vercel.app"],
      screens: {
        sm: 350,
        md: 600,
        lg: 700,
      },
    },
  },
});
