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

  const siteUrl = "https://ahsansblog.netlify.app";

  return (
    <>
      <ReadingProgress />

      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <article className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm">

          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6">
            <a href="/" className="hover:underline">Home</a>
            <span className="mx-2">/</span>
            <a href="/blog" className="hover:underline">Blog</a>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{post.title}</span>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-10 rounded-xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[260px] md:h-[420px] object-cover"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 text-gray-500 text-sm mb-12">
            <span>By Ahsan</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{calculateReadingTime(post.content)}</span>
          </div>

          {/* Content */}
          <div
            className="
              prose 
              prose-lg 
              max-w-none 
              prose-headings:font-bold 
              prose-headings:text-gray-900
              prose-headings:scroll-mt-20
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

          {/* Social Share */}
          <div className="mt-16 pt-8 border-t">
            <h3 className="font-semibold mb-4">Share this article</h3>

            <div className="flex gap-4 text-sm">

              <a
                href={`https://twitter.com/intent/tweet?url=${siteUrl}/blog/${slug}`}
                target="_blank"
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Twitter
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}/blog/${slug}`}
                target="_blank"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Facebook
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${siteUrl}/blog/${slug}`}
                target="_blank"
                className="px-4 py-2 bg-blue-700 text-white rounded-lg"
              >
                LinkedIn
              </a>

            </div>
          </div>

          {/* Author Box */}
          <div className="mt-16 bg-gray-50 p-6 rounded-xl">
            <h4 className="font-semibold mb-2">About the Author</h4>

            <p className="text-gray-600 text-sm">
              Ahsan writes about technology, global news, and digital trends.
              His articles focus on simplifying complex topics and helping
              readers understand important global developments.
            </p>
          </div>

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
                      className="bg-gray-50 p-5 rounded-xl hover:-translate-y-1 hover:shadow-md transition"
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