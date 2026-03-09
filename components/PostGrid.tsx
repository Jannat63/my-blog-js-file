import BlogCard from "@/components/BlogCard";

export default function PostGrid({ posts }: any) {

  if (!posts.length) return null;

  return (
    <section
      id="latest"
      className="max-w-[1100px] mx-auto px-6 pb-24"
    >

      <div className="flex items-center justify-between mb-10">

        <h2 className="text-2xl font-semibold">
          Latest Articles
        </h2>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {posts.map((post: any) => (
          <BlogCard
            key={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            image={post.image}
            slug={post.slug}
          />
        ))}

      </div>

    </section>
  );
}