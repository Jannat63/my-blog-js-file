import { calculateReadingTime } from "@/lib/readingTime";
import { getStories } from "@/lib/getStories";

import TableOfContents from "@/components/TableOfContents";
import StorySEOContent from "@/components/StorySEOContent";
import BlogCard from "@/components/BlogCard";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

/* ✅ SEO METADATA (VERY IMPORTANT) */
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const stories = await getStories();

  const story = stories.find(
    (s: any) =>
      s.slug?.trim().toLowerCase() === slug.trim().toLowerCase()
  );

  if (!story) return {};

  return {
    title: `${story.title} | বাংলা গল্প (Bangla Story) | Ahsan Jannat`,
    description:
      story.excerpt ||
      "বাংলা গল্প (Bangla Story) পড়ুন বাস্তব অভিজ্ঞতা, জীবন ও অনুভূতির উপর ভিত্তি করে লেখা গল্প।",
    alternates: {
      canonical: `https://ahsansblog.netlify.app/blog/${story.slug}`,
    },
    openGraph: {
      title: story.title,
      description: story.excerpt,
      url: `https://ahsansblog.netlify.app/blog/${story.slug}`,
      images: [
        {
          url: story.image,
        },
      ],
    },
  };
}

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

  /* ✅ IMPROVED SCHEMA */
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.title,
    description: story.excerpt,
    image: story.image,
    datePublished: story.date,
    author: {
      "@type": "Person",
      name: "Ahsan Jannat",
    },
    publisher: {
      "@type": "Organization",
      name: "Ahsan Blog",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ahsansblog.netlify.app/blog/${story.slug}`,
    },
    articleBody: story.content.replace(/<[^>]+>/g, ""),
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
      {
        "@type": "ListItem",
        position: 3,
        name: story.title,
      },
    ],
  };

  return (
    <main className="max-w-[1100px] mx-auto px-6 pt-24 pb-24">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">

        <div className="hidden lg:block sticky top-28 h-fit pr-6">
          <TableOfContents content={story.content} />
        </div>

        <article className="prose prose-lg max-w-[720px] mx-auto">

          {/* ✅ KEYWORD OPTIMIZED TITLE */}
          <h1>{story.title} - বাংলা গল্প (Bangla Story)</h1>

          {/* ✅ IMPROVED META INFO */}
          <p className="text-gray-500 text-sm">
            বাংলা গল্প • {calculateReadingTime(story.content)} • {story.date}
          </p>

          {/* ✅ IMAGE SEO IMPROVEMENT */}
          {story.image && (
            <div className="my-6">
              <img
                src={story.image}
                alt={`${story.title} - বাংলা গল্প`}
                loading="lazy"
                className="w-full max-h-[420px] object-cover rounded-2xl shadow-sm"
              />
            </div>
          )}

          <div dangerouslySetInnerHTML={{ __html: story.content }} />

          {/* ✅ INTERNAL LINKING BOOST */}
          <p>
            আরও বাংলা গল্প পড়তে আমাদের{" "}
            <a href="/bangla-story">বাংলা গল্প সংগ্রহ</a> দেখুন।
          </p>

          <StorySEOContent />

        </article>

      </div>

      {relatedStories.length > 0 && (
        <section className="mt-24">

          <h2 className="text-2xl font-semibold mb-8">
            Read More Stories
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {relatedStories.map((s: any) => (
              <BlogCard
                key={s.slug}
                title={s.title}
                excerpt={s.excerpt}
                image={s.image}
                slug={`stories/${s.slug}`}
              />
            ))}

          </div>

        </section>
      )}

    </main>
  );
}