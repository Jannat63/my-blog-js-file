export const dynamic = "force-dynamic";

import { getSheetData } from "@/lib/googleSheets";
import PostGrid from "@/components/PostGrid";

export const metadata = {
  title: "All Articles | Ahsan's Blog",
  description:
    "Browse all articles from Ahsan's Blog covering technology, AI, geopolitics and global trends.",
};

export default async function ArticlesPage() {

  const posts = await getSheetData();

  const sortedPosts = posts.sort(
    (a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main>

      {/* PAGE HEADER */}
      <section className="max-w-[1100px] mx-auto px-6 pt-24 pb-14">

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          All Articles
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl">
          Explore all blog posts covering technology, artificial intelligence,
          geopolitics, and the digital world.
        </p>

        <div className="mt-8 h-px w-24 bg-gradient-to-r from-black/70 to-transparent"></div>

      </section>

      {/* POSTS GRID */}
      <PostGrid posts={sortedPosts} />

    </main>
  );
}