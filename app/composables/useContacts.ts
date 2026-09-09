export type Contact = {
  name: string;
  iconName: string;
  link: string;
};

// Static immutable list of contacts to avoid per-component reactive allocations
const ALL_CONTACTS: readonly Contact[] = [
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
    link: "mailto:contact@samith.dev",
  },
] as const;

export const useContacts = () => {
  return { allContacts: ALL_CONTACTS };
};
