import BlogCard from "@/components/BlogCard";
import Link from "next/link";

export default function PostGrid({ posts, showHeader = true, limit }: any) {

  if (!posts.length) return null;

  const displayedPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <section
      id="latest"
      className="max-w-[1100px] mx-auto px-6 pb-24"
    >

      {showHeader && (
        <div className="flex items-center justify-between mb-10">

          <h2 className="text-2xl font-semibold">
            📰 Latest Articles
          </h2>

          <Link
            href="/articles"
            className="text-sm font-medium text-gray-600 hover:text-black transition"
          >
            View All →
          </Link>

        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {displayedPosts.map((post: any) => (
          <BlogCard
  key={post.slug}
  title={post.title}
  excerpt={post.excerpt}
  image={post.image}
  url={`/blog/${post.slug}`}
/>
        ))}

      </div>

    </section>
  );
}