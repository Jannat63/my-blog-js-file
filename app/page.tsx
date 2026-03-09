export const dynamic = "force-dynamic";

import Script from "next/script";
import { getSheetData } from "@/lib/googleSheets";
import FeaturedPosts from "@/components/FeaturedPosts";
import PostGrid from "@/components/PostGrid";
import Hero from "@/components/Hero";
import TrendingPosts from "@/components/TrendingPosts";

export const metadata = {
  title: "Ahsan's Blog | Technology, AI & Global Trends",
  description:
    "A modern journal exploring technology, artificial intelligence, internet culture, and global trends shaping our digital future.",
};

export default async function Home() {
  const posts = await getSheetData();

  const sortedPosts = posts.sort(
    (a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featured = sortedPosts.slice(0, 4);
  const rest = sortedPosts.slice(4);

  return (
    <main>

      {/* Website Schema */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Ahsan's Blog",
            url: "https://ahsansblog.netlify.app",
            author: {
              "@type": "Person",
              name: "Ahsan Jannat",
            },
          }),
        }}
      />

<Hero />

<FeaturedPosts posts={featured} />

<TrendingPosts posts={sortedPosts} />

<PostGrid posts={sortedPosts.slice(8)} />

    </main>
  );
}