export const dynamic = "force-dynamic";

import BlogCard from "@/components/BlogCard";
import { getSheetData } from "@/lib/googleSheets";

export default async function Home() {
  const posts = await getSheetData();

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-6 py-16">
      
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Latest Articles</h1>
        <p className="text-gray-600">
          Explore our most recent blog posts.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <BlogCard
  key={post.slug}
  title={post.title}
  excerpt={post.excerpt}
  slug={post.slug}
  image={post.image}
/>
        ))}
      </section>

    </main>
  );
}