export const dynamic = "force-dynamic";

import BlogCard from "@/components/BlogCard";
import StoriesInfinite from "@/components/StoriesInfinite";
import StorySEOContent from "@/components/StorySEOContent";

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

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Ahsan Jannat Stories",
    description:
      "Personal stories, reflections, and experiences written by Ahsan Jannat.",
    author: {
      "@type": "Person",
      name: "Ahsan Jannat",
    },
  };

  return (
    <main className="max-w-[1100px] mx-auto px-6 pt-24 pb-24">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* Page Title */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">
          ✍️ Personal Stories & Experiences
        </h1>

        <p className="text-gray-600 max-w-xl">
          Personal stories, reflections, and experiences written by Ahsan Jannat.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6">
        Latest Stories
      </h2>

      {sortedStories.length === 0 ? (
        <p className="text-gray-500">
          No stories published yet.
        </p>
      ) : (
        <StoriesInfinite stories={sortedStories} />
      )}

      {/* SEO Content Section */}
      <StorySEOContent />

    </main>
  );
}