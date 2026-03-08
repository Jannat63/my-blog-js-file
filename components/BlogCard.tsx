import Link from "next/link";

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
    <Link href={`/blog/${slug}`} className="block group">

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">

        {/* Image */}
        <div className="h-48 bg-gray-200 overflow-hidden">
          {image && (
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-6">

          <h2 className="text-xl font-semibold mb-2 group-hover:text-black transition">
            {title}
          </h2>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {excerpt}
          </p>

          <span className="text-black font-medium">
            Read More →
          </span>

        </div>

      </div>

    </Link>
  );
}