export type Contact = {
  name: string;
  label: string;
  link: string;
  external?: boolean;
};

const ALL_CONTACTS: readonly Contact[] = [
  {
    name: "GitHub",
    label: "samithseu",
    link: "https://github.com/samithseu",
    external: true,
  },
  {
    name: "LinkedIn",
    label: "samithseu",
    link: "https://linkedin.com/in/samithseu/",
    external: true,
  },
  {
    name: "X (Twitter)",
    label: "@seumith",
    link: "https://x.com/seumith",
    external: true,
  },
  {
    name: "Telegram",
    label: "t.me/samithseu",
    link: "https://t.me/samithseu",
    external: true,
  },
  {
    name: "Email",
    label: "contact@samith.dev",
    link: "mailto:contact@samith.dev",
    external: false,
  },
  {
    name: "Resume",
    label: "resume.samith.dev",
    link: "https://resume.samith.dev",
    external: true,
  },
] as const;

export const useContacts = () => {
  return { allContacts: ALL_CONTACTS };
};
