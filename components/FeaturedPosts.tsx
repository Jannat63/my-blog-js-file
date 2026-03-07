import Link from "next/link";
import { calculateReadingTime } from "@/lib/readingTime";

export default function FeaturedPosts({ posts }: any) {
  if (!posts.length) return null;

  /* sort posts by date so newest post becomes featured */
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const main = sortedPosts[0];
  const side = sortedPosts.slice(1, 4);

  return (
    <section className="max-w-[1100px] mx-auto px-6 mb-20 grid lg:grid-cols-2 gap-10">

      {/* FEATURED POST */}
      <Link href={`/blog/${main.slug}`} className="group">
        <div className="space-y-5">

          {main.image && (
            <div className="overflow-hidden rounded-2xl">
              <img
                src={main.image}
                className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          )}

          {/* FEATURED LABEL */}
<span className="inline-block text-xs font-semibold tracking-wide text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
  Latest Story
</span>

          <h2 className="text-4xl font-semibold leading-snug font-[var(--font-playfair)]">
            {main.title}
          </h2>

          <p className="text-gray-600">
            {calculateReadingTime(main.content)} • {main.date}
          </p>

          <p className="text-gray-600">
            {main.excerpt}
          </p>

        </div>
      </Link>

      {/* SIDE POSTS */}
      <div className="space-y-6">

        {side.map((post: any, index: number) => (
          <div key={post.slug}>

            {index !== 0 && (
              <div className="border-t border-gray-200 mb-6"></div>
            )}

            <Link
              href={`/blog/${post.slug}`}
              className="flex gap-4 group"
            >

              {post.image && (
                <img
                  src={post.image}
                  className="w-32 h-24 object-cover rounded-lg"
                />
              )}

              <div>
                <h3 className="font-semibold group-hover:text-black transition">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {calculateReadingTime(post.content)} • {post.date}
                </p>
              </div>

            </Link>

          </div>
        ))}

      </div>
    </section>
  );
}