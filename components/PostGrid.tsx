import BlogCard from "@/components/BlogCard";

export default function PostGrid({ posts }: any) {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">

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