export const dynamic = "force-dynamic";

import Script from "next/script";
import { getSheetData } from "@/lib/googleSheets";
import FeaturedPosts from "@/components/FeaturedPosts";
import PostGrid from "@/components/PostGrid";
import Hero from "@/components/Hero";
import TrendingPosts from "@/components/TrendingPosts";
import HomeSEOSection from "@/components/HomeSEOSection";

export const metadata = {
  title: "Ahsan's Blog | Technology, AI & Global Trends",
  description:
    "A modern journal exploring technology, artificial intelligence, internet culture, and global trends shaping our digital future.",
};

export default async function Home() {

  const posts = await getSheetData();

  /* SEO safety: prevent draft posts appearing on homepage */
  const publishedPosts = posts.filter((post: any) => post.status === "published");

  /* safer sorting (prevents mutation issues) */
  const sortedPosts = [...publishedPosts].sort(
    (a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featured = sortedPosts.slice(0, 4);

  return (
    <main>

      <Script
id="organization-schema"
type="application/ld+json"
dangerouslySetInnerHTML={{
__html: JSON.stringify({
"@context": "https://schema.org",
"@type": "Organization",
name: "Ahsan's Blog",
url: "https://ahsansblog.netlify.app",
logo: "https://ahsansblog.netlify.app/logo.png",
founder: {
"@type": "Person",
name: "Ahsan Jannat"
}
})
}}
/>

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

      {/* ItemList Schema for Homepage Posts */}
      <Script
        id="post-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: sortedPosts.slice(0, 10).map((post: any, index: number) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://ahsansblog.netlify.app/post/${post.slug}`,
            })),
          }),
        }}
      />

      {/* BlogPosting Schema */}
      <Script
        id="homepage-blogposting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": sortedPosts.slice(0, 8).map((post: any) => ({
              "@type": "BlogPosting",
              headline: post.title,
              image: post.image,
              datePublished: post.date,
              author: {
                "@type": "Person",
                name: "Ahsan Jannat",
              },
              publisher: {
                "@type": "Organization",
                name: "Ahsan's Blog",
              },
              url: `https://ahsansblog.netlify.app/post/${post.slug}`,
            })),
          }),
        }}
      />

      {/* NewsArticle Schema (Discover / Top Stories signal) */}
      <Script
        id="homepage-news-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": sortedPosts.slice(0, 5).map((post: any) => ({
              "@type": "NewsArticle",
              headline: post.title,
              image: post.image,
              datePublished: post.date,
              author: {
                "@type": "Person",
                name: "Ahsan Jannat",
              },
              publisher: {
                "@type": "Organization",
                name: "Ahsan's Blog",
              },
              mainEntityOfPage: `https://ahsansblog.netlify.app/post/${post.slug}`,
            })),
          }),
        }}
      />

      <Hero />

      <FeaturedPosts posts={featured} />

      <TrendingPosts posts={sortedPosts} />

      <PostGrid posts={sortedPosts.slice(8, 14)} />

<HomeSEOSection posts={sortedPosts} />

    </main>
  );
}