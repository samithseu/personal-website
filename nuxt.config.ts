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
    "/certificates": { static: true },
    "/blogs": { prerender: true },
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
  },
  image: {
    provider: "vercel",
    domains: [],
  },
});
