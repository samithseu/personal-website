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
    "/projects-isr": { redirect: "/projects" }, // temporary redirect for ISR
  },
  experimental: {
    viewTransition: true,
  },
  ogImage: {
    defaults: {
      renderer: "satori",
    },
  },
  runtimeConfig: {
    githubToken: "",
    public: {
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL || "https://samithseu.vercel.app",
    },
  },
  image: {
    provider: "vercel",
    domains: [],
  },
});
