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
  // Build the title template:
  const titleTemplate = noPrefix ? title : `%s - ${title}`;

  useSeoMeta({
    titleTemplate,
    description,
    ogSiteName: "samith.info",
    ogTitle: titleTemplate,
    ogDescription: description,
    twitterTitle: titleTemplate,
    twitterSite: "samith.info",
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
