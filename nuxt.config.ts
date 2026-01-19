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
    "@nuxtjs/seo",
  ],
  routeRules: {
    "/": { prerender: true },
    "/about": { prerender: true },
    "/projects": { isr: 60 * 5 }, // 5 minutes
    "/certificates": { prerender: true },
    "/blogs": { prerender: true },

    // social media
    "/github": { redirect: "https://github.com/samithseu" },
    "/linkedin": { redirect: "https://linkedin.com/in/samith-seu/" },
    "/x": { redirect: "https://x.com/seumith" },
    "/telegram": { redirect: "https://t.me/samithseu" },
    "/email": { redirect: "mailto:seusamith@gmail.com" },
  },
  experimental: {
    viewTransition: true,
  },
  app: {
    viewTransition: true,
  },
  ogImage: {
    defaults: {
      renderer: "satori",
      extension: "png",
    },
  },
  // nitro: {
  //   prerender: {
  //     ignore: ["/github", "/linkedin", "/x", "/telegram", "/email"],
  //   },
  // },
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
