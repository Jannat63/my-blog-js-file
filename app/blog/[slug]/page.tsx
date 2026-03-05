export const dynamic = "force-dynamic";

import { getPostBySlug, getSheetData } from "@/lib/googleSheets";
import { notFound } from "next/navigation";
import ReadingProgress from "@/components/ReadingProgress";
import { calculateReadingTime } from "@/lib/readingTime";

/* =========================
   SEO METADATA
========================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

/* =========================
   BLOG PAGE
========================= */
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) return notFound();

  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const allPosts = await getSheetData();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      {/* Reading progress bar */}
      <ReadingProgress />

      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <article className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm">

          {/* Featured Image */}
          {post.image && (
            <div className="mb-10 rounded-xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[420px] object-cover"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="text-gray-500 text-sm mb-12">
            {calculateReadingTime(post.content)} • {post.date}
          </div>

          {/* Content */}
          <div
            className="
              prose 
              prose-lg 
              max-w-none 
              prose-headings:font-bold 
              prose-headings:text-gray-900
              prose-p:text-gray-700
              prose-p:leading-relaxed
              prose-a:text-blue-600
              prose-a:no-underline
              prose-strong:text-black
              prose-img:rounded-xl
              prose-blockquote:border-l-4
              prose-blockquote:border-gray-300
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <>
              <hr className="my-16" />

              <section>
                <h3 className="text-2xl font-semibold mb-6">
                  Related Posts
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <a
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
                    >
                      <h4 className="font-semibold mb-2">
                        {related.title}
                      </h4>

                      <p className="text-sm text-gray-600">
                        {related.excerpt}
                      </p>
                    </a>
                  ))}
                </div>
              </section>
            </>
          )}

        </article>
      </main>
    </>
  );
}