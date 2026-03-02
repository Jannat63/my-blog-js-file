type BlogCardProps = {
  title: string;
  excerpt: string;
  image?: string;
  slug: string;
};

export default function BlogCard({
  title,
  excerpt,
  image,
  slug,
}: BlogCardProps) {
  return (
    <div className="bg-white shadow-sm border rounded-xl overflow-hidden hover:shadow-md transition">
      
      <div className="h-48 bg-gray-200 overflow-hidden">
  {image && (
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    />
  )}
</div>

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          {title}
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          {excerpt}
        </p>

        <a href={`/blog/${slug}`} className="text-black font-medium">
          Read More →
        </a>
      </div>
    </div>
  );
}