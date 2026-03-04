export const dynamic = "force-dynamic";

import { getSheetData } from "@/lib/googleSheets";
import Hero from "@/components/Hero";
import FeaturedPosts from "@/components/FeaturedPosts";
import PostGrid from "@/components/PostGrid";

export default async function Home() {

  const posts = await getSheetData();

  return (
    <main>

      <Hero />

      <FeaturedPosts posts={posts} />

      <PostGrid posts={posts.slice(4)} />

    </main>
  );
}