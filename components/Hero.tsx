import Link from "next/link";
import { calculateReadingTime } from "@/lib/readingTime";

type HeroProps = {
  posts?: any[];
};

export default function Hero({ posts = [] }: HeroProps) {

  const featured = posts[0] ?? null;
  const sidebar  = posts.slice(1, 4);

  return (
    <section className="hero-section">

      <div className="max-w-[1100px] mx-auto">

        <div className="grid lg:grid-cols-[1fr_300px] min-h-[82vh]">

          {/* ─── LEFT: Featured Post ─── */}
          <div className="relative flex flex-col justify-end overflow-hidden">

            {/* Background image */}
            {featured?.image && (
              <img
                src={featured.image}
                alt={featured.title}
                className="hero-featured-image"
                loading="eager"
              />
            )}

            {/* Gradient overlay */}
            <div className="hero-overlay" />

            {/* Content */}
            <div className="relative z-10 px-8 pb-14 pt-24 md:px-12 md:pb-16 animate-slideUp">

              {/* Label */}
              <span className="label-accent mb-4 block">
                ★ Featured Analysis
              </span>

              {/* Title */}
              <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-2xl">
                {featured?.title ?? "Welcome to Ahsan's Blog"}
              </h1>

              {/* Excerpt */}
              {featured?.excerpt && (
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-xl line-clamp-3">
                  {featured.excerpt}
                </p>
              )}

              {!featured && (
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                  Thoughts on technology, artificial intelligence, internet
                  culture, and the digital world shaping our future.
                </p>
              )}

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                {featured ? (
                  <>
                    <Link href={`/blog/${featured.slug}`} className="btn-accent">
                      Read Full Analysis →
                    </Link>
                    <Link href="/articles" className="btn-ghost">
                      Explore Articles →
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/articles" className="btn-accent">
                      Explore Articles →
                    </Link>
                    <Link href="/about" className="btn-ghost">
                      About Me →
                    </Link>
                  </>
                )}
              </div>

              {/* Pagination dots */}
              <div className="flex items-center gap-2 mt-10">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={`hero-dot ${i === 0 ? "active" : ""}`} />
                ))}
              </div>

            </div>
          </div>

          {/* ─── RIGHT: Sidebar Recent Posts ─── */}
          {sidebar.length > 0 && (
            <div className="hero-sidebar hidden lg:flex flex-col justify-center">

              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-500 px-5 py-4 border-b border-white/06">
                Recent Articles
              </p>

              {sidebar.map((post: any) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="hero-sidebar-item"
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-[72px] h-[56px] object-cover rounded-lg flex-shrink-0"
                      loading="lazy"
                    />
                  )}
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-white text-xs font-medium leading-snug line-clamp-2 hover:text-[var(--accent)] transition-colors">
                      {post.title}
                    </p>
                    <p className="text-gray-500 text-[11px]">
                      {calculateReadingTime(post.content)} · {post.date}
                    </p>
                  </div>
                </a>
              ))}

              <div className="mt-auto p-5 pt-0">
                <Link
                  href="/articles"
                  className="block text-center text-xs font-semibold text-white/60 hover:text-white border border-white/10 rounded-lg py-2.5 transition mt-4"
                >
                  View All Articles →
                </Link>
              </div>

            </div>
          )}

        </div>

      </div>

    </section>
  );
}
