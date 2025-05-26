export type SeoProps = {
  title: string;
  description: string;
  ogImageHeadline?: string;
  ogImageComponent?: string;
};

export const useSeo = (props: SeoProps) => {
  const { title, description } = props;
  const ogImageHeadline = props.ogImageHeadline ?? "personal website";
  const ogImageComponent = props.ogImageComponent ?? "EachPage";
  const titleTemplate = `%s - ${title}`;

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

  defineOgImageComponent(ogImageComponent, {
    headline: ogImageHeadline,
    title: titleTemplate,
    desc: description,
  });
};
