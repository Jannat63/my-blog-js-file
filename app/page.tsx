export const dynamic = "force-dynamic";

import { getSheetData } from "@/lib/googleSheets";
import FeaturedPosts from "@/components/FeaturedPosts";
import PostGrid from "@/components/PostGrid";

export default async function Home() {
  const posts = await getSheetData();

  // SORT newest first
  const sortedPosts = posts.sort(
    (a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featured = sortedPosts.slice(0, 4);
  const rest = sortedPosts.slice(4);

  return (
    <main className="pt-24">

      {/* HERO */}
      <section className="max-w-[900px] mx-auto px-6 text-center mb-20">

        <h1 className="text-5xl font-semibold leading-tight mb-6 font-[var(--font-playfair)]">
          Welcome.
        </h1>

        <p className="text-gray-600 text-lg">
          A modern journal exploring technology, internet culture,
          and the trends shaping our digital future.
        </p>

      </section>

      {/* FEATURED */}
      <FeaturedPosts posts={featured} />

      {/* GRID */}
      <PostGrid posts={rest} />

    </main>
  );
}