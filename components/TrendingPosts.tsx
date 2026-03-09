import BlogCard from "@/components/BlogCard";

export default function TrendingPosts({ posts }: any) {

  const trending = posts.slice(4, 8);

  if (!trending.length) return null;

  return (
    <section className="max-w-[1100px] mx-auto px-6 mb-24">

      <h2 className="text-2xl font-semibold mb-10">
        🔥 Trending Posts
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {trending.map((post:any)=>(
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