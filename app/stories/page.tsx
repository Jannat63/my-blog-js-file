export const dynamic = "force-dynamic";

import BlogCard from "@/components/BlogCard";

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

  return (
    <main className="max-w-[1100px] mx-auto px-6 pt-24 pb-24">

      {/* Page Title */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">
          ✍️ Stories
        </h1>

        <p className="text-gray-600 max-w-xl">
          Personal stories, reflections, and experiences written by Ahsan Jannat.
        </p>
      </div>

      {/* Stories Grid */}
      {sortedStories.length === 0 ? (
        <p className="text-gray-500">
          No stories published yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {sortedStories.map((story: any) => (
            <BlogCard
              key={story.slug}
              title={story.title}
              excerpt={story.excerpt}
              image={story.image}
              slug={`stories/${story.slug}`}
            />
          ))}

        </div>
      )}

    </main>
  );
}