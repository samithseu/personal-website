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
const homeOgImagePath = `/_og/s/c_EachPage.takumi,v_${ogTemplateHash},p_Ii8i.png`;
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
    esbuild: {
      options: {
        target: "es2022",
      },
    },
    prerender: {
      routes: [homeOgImagePath],
    },
    serverAssets: [
      {
        baseName: "svg",
        dir: "./server/assets/svg",
      },
    ],
  },
  skewProtection: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@nuxt/fonts", "nuxt-og-image", "@nuxtjs/seo", "@vite-pwa/nuxt"],
  routeRules: {
    "/": {
      prerender: true,
      ogImage: {
        component: "EachPage.takumi",
        props: {
          title: "Samith Seu",
          desc: "Web Developer specializing in crafting responsive, performant, and user-friendly web interfaces.",
          v: ogTemplateHash,
          fontFamily: "Geist Mono",
        },
      },
    },
    "/about": { redirect: { to: "/#about", statusCode: 301 } },
    "/projects": { redirect: { to: "/#projects", statusCode: 301 } },
    "/certificates": { redirect: { to: "/#credentials", statusCode: 301 } },
    "/blogs": { redirect: { to: "/", statusCode: 301 } },
    "/api/certificates": { redirect: { to: "/", statusCode: 301 } },
    "/logos/**": {
      headers: {
        "content-type": "image/svg+xml; charset=utf-8",
        "cache-control":
          "public, max-age=31536000, s-maxage=31536000, immutable",
      },
    },
    "/svg/**": {
      redirect: { to: "/logos/**", statusCode: 301 },
    },
    "/certs/**": staticAssetRule,
    "/about-picture.jpg": staticAssetRule,
    "/favicon.svg": staticAssetRule,
    "/favicon.ico": staticAssetRule,
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
    name: "Samith Seu",
  },
  runtimeConfig: {
    githubToken:
      process.env.NUXT_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "",
    public: {
      ogVersion: ogTemplateHash,
      homeOgImage: homeOgImagePath,
      site: {
        url: process.env.NUXT_PUBLIC_SITE_URL || "https://samith.dev",
        name: "Samith Seu",
      },
    },
  },
  sitemap: {
    zeroRuntime: true,
    sources: [],
  },
  fonts: {
    defaults: {
      preload: false,
    },
    families: [
      {
        name: "Inter",
        styles: ["normal"],
        weights: [400, 500, 600],
        subsets: ["latin"],
        preload: true,
      },
      {
        name: "Geist Mono",
        styles: ["normal"],
        weights: [400, 500],
        subsets: ["latin"],
        preload: false,
        global: true,
      },
    ],
  },
  ogImage: { zeroRuntime: true },
  pwa: {
    registerType: "autoUpdate",
    manifest: false,
    workbox: {
      navigateFallback: null,
      globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,ico,webp,woff2}"],
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
            networkTimeoutSeconds: 1.5,
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
            url.pathname.startsWith("/certs/") ||
            url.pathname.startsWith("/logos/") ||
            url.pathname.startsWith("/svg/") ||
            /\.(?:png|jpg|jpeg|svg|webp|ico|gif)$/i.test(url.pathname),
          handler: "CacheFirst",
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
          name: "Samith Seu",
        },
      },
    },
  },
  $production: {
    sourcemap: false,
    runtimeConfig: {
      public: {
        site: {
          url: process.env.NUXT_PUBLIC_SITE_URL || "https://samith.dev",
          name: "Samith Seu",
        },
      },
    },
  },
});
