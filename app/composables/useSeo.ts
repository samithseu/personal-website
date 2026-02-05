export interface SeoProps {
  title: string;
  description: string;
  ogImageHeadline?: string;
  ogImageComponent?: string;
  noPrefix?: boolean;
}

export const useSeo = ({
  title,
  description,
  ogImageHeadline = "personal website",
  ogImageComponent = "EachPage",
  noPrefix = false,
}: SeoProps) => {
  // schema.org structured data
  const { siteUrl: url } = useRuntimeConfig().public;
  const inLanguage = "en-US";
  const definedPerson = definePerson({
    "@id": "samith.dev",
    "@type": "Person",
    url,
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
      "https://linkedin.com/in/samith-seu/",
      "https://x.com/seumith",
      "https://t.me/samithseu",
    ],
  });

  useSchemaOrg([
    defineWebSite({
      "@id": url,
      "@type": "WebSite",
      name: "Samith Seu - Personal Website",
      description:
        "Welcome to my digital space. Explore my work, read the blog, and learn about my journey as a developer.",
      url,
      inLanguage,
      publisher: definedPerson,
      datePublished: new Date("2025-05-12").toISOString(),
      dateModified: new Date().toISOString(),
    }),
    defineWebPage({
      "@id": useRoute().fullPath ?? url,
      "@type": "WebPage",
      url: useRoute().fullPath ?? url,
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
          target: [useRoute().fullPath ?? url],
        }),
      ],
    }),
    definedPerson,
  ]);

  // Build the title template:
  const titleTemplate = noPrefix ? title : `%s - ${title}`;

  useSeoMeta({
    titleTemplate,
    description,
    ogSiteName: useRuntimeConfig().public.siteUrl,
    ogTitle: titleTemplate,
    ogDescription: description,
    twitterTitle: titleTemplate,
    twitterSite: useRuntimeConfig().public.siteUrl,
    twitterDescription: description,
    ogType: "website",
  });

  // Render the Open Graph image component:
  defineOgImageComponent(ogImageComponent, {
    headline: ogImageHeadline,
    title: titleTemplate,
    desc: description,
  });
};
