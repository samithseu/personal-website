export interface SeoProps {
  title: string;
  description: string;
  ogImageHeadline?: string;
  ogImageComponent?: string;
}

export const useSeo = ({
  title,
  description,
  ogImageHeadline = "personal website",
  ogImageComponent = "EachPage",
}: SeoProps) => {
  // Build the title template:
  const titleTemplate = `%s - ${title}`;

  // Inject SEO tags as before:
  useSeoMeta({
    titleTemplate,
    description,
    ogSiteName: "samith.info",
    ogTitle: titleTemplate,
    ogDescription: description,
    twitterTitle: titleTemplate,
    twitterSite: "samith.info",
    twitterDescription: description,
  });

  // Render the Open Graph image component:
  defineOgImageComponent(ogImageComponent, {
    headline: ogImageHeadline,
    title: titleTemplate,
    desc: description,
  });
};
