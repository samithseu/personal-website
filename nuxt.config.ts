// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  routeRules: {
    "/": { prerender: true },
    "/about": { prerender: true },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@nuxt/fonts", "@nuxt/icon", "nuxt-og-image", "@nuxt/image"],

  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  ogImage: {
    defaults: {
      renderer: "satori",
      cacheMaxAgeSeconds: 60 * 60 * 24,
    },
  },
});
