"use client";

import { useState } from "react";
import BlogCard from "@/components/BlogCard";

export default function StoriesInfinite({ stories }: any) {

  const POSTS_PER_LOAD = 6;

  const [visible, setVisible] = useState(POSTS_PER_LOAD);

  const loadMore = () => {
    setVisible((prev) => prev + POSTS_PER_LOAD);
  };

  const visibleStories = stories.slice(0, visible);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {visibleStories.map((story: any) => (
          <BlogCard
            key={story.slug}
            title={story.title}
            excerpt={story.excerpt}
            image={story.image}
            slug={`stories/${story.slug}`}
          />
        ))}

      </div>

      {visible < stories.length && (
        <div className="text-center mt-10">
          <button
            onClick={loadMore}
            className="px-6 py-3 rounded-xl border hover:bg-gray-100 transition"
          >
            Load More Stories
          </button>
        </div>
      )}
    </>
  );
}