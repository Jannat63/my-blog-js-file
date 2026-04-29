import BlogCard from "@/components/BlogCard";
import Link from "next/link";

export default function PostGrid({ posts, showHeader = true, limit }: any) {

  if (!posts.length) return null;

  const displayedPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <section
      id="latest"
      className="max-w-[1100px] mx-auto px-6 pb-20"
    >

      {showHeader && (
        <div className="section-header mb-8">

          <h2 className="section-title">
            <span className="section-title-bar" />
            More Articles
          </h2>

          <Link
            href="/articles"
            className="view-all-link"
          >
            View All →
          </Link>

        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

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
