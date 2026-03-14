export const dynamic = "force-dynamic";

import { getSheetData } from "@/lib/googleSheets";
import { getStories } from "@/lib/getStories";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const posts = await getSheetData();
  const stories = await getStories();

  const baseUrl = "https://ahsansblog.netlify.app";

  /* Blog post URLs */

  const postUrls = posts
    .filter((post:any)=>post.status==="published")
    .map((post:any)=>({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date || new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));


  /* Story URLs */

  const storyUrls = stories
    .filter((story:any)=>story.status==="published")
    .map((story:any)=>({
      url: `${baseUrl}/stories/${story.slug}`,
      lastModified: story.date || new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));


  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },

    ...postUrls,
    ...storyUrls
  ];

}