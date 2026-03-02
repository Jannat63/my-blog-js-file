export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ahsansblog.netlify.app/sitemap.xml",
  };
}