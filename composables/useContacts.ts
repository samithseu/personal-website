export const useContacts = () => {
  // ALL SOCIAL MEDIAS
  // https://icones.js.org/collection/tabler - Icon packs
  const allContacts = ref<Array<{
    name: string;
    iconName: string;
    link: string;
  }> | null>([
    {
      name: "GitHub",
      iconName: "tabler:brand-github",
      link: "/github",
    },
    {
      name: "LinkedIn",
      iconName: "tabler:brand-linkedin",
      link: "/linkedin",
    },
    {
      name: "Twitter/X",
      iconName: "tabler:brand-twitter",
      link: "/x",
    },
    {
      name: "Telegram",
      iconName: "tabler:brand-telegram",
      link: "/telegram",
    },
    {
      name: "E-mail",
      iconName: "tabler:mail",
      link: "/email",
    },
  ]);

  return { allContacts };
};
