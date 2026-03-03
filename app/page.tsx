export const dynamic = "force-dynamic";

import Link from "next/link";
import { getSheetData } from "@/lib/googleSheets";

export default async function Home() {
  const posts = await getSheetData();

  return (
    <main>

      {/* HERO */}
      <section className="py-28 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
          Writing that feels clean,
          <br />
          modern & intentional.
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Minimal thoughts. Modern perspective. Simple design.
        </p>
      </section>


      {/* POSTS GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-16">

          {posts.map((post: any) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="space-y-5">

                {post.image && (
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-semibold group-hover:text-black transition">
                    {post.title}
                  </h2>

                  <p className="text-gray-500 text-sm mt-2">
                    {post.date}
                  </p>

                  <p className="text-gray-600 mt-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

              </article>
            </Link>
          ))}

        </div>
      </section>

    </main>
  );
}