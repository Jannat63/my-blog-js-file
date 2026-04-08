import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/admin",
          "/dashboard",
          "/api",
          "/private",
          "/*?*", // prevent duplicate URLs (query params)
        ],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin", "/api", "/*?*"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api",
          "/private",
        ],
      },
    ],
    sitemap: "https://ahsansblog.netlify.app/sitemap.xml",
  };
}