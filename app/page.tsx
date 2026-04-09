export const dynamic = "force-dynamic";

import Script from "next/script";
import { getSheetData } from "@/lib/googleSheets";
import { getStories } from "@/lib/getStories";

import FeaturedPosts from "@/components/FeaturedPosts";
import PostGrid from "@/components/PostGrid";
import Hero from "@/components/Hero";
import TrendingPosts from "@/components/TrendingPosts";
import HomeSEOSection from "@/components/HomeSEOSection";
import BlogCard from "@/components/BlogCard";

export const metadata = {
  title: "Ahsan's Blog | Technology, AI & Global Trends",
  description:
    "A modern journal exploring technology, artificial intelligence, internet culture, and global trends shaping our digital future.",
};

export default async function Home() {

  const posts = await getSheetData();
  const stories = await getStories();

  /* Filter published posts */
  const publishedPosts = posts.filter((post: any) => post.status === "published");

  /* Sort posts by date */
  const sortedPosts = [...publishedPosts].sort(
    (a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featured = sortedPosts.slice(0, 4);

  /* Filter + sort stories */
  const publishedStories = stories.filter(
    (story: any) => story.status === "published"
  );

  const sortedStories = [...publishedStories].sort(
    (a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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

      {/* ItemList Schema */}
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

      {/* NewsArticle Schema */}
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

      {/* <TrendingPosts posts={sortedPosts} /> */}

      {/* <PostGrid posts={sortedPosts.slice(8, 14)} /> */}


        {/* FEATURED STORY */}

{sortedStories.length > 0 && (

<section className="max-w-[1100px] mx-auto px-6 mb-24">

<h2 className="text-2xl font-semibold mb-10">
⭐ Featured Story
</h2>

<div className="bg-white border rounded-2xl overflow-hidden shadow-sm">

<a href={`/stories/${sortedStories[0].slug}`}>

{sortedStories[0].image && (
<img
src={sortedStories[0].image}
alt={sortedStories[0].title}
className="w-full h-[360px] object-cover"
/>
)}

<div className="p-8">

<h3 className="text-3xl font-semibold mb-4">
{sortedStories[0].title}
</h3>

<p className="text-gray-600">
{sortedStories[0].excerpt}
</p>

<span className="inline-block mt-4 font-medium">
Read Story →
</span>

</div>

</a>

</div>

</section>

)}


      {/* ✨ Latest Stories Section */}

      <section className="max-w-[1100px] mx-auto px-6 mb-24">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-2xl font-semibold">
            ✨ Latest Stories
          </h2>

          <a
            href="/stories"
            className="text-sm text-gray-600 hover:text-black transition"
          >
            View All →
          </a>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {sortedStories.slice(1, 4).map((story: any) => (
            <BlogCard
  key={story.slug}
  title={story.title}
  excerpt={story.excerpt}
  image={story.image}
  url={`/stories/${story.slug}`}
/>
          ))}

        </div>

      </section>

      <HomeSEOSection posts={sortedPosts} />

    </main>
  );
}