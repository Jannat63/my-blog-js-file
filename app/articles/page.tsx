export const dynamic = "force-dynamic";

import Script from "next/script";
import { getSheetData } from "@/lib/googleSheets";
import PostGrid from "@/components/PostGrid";
import ArticlesSEOSection from "@/components/ArticlesSEOSection";

export const metadata = {
  title: "All Articles | Ahsan's Blog",
  description:
    "Browse all articles from Ahsan's Blog covering technology, artificial intelligence, geopolitics and global trends.",
};

export default async function ArticlesPage() {

  const posts = await getSheetData();

  const sortedPosts = posts.sort(
    (a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const siteUrl = "https://ahsansblog.netlify.app";

  return (
    <main>

      {/* ItemList Schema */}
      <Script
        id="articles-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: sortedPosts.map((post: any, index: number) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${siteUrl}/blog/${post.slug}`,
            })),
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="articles-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Articles",
                item: `${siteUrl}/articles`,
              },
            ],
          }),
        }}
      />

      {/* Author Schema */}
      <Script
        id="articles-author-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ahsan Jannat",
            url: `${siteUrl}/about`,
            jobTitle: "Technology Blogger",
          }),
        }}
      />

      {/* PAGE HEADER */}
      <section className="max-w-[1100px] mx-auto px-6 pt-24 pb-14">

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          All Articles
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl">
          Explore all blog posts covering technology, artificial intelligence,
          geopolitics, and the digital world.
        </p>

        <div className="mt-8 h-px w-24 bg-gradient-to-r from-black/70 to-transparent"></div>

      </section>

      {/* POSTS GRID */}
      <PostGrid posts={sortedPosts} showHeader={false} />

      {/* SEO CONTENT */}
      <ArticlesSEOSection />

    </main>
  );
}