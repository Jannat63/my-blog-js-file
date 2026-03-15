import { calculateReadingTime } from "@/lib/readingTime";
import { getStories } from "@/lib/getStories";

import TableOfContents from "@/components/TableOfContents";
import StorySEOContent from "@/components/StorySEOContent";
import BlogCard from "@/components/BlogCard";

export const dynamic = "force-dynamic";

/* -------------------------
   OG / Social Metadata
-------------------------- */

export async function generateMetadata({ params }: { params: { slug: string } }) {

  const stories = await getStories();

  const cleanSlug = params.slug.trim().toLowerCase();

  const story = stories.find(
    (s: any) =>
      s.slug?.trim().toLowerCase() === cleanSlug &&
      s.status?.trim().toLowerCase() === "published"
  );

  if (!story) {
    return {
      title: "Story",
      description: "Story from Ahsan Jannat",
    };
  }

  const image = story.image?.startsWith("http")
    ? story.image
    : `https://ahsansblog.netlify.app${story.image}`;

  return {
    title: story.title,
    description: story.excerpt,

    openGraph: {
      title: story.title,
      description: story.excerpt,
      url: `https://ahsansblog.netlify.app/stories/${story.slug}`,
      siteName: "Ahsan Jannat Blog",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.excerpt,
      images: [image],
    },
  };
}

/* -------------------------
   PAGE COMPONENT
-------------------------- */

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function StoryPage({ params }: Props) {

  const { slug } = await params;

  const stories = await getStories();

  const cleanSlug = slug.trim().toLowerCase();

  const story = stories.find(
    (s: any) =>
      s.slug?.trim().toLowerCase() === cleanSlug &&
      s.status?.trim().toLowerCase() === "published"
  );

  if (!story) {
    return (
      <main className="max-w-[800px] mx-auto px-6 pt-24 pb-24">
        <h1 className="text-3xl font-bold">Story not found</h1>
      </main>
    );
  }

  const relatedStories = stories
    .filter(
      (s: any) =>
        s.slug?.trim().toLowerCase() !== cleanSlug &&
        s.status?.trim().toLowerCase() === "published"
    )
    .slice(0, 3);

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">

        <div className="hidden lg:block sticky top-28 h-fit pr-6">
          <TableOfContents content={story.content} />
        </div>

        <article className="prose prose-lg max-w-[720px] mx-auto">

          <h1>{story.title}</h1>

          <p className="text-gray-500 text-sm">
            {calculateReadingTime(story.content)} • {story.date}
          </p>

          {story.image && (
            <div className="my-6">
              <img
                src={story.image}
                alt={story.title}
                className="w-full max-h-[420px] object-cover rounded-2xl shadow-sm"
              />
            </div>
          )}

          <div dangerouslySetInnerHTML={{ __html: story.content }} />

          <StorySEOContent />

        </article>

      </div>

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