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
  pageType?: "WebPage" | "AboutPage" | "CollectionPage" | "ProfilePage";
}

// High-accuracy Schema.org Person & WebSite definitions cached to avoid repeated allocations
const personCache = new Map<string, ReturnType<typeof definePerson>>();
function getPersonNode(siteUrl: string) {
  let node = personCache.get(siteUrl);
  if (!node) {
    node = definePerson({
      "@id": `${siteUrl}/#person`,
      "@type": "Person",
      url: siteUrl,
      name: "Samith Seu",
      givenName: "Samith",
      familyName: "Seu",
      jobTitle: "Frontend & Interface Engineer",
      description:
        "Frontend & Interface Engineer and Web Developer specializing in crafting responsive, performant, and user-friendly web interfaces and applications using modern technologies including Vue, Nuxt, React, TypeScript, and Tailwind CSS.",
      image: `${siteUrl}/about-picture.jpg`,
      email: "mailto:contact@samith.dev",
      alternateName: [
        "Seu Samith",
        "Samith Seu",
        "samithseu",
        "seusamith",
        "seumith",
        "ស៊ឺ សាមីត",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chbar Mon",
        addressRegion: "Kampong Speu",
        addressCountry: "KH",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Brachñāsāstra Technology Institute",
          alternateName: "BTI",
          url: "https://www.facebook.com/brachnasastraBTI/",
        },
        {
          "@type": "EducationalOrganization",
          name: "Kampong Speu High School",
          url: "https://maps.app.goo.gl/v2CP1f6JuUVK6pUm8",
        },
      ],
      knowsAbout: [
        "Vue.js",
        "Nuxt.js",
        "React.js",
        "Astro",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Node.js",
        "Laravel",
        "REST API Design",
        "SQL",
        "PostgreSQL",
        "Supabase",
        "Git",
        "Docker",
        "Figma",
        "Frontend Engineering",
        "Web Development",
      ],
      knowsLanguage: ["en", "km"],
      sameAs: [
        "https://github.com/samithseu",
        "https://linkedin.com/in/samithseu/",
        "https://x.com/seumith",
        "https://t.me/samithseu",
        "https://resume.samith.dev",
      ],
    });
    personCache.set(siteUrl, node);
  }
  return node;
}

const websiteCache = new Map<string, ReturnType<typeof defineWebSite>>();
function getWebsiteNode(siteUrl: string, inLanguage: string) {
  let node = websiteCache.get(siteUrl);
  if (!node) {
    node = defineWebSite({
      "@id": `${siteUrl}/#website`,
      "@type": "WebSite",
      name: "Samith Seu - Personal Website",
      description:
        "Welcome to my digital space. Explore my work, read the blog, and learn about my journey as a developer.",
      url: siteUrl,
      inLanguage,
      publisher: { "@id": `${siteUrl}/#person` },
      author: { "@id": `${siteUrl}/#person` },
      datePublished: "2025-05-12T00:00:00.000Z",
    });
    websiteCache.set(siteUrl, node);
  }
  return node;
}

export const useSeo = ({
  title,
  description,
  noPrefix = false,
  ogHeadline = "personal website",
  ogImage = true,
  ogImageUrl,
  pageType,
}: SeoProps) => {
  // Schema.org structured data & dynamic URLs
  const config = useRuntimeConfig();
  const siteUrl = (config.public.site?.url || config.public.siteUrl || "https://samith.dev") as string;
  const inLanguage = "en-US";
  const route = useRoute();
  const canonicalUrl = route.path === "/" ? `${siteUrl}/` : `${siteUrl}${route.path}`;

  // Clean full title without unparsed '%s' placeholders
  const fullTitle = noPrefix ? title : `Samith Seu - ${title}`;

  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const webpageId = `${canonicalUrl}#webpage`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;

  const resolvedPageType =
    pageType ||
    (route.path === "/"
      ? "ProfilePage"
      : route.path === "/about"
        ? "AboutPage"
        : route.path === "/projects" ||
            route.path === "/certificates" ||
            route.path === "/blogs"
          ? "CollectionPage"
          : "WebPage");

  useSchemaOrg([
    getPersonNode(siteUrl),
    getWebsiteNode(siteUrl, inLanguage),
    defineWebPage({
      "@id": webpageId,
      "@type": resolvedPageType,
      url: canonicalUrl,
      name: fullTitle,
      description,
      author: { "@id": personId },
      inLanguage,
      isPartOf: {
        "@id": websiteId,
      },
      ...(resolvedPageType === "ProfilePage" || resolvedPageType === "AboutPage"
        ? { mainEntity: { "@id": personId } }
        : {}),
      keywords: [
        "Samith Seu",
        "Seu Samith",
        "ស៊ឺ សាមីត",
        "Frontend & Interface Engineer",
        "Web Developer",
        "Vue.js",
        "Nuxt.js",
        "TypeScript",
        "Tailwind CSS",
        "personal website",
        "developer portfolio",
      ],
      potentialAction: [
        defineReadAction({
          target: [canonicalUrl],
        }),
      ],
    }),
    defineBreadcrumb({
      "@id": breadcrumbId,
      itemListElement: [
        { name: "Home", item: `${siteUrl}/` },
        ...(route.path !== "/"
          ? [{ name: title, item: canonicalUrl }]
          : []),
      ],
    }),
  ]);

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
