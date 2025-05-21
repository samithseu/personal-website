// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],

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

  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  ogImage: {
    defaults: {
      renderer: "satori",
    },
  },
  runtimeConfig: {
    notionApiKey: process.env.NOTION_API_KEY,
    notionDbId: process.env.NOTION_DB_ID,
    public: {
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
    },
  },
});
