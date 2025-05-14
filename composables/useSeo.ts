export type useSeoProps = {
  title: string;
  description: string;
  ogImageHeadline?: string;
  ogImageComponent?: string;
};

export const useSeo = (props: useSeoProps) => {
  const { title, description } = props;
  const ogImageHeadline = props.ogImageHeadline ?? "personal website";
  const ogImageComponent = props.ogImageComponent ?? "EachPage";
  const titleTemplate = `%s - ${title}`;

  useSeoMeta({
    titleTemplate,
    ogTitle: titleTemplate,
    twitterTitle: titleTemplate,
    description,
    ogDescription: description,
    twitterDescription: description,
  });

  defineOgImageComponent(ogImageComponent, {
    headline: ogImageHeadline,
    title: titleTemplate,
    desc: description,
  });
};
