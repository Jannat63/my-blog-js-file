import { calculateReadingTime } from "@/lib/readingTime";
import { getStoriesFromSheet } from "@/lib/googleStories";

import TableOfContents from "@/components/TableOfContents";
import StorySEOContent from "@/components/StorySEOContent";
import BlogCard from "@/components/BlogCard";

export const dynamic = "force-dynamic";

type Props = {
  params: { slug: string };
};

export default async function StoryPage({ params }: Props) {

  const { slug } = params;

  const stories = await getStoriesFromSheet();

  /* Find story by slug */
  const story = stories.find(
    (s: any) =>
      s.slug === slug &&
      String(s.status).toLowerCase() === "published"
  );

  if (!story) {
    return (
      <main className="max-w-[800px] mx-auto px-6 pt-24 pb-24">
        <h1 className="text-3xl font-bold">Story not found</h1>
      </main>
    );
  }

  /* Related stories */
  const relatedStories = stories
    .filter(
      (s: any) =>
        s.slug !== slug &&
        String(s.status).toLowerCase() === "published"
    )
    .slice(0, 3);

  /* SEO Schema */
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.title,
    datePublished: story.date,
    author: {
      "@type": "Person",
      name: "Ahsan Jannat",
    },
    image: story.image,
    articleBody: story.content.replace(/<[^>]+>/g, ""),
  };

  return (
    <main className="max-w-[1100px] mx-auto px-6 pt-24 pb-24">

      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">

        {/* Sticky Table of Contents */}
        <div className="hidden lg:block sticky top-28 h-fit">
          <TableOfContents content={story.content} />
        </div>

        {/* Story Content */}
        <article className="prose prose-lg max-w-none">

          <h1>{story.title}</h1>

          <p className="text-gray-500 text-sm">
            {calculateReadingTime(story.content)} • {story.date}
          </p>

          {story.image && (
            <div className="my-6">
              <img
                src={story.image}
                alt={`${story.title} story image`}
                className="w-full max-h-[420px] object-cover rounded-2xl shadow-sm"
              />
            </div>
          )}

          {/* Story Body */}
          <div dangerouslySetInnerHTML={{ __html: story.content }} />

          {/* SEO Expandable Section */}
          <StorySEOContent />

        </article>

      </div>

      {/* Read More Stories */}
      {relatedStories.length > 0 && (
        <section className="mt-24">

          <h2 className="text-2xl font-semibold mb-8">
            📚 Read More Stories
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {relatedStories.map((s: any) => (
              <BlogCard
                key={s.slug}
                title={s.title}
                excerpt={s.excerpt}
                image={s.image}
                slug={s.slug}
              />
            ))}

          </div>

        </section>
      )}

    </main>
  );
}