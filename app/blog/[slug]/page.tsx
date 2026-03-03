export const dynamic = "force-dynamic";

import { getPostBySlug } from "@/lib/googleSheets";
import { notFound } from "next/navigation";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ MUST await params in Next 16
  const { slug } = await params;

  if (!slug) return notFound();

  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <article className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm">

        {/* Featured Image */}
        {post.image && (
          <div className="mb-10 rounded-xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="text-gray-500 text-sm mb-10">
          <span>{post.date}</span>
        </div>

        {/* Rich Content */}
        <div
          className="
            prose 
            prose-lg 
            max-w-none 
            prose-headings:font-bold 
            prose-headings:text-gray-900
            prose-p:text-gray-700
            prose-a:text-blue-600
            prose-strong:text-black
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

      </article>
    </main>
  );
}