import Link from "next/link";
import { calculateReadingTime } from "@/lib/readingTime";

export default function FeaturedPosts({ posts }: any) {

  if (!posts.length) return null;

  /* sort posts by date so newest post becomes featured */
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const main = sortedPosts[0];
  const list = sortedPosts.slice(1, 5);

  return (
    <section className="max-w-[1100px] mx-auto px-6 pb-20">

      {/* Header */}
      <div className="section-header mb-8">
        <h2 className="section-title">
          <span className="section-title-bar" />
          📰 Latest Articles
        </h2>
        <Link href="/articles" className="view-all-link">
          View All →
        </Link>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">

        {/* ─── LEFT: Main featured article ─── */}
        <a href={`/blog/${main.slug}`} className="articles-main-card group">

          {main.image && (
            <div className="overflow-hidden aspect-[16/10]">
              <img
                src={main.image}
                alt={main.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}

          <div className="p-7">

            <span className="label-accent text-[11px] mb-3 block">
              Featured
            </span>

            <h2 className="text-2xl font-bold leading-snug text-gray-900 mb-3 group-hover:text-[var(--accent)] transition-colors">
              {main.title}
            </h2>

            <p className="text-gray-500 text-sm mb-4">
              {calculateReadingTime(main.content)}
              <span className="mx-2">·</span>
              {main.date}
            </p>

            {main.excerpt && (
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {main.excerpt}
              </p>
            )}

            <span className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-[var(--accent)]">
              Read More →
            </span>

          </div>

        </a>

        {/* ─── RIGHT: Compact article list ─── */}
        <div className="flex flex-col divide-y divide-gray-100">

          {list.map((post: any) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="articles-list-item group"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-[100px] h-[72px] object-cover rounded-xl flex-shrink-0"
                  loading="lazy"
                />
              )}

              <div className="flex flex-col justify-center gap-1 min-w-0">

                <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-gray-900 group-hover:text-[var(--accent)] transition-colors">
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

      </div>

    </section>
  );
}
