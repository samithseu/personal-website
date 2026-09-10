export type CustomOGImageProps = {
  headline?: string;
  title?: string;
  desc?: string;
  v?: string | number;
};

export interface SeoProps {
  title: string;
  description: string;
  noPrefix?: boolean;
  ogHeadline?: string;
  ogImage?: boolean;
  ogImageUrl?: string;
}

export const useSeo = ({
  title,
  description,
  noPrefix = false,
  ogHeadline = "personal website",
  ogImage = true,
  ogImageUrl,
}: SeoProps) => {
  // Schema.org structured data & dynamic URLs
  const config = useRuntimeConfig();
  const siteUrl = (config.public.site?.url || config.public.siteUrl || "https://samithseu.vercel.app") as string;
  const inLanguage = "en-US";
  const route = useRoute();
  const canonicalUrl = `${siteUrl}${route.path === "/" ? "" : route.path}`;

  const definedPerson = definePerson({
    "@id": `${siteUrl}/#person`,
    "@type": "Person",
    url: siteUrl,
    name: "Samith Seu",
    description: "A web developer and lifelong learner.",
    alternateName: [
      "Seu Samith",
      "Samith Seu",
      "samithseu",
      "seusamith",
      "seumith",
      "ស៊ឺ សាមីត",
    ],
    sameAs: [
      "https://samithseu.vercel.app",
      "https://github.com/samithseu",
      "https://linkedin.com/in/samithseu/",
      "https://x.com/seumith",
      "https://t.me/samithseu",
    ],
  });

  useSchemaOrg([
    defineWebSite({
      "@id": `${siteUrl}/#website`,
      "@type": "WebSite",
      name: "Samith Seu - Personal Website",
      description:
        "Welcome to my digital space. Explore my work, read the blog, and learn about my journey as a developer.",
      url: siteUrl,
      inLanguage,
      publisher: definedPerson,
      datePublished: new Date("2025-05-12").toISOString(),
      dateModified: new Date().toISOString(),
    }),
    defineWebPage({
      "@id": canonicalUrl,
      "@type": "WebPage",
      url: canonicalUrl,
      name: title,
      description,
      author: definedPerson,
      inLanguage,
      keywords: [
        "ស៊ឺ សាមីត",
        "Seu Samith",
        "Samith Seu",
        "web developer",
        "personal website",
        "developer website",
        "developer portfolio",
      ],
      potentialAction: [
        defineReadAction({
          "@type": "ReadAction",
          target: [canonicalUrl],
        }),
      ],
    }),
    definedPerson,
  ]);

  // Clean full title without unparsed '%s' placeholders for Open Graph and Twitter cards
  const fullTitle = noPrefix ? title : `Samith Seu - ${title}`;

  // For non-prerendered pages like /projects (which has zeroRuntime: true and ISR),
  // defineOgImage is tree-shaken away by nuxt-og-image at runtime. We supply the
  // prerendered static OG image URL directly to useSeoMeta.
  const rawOgImage =
    ogImageUrl ||
    (route.path === "/projects"
      ? (config.public.projectsOgImage as string)
      : undefined);
  const resolvedOgImageUrl = rawOgImage
    ? rawOgImage.startsWith("http")
      ? rawOgImage
      : `${siteUrl}${rawOgImage}`
    : undefined;

  useSeoMeta({
    title: fullTitle,
    titleTemplate: "%s",
    description,
    ogSiteName: "Samith Seu",
    ogTitle: fullTitle,
    ogDescription: description,
    twitterTitle: fullTitle,
    twitterSite: "@seumith",
    twitterCreator: "@seumith",
    twitterDescription: description,
    ogType: "website",
    ...(resolvedOgImageUrl
      ? {
          ogImage: resolvedOgImageUrl,
          twitterImage: resolvedOgImageUrl,
          twitterCard: "summary_large_image",
        }
      : {}),
  });

  if (ogImage) {
    defineOgImage("EachPage.takumi", {
      headline: ogHeadline,
      title: fullTitle,
      desc: description,
      v: (config.public.ogVersion as string) || "v1",
    });
  }
};
