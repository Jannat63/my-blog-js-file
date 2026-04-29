import Link from "next/link";
import { calculateReadingTime } from "@/lib/readingTime";

const CATEGORY_LABELS: Record<number, string> = {
  0: "Analysis",
  1: "World",
  2: "Tech & AI",
  3: "Opinion",
};

export default function TrendingPosts({ posts }: any) {

  const trending = posts.slice(1, 5);

  if (!trending.length) return null;

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">

      {/* Header */}
      <div className="section-header">
        <h2 className="section-title">
          <span className="section-title-bar" />
          🔥 Trending Posts
        </h2>
        <Link href="/articles" className="view-all-link">
          View All →
        </Link>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        {trending.map((post: any, index: number) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="trending-card"
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[4/3]">
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-3xl">📰</span>
                </div>
              )}

              {/* Number badge */}
              <span className="trending-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Category label */}
              <span className="trending-cat-label">
                {CATEGORY_LABELS[index] ?? "Article"}
              </span>
            </div>

            {/* Body */}
            <div className="trending-card-body">
              <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-[11px] text-gray-400">
                {calculateReadingTime(post.content)}
                <span className="mx-1.5">·</span>
                {post.date}
              </p>
            </div>

          </a>
        ))}

      </div>

    </section>
  );
}
