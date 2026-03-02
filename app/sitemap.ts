export const dynamic = "force-dynamic";

import { getSheetData } from "@/lib/googleSheets";

export default async function sitemap() {
  const posts = await getSheetData();

  const baseUrl = "https://ahsansblog.netlify.app/";

  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}