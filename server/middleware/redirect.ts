export default defineEventHandler((event) => {
  const socialMedia: Record<string, string> = {
    github: "https://github.com/samithseu",
    linkedin: "https://linkedin.com/in/samith-seu/",
    x: "https://x.com/seumith",
    telegram: "https://t.me/samithseu",
    email: "mailto:seusamith@gmail.com",
  };

  const path = event.node.req.url?.slice(1);
  const targetUrl = socialMedia[path as keyof typeof socialMedia];

  if (targetUrl) {
    return sendRedirect(event, targetUrl, 301); // permanent redirect
  }
});
