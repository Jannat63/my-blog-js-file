export const dynamic = "force-dynamic";

import Script from "next/script";
import { getSheetData } from "@/lib/googleSheets";
import { getStories } from "@/lib/getStories";

import FeaturedPosts from "@/components/FeaturedPosts";
import PostGrid from "@/components/PostGrid";
import Hero from "@/components/Hero";
import TrendingPosts from "@/components/TrendingPosts";
import HomeSEOSection from "@/components/HomeSEOSection";
import BlogCard from "@/components/BlogCard";

export const metadata = {
  title: "Ahsan's Blog | Technology, AI & Global Trends",
  description:
    "A modern journal exploring technology, artificial intelligence, internet culture, and global trends shaping our digital future.",
};

/* ─── Category data (static navigation, not CMS) ─── */
const CATEGORIES = [
  { icon: "🔍", label: "Analysis",  desc: "Deep insights & geopolitics", href: "/articles", color: "#fff0f0", iconBg: "#e84545" },
  { icon: "📖", label: "Stories",   desc: "Real stories that inspire",   href: "/stories",  color: "#f0f4ff", iconBg: "#4f6ef7" },
  { icon: "🤖", label: "Tech & AI", desc: "Tech, AI & innovation",       href: "/articles", color: "#f3f0ff", iconBg: "#7c3aed" },
  { icon: "✏️", label: "Opinion",   desc: "Views, thoughts & more",      href: "/articles", color: "#f0fff4", iconBg: "#16a34a" },
  { icon: "📺", label: "Watch TV",  desc: "Videos & documentaries",      href: "/watch-tv", color: "#fffbf0", iconBg: "#d97706" },
  { icon: "🌐", label: "World",     desc: "Global affairs & updates",    href: "/articles", color: "#f0f9ff", iconBg: "#0ea5e9" },
];

export default async function Home() {

  /* ── Data fetching (unchanged) ── */
  const posts   = await getSheetData();
  const stories = await getStories();

  const publishedPosts = posts.filter((post: any) => post.status === "published");

  const sortedPosts = [...publishedPosts].sort(
    (a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featured = sortedPosts.slice(0, 4);

  const publishedStories = stories.filter(
    (story: any) => story.status === "published"
  );

  const sortedStories = [...publishedStories].sort(
    (a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main>

      {/* ── Structured Data Scripts (unchanged) ── */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Ahsan's Blog",
            url: "https://ahsansblog.netlify.app",
            logo: "https://ahsansblog.netlify.app/logo.png",
            founder: {
              "@type": "Person",
              name: "Ahsan Jannat"
            }
          })
        }}
      />

      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Ahsan's Blog",
            url: "https://ahsansblog.netlify.app",
            author: {
              "@type": "Person",
              name: "Ahsan Jannat",
            },
          }),
        }}
      />

      <Script
        id="post-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: sortedPosts.slice(0, 10).map((post: any, index: number) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://ahsansblog.netlify.app/post/${post.slug}`,
            })),
          }),
        }}
      />

      <Script
        id="homepage-blogposting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": sortedPosts.slice(0, 8).map((post: any) => ({
              "@type": "BlogPosting",
              headline: post.title,
              image: post.image,
              datePublished: post.date,
              author: {
                "@type": "Person",
                name: "Ahsan Jannat",
              },
              publisher: {
                "@type": "Organization",
                name: "Ahsan's Blog",
              },
              url: `https://ahsansblog.netlify.app/post/${post.slug}`,
            })),
          }),
        }}
      />

      <Script
        id="homepage-news-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": sortedPosts.slice(0, 5).map((post: any) => ({
              "@type": "NewsArticle",
              headline: post.title,
              image: post.image,
              datePublished: post.date,
              author: {
                "@type": "Person",
                name: "Ahsan Jannat",
              },
              publisher: {
                "@type": "Organization",
                name: "Ahsan's Blog",
              },
              mainEntityOfPage: `https://ahsansblog.netlify.app/post/${post.slug}`,
            })),
          }),
        }}
      />

      {/* ── 1. Dark Hero ── */}
      <Hero posts={sortedPosts.slice(0, 4)} />

      {/* ── 2. Trending Posts ── */}
      <TrendingPosts posts={sortedPosts} />

      {/* ── 3. Browse by Category ── */}
      <section className="max-w-[1100px] mx-auto px-6 pb-20">

        <div className="section-header mb-8">
          <h2 className="section-title">
            <span className="section-title-bar" />
            Browse by Category
          </h2>
        </div>

        <div className="category-grid">
          {CATEGORIES.map(({ icon, label, desc, href, color, iconBg }) => (
            <a key={label} href={href} className="category-card" style={{ backgroundColor: color }}>
              <span
                className="category-icon"
                style={{ backgroundColor: iconBg }}
              >
                {icon}
              </span>
              <span className="category-name">{label}</span>
              <span className="category-desc">{desc}</span>
            </a>
          ))}
        </div>

      </section>

      {/* ── 4. Featured Story ── */}
      {sortedStories.length > 0 && (
        <section className="max-w-[1100px] mx-auto px-6 mb-20">

          <div className="section-header mb-8">
            <h2 className="section-title">
              <span className="section-title-bar" />
              ⭐ Featured Story
            </h2>
          </div>

          <div className="story-banner bg-white border border-gray-100 shadow-sm overflow-hidden rounded-2xl">
            <a href={`/stories/${sortedStories[0].slug}`}>

              {sortedStories[0].image && (
                <img
                  src={sortedStories[0].image}
                  alt={sortedStories[0].title}
                  className="w-full h-[340px] object-cover"
                />
              )}

              <div className="p-8">
                <span className="label-accent mb-3 block">Featured Story</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">
                  {sortedStories[0].title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {sortedStories[0].excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-[var(--accent)]">
                  Read Story →
                </span>
              </div>

            </a>
          </div>

        </section>
      )}

      {/* ── 5. Latest Articles (big-left + list-right) ── */}
      <FeaturedPosts posts={featured} />

      {/* ── 6. More Articles grid ── */}
      <PostGrid posts={sortedPosts.slice(8, 14)} />

      {/* ── 7. Latest Stories ── */}
      <section className="max-w-[1100px] mx-auto px-6 mb-20">

        <div className="section-header mb-8">
          <h2 className="section-title">
            <span className="section-title-bar" />
            ✨ Latest Stories
          </h2>
          <a href="/stories" className="view-all-link">View All →</a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStories.slice(1, 4).map((story: any) => (
            <BlogCard
              key={story.slug}
              title={story.title}
              excerpt={story.excerpt}
              image={story.image}
              url={`/stories/${story.slug}`}
            />
          ))}
        </div>

      </section>

      {/* ── 8. Newsletter CTA ── */}
      <section className="max-w-[1100px] mx-auto px-6 mb-20">
        <div className="newsletter-section">

          <div className="flex items-center gap-5">
            <span className="newsletter-icon">✉️</span>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Stay Updated</h3>
              <p className="text-gray-500 text-sm">
                Get the latest stories and analysis straight to your inbox.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap flex-1 justify-end">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button className="btn-accent flex-shrink-0">
              Subscribe
            </button>
          </div>

          <p className="w-full text-[11px] text-gray-400 -mt-2">
            No spam. Unsubscribe anytime.
          </p>

        </div>
      </section>

      {/* ── 9. SEO Section (unchanged) ── */}
      <HomeSEOSection posts={sortedPosts} />

    </main>
  );
}
