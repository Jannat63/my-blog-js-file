import Link from "next/link";
import { calculateReadingTime } from "@/lib/readingTime";

export default function PostGrid({ posts }: any) {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">

        {posts.map((post: any) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">

            <div className="space-y-4">

              {post.image && (
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={post.image}
                    className="w-full h-52 object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>
              )}

              <h3 className="text-lg font-semibold group-hover:text-black transition">
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