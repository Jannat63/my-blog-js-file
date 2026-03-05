import Link from "next/link";
import { calculateReadingTime } from "@/lib/readingTime";

export default function FeaturedPosts({ posts }: any) {
  if (!posts.length) return null;

  const main = posts[0];
  const side = posts.slice(1, 4);

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
      <div className="space-y-8">

        {side.map((post: any) => (
          <Link
            key={post.slug}
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
        ))}

      </div>
    </section>
  );
}