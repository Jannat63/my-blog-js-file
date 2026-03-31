export const dynamic = "force-dynamic";

import BlogCard from "@/components/BlogCard";
import StoriesInfinite from "@/components/StoriesInfinite";
import StorySEOContent from "@/components/StorySEOContent";

/* ✅ METADATA (VERY IMPORTANT) */
export const metadata = {
  title: "বাংলা গল্প (Bangla Story) | বাস্তব জীবনের গল্প - Ahsan Jannat",
  description:
    "বাংলা গল্প (Bangla Story) পড়ুন বাস্তব অভিজ্ঞতা, ব্যক্তিগত উপলব্ধি এবং জীবনের গল্প। Ahsan Jannat এর লেখা গল্প সংগ্রহ।",
  alternates: {
    canonical: "https://ahsansblog.netlify.app/bangla-story",
  },
  openGraph: {
    title: "Bangla Story | বাংলা গল্প - Ahsan Jannat",
    description:
      "Real life Bangla stories, personal experiences and life lessons.",
    url: "https://ahsansblog.netlify.app/bangla-story",
  },
};

async function getStories() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://ahsansblog.netlify.app";

  const res = await fetch(`${base}/api/get-stories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch stories");
  }

  return res.json();
}

export default async function StoriesPage() {
  const stories = await getStories();

  const publishedStories = stories.filter(
    (story: any) => story.status === "published"
  );

  const sortedStories = [...publishedStories].sort(
    (a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  /* ✅ IMPROVED BLOG SCHEMA */
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Bangla Story - Ahsan Jannat",
    description:
      "বাংলা গল্প (Bangla Story), real life stories, personal experiences and life lessons.",
    author: {
      "@type": "Person",
      name: "Ahsan Jannat",
    },
    url: "https://ahsansblog.netlify.app/bangla-story",
  };

  /* ✅ ITEM LIST SCHEMA (SEO BOOST) */
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sortedStories.map((story: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://ahsansblog.netlify.app/blog/${story.slug}`,
    })),
  };

  /* ✅ BREADCRUMB SCHEMA */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ahsansblog.netlify.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bangla Story",
        item: "https://ahsansblog.netlify.app/bangla-story",
      },
    ],
  };

  return (
    <main className="max-w-[1100px] mx-auto px-6 pt-24 pb-24">

      {/* ✅ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* ✅ SEO-OPTIMIZED HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">
          বাংলা গল্প (Bangla Story) - বাস্তব জীবনের অভিজ্ঞতা
        </h1>

        <p className="text-gray-600 max-w-xl">
          বাস্তব অভিজ্ঞতা, জীবন, অনুভূতি এবং ব্যক্তিগত উপলব্ধির উপর ভিত্তি করে লেখা বাংলা গল্প পড়ুন।
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6">
        Latest Bangla Stories
      </h2>

      {sortedStories.length === 0 ? (
        <p className="text-gray-500">
          No stories published yet.
        </p>
      ) : (
        <StoriesInfinite stories={sortedStories} />
      )}

      {/* ✅ SEO CONTENT */}
      <StorySEOContent />

    </main>
  );
}