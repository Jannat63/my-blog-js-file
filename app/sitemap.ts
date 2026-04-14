import { getSheetData } from "@/lib/googleSheets";
import { getStories } from "@/lib/getStories";
import type { MetadataRoute } from "next";

// ✅ Cache sitemap (VERY IMPORTANT)
export const revalidate = 3600; // 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ahsansblog.netlify.app";

  // Fetch data
  const posts = await getSheetData();
  const stories = await getStories();

  // 🔹 Static pages
  const staticPages = ["", "/blog", "/stories", "/about", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.9,
  }));

  // 🔹 Blog posts
  const postUrls = posts
    .filter((post: any) => post.status === "published")
    .map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  // 🔹 Stories
  const storyUrls = stories
    .filter((story: any) => story.status === "published")
    .map((story: any) => ({
      url: `${baseUrl}/stories/${story.slug}`,
      lastModified: new Date(story.updated_at || story.date),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...postUrls, ...storyUrls];
}