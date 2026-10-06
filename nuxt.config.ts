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

const aboutPicturePath = "./public/about-picture.jpg";
const aboutPictureHash = fs.existsSync(aboutPicturePath)
  ? crypto
      .createHash("md5")
      .update(fs.readFileSync(aboutPicturePath))
      .digest("hex")
      .slice(0, 8)
  : "v1";

const staticAssetRule = {
  headers: {
    "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
  },
};

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  prerender: {
    routes: [projectsOgImagePath],
    ignore: ["/_ipx"],
  },
  nitro: {
    preset: "vercel",
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
    "@vite-pwa/nuxt",
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
        "cache-control": "public, max-age=31536000, s-maxage=31536000, immutable",
      },
    },
    "/svg/**": {
      redirect: { to: "/logos/**", statusCode: 301 },
    },
    "/certs/**": staticAssetRule,
    "/about-picture.jpg": staticAssetRule,
    "/favicon.svg": staticAssetRule,
    "/favicon.ico": staticAssetRule,
    "/_ipx/**": { prerender: false },
    "/sw.js": {
      headers: {
        "cache-control": "no-cache, no-store, must-revalidate",
      },
    },

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
  experimental: {
    viewTransition: true,
    routeTypedFetch: true,
    early404: true,
    prerenderErrorPages: true,
    stripNeverHydratedData: true,
  },
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
      aboutPictureHash,
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
  pwa: {
    registerType: "autoUpdate",
    manifest: false,
    workbox: {
      navigateFallback: null,
      globPatterns: [
        "**/*.{js,css,html,png,jpg,jpeg,svg,ico,webp,woff2}",
      ],
      maximumFileSizeToCacheInBytes: 4000000,
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.mode === "navigate",
          handler: "NetworkFirst",
          options: {
            cacheName: "pages-cache",
            networkTimeoutSeconds: 3,
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "api-cache",
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: ({ request, url }) =>
            request.destination === "image" ||
            url.pathname.startsWith("/_vercel/image") ||
            url.pathname.startsWith("/_ipx/") ||
            url.pathname.startsWith("/certs/") ||
            url.pathname.startsWith("/logos/") ||
            url.pathname.startsWith("/svg/") ||
            /\.(?:png|jpg|jpeg|svg|webp|ico|gif)$/i.test(url.pathname),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "images-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: ({ url }) => url.pathname.startsWith("/_fonts/"),
          handler: "CacheFirst",
          options: {
            cacheName: "fonts-cache",
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 365,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    devOptions: {
      enabled: false,
      suppressWarnings: true,
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
