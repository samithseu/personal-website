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
      link: "https://github.com/samithseu",
    },
    {
      name: "LinkedIn",
      iconName: "tabler:brand-linkedin",
      link: "https://linkedin.com/in/samith-seu/",
    },
    {
      name: "Twitter/X",
      iconName: "tabler:brand-twitter",
      link: "https://twitter.com/seumith",
    },
    {
      name: "Telegram",
      iconName: "tabler:brand-telegram",
      link: "https://t.me/samithseu",
    },
    {
      name: "E-mail",
      iconName: "tabler:mail",
      link: "mailto:seusamith@gmail.com",
    },
  ]);

  return { allContacts };
};
