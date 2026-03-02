export const dynamic = "force-dynamic";

import { getPostBySlug } from "@/lib/googleSheets";
import { notFound } from "next/navigation";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) return notFound();

  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      
      {/* Featured Image */}
      {post.image && (
        <div className="mb-8 rounded-xl overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {/* Date */}
      <p className="text-gray-500 mb-8">{post.date}</p>

      {/* Content */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <p>{post.content}</p>
      </div>
    </main>
  );
}