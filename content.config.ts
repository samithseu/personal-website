import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    certificates: defineCollection({
      type: "data",
      source: "certificates/**.json",
      schema: z.object({
        id: z.string(),
        issue_date: z.string(),
        title: z.string(),
        org: z.string(),
        url: z.string(),
      }),
    }),
  },
});
