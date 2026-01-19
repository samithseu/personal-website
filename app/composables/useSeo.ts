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
  const { siteUrl: url } = useRuntimeConfig().public;
  // schema.org structured data
  useSchemaOrg([
    defineWebPage(),
    defineWebSite({ name: title, description, url }),
    definePerson({
      url,
      name: "Samith Seu",
      description: "A web developer and lifelong learner.",
      alternateName: ["Seu Samith", "Samith Seu", "ស៊ឺ សាមីត"],
      sameAs: [
        "https://github.com/samithseu",
        "https://linkedin.com/in/samith-seu/",
        "https://x.com/seumith",
        "https://t.me/samithseu",
      ],
    }),
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
