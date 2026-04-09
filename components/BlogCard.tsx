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
  const postUrl = `/blog/${slug}`;

return (
  <Link href={postUrl} className="block group h-full">

      <article className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">

        {/* Image */}
        {image && (
          <div className="overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">

          <h2 className="text-lg font-semibold leading-snug mb-2 line-clamp-2">
            {title}
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">
            {excerpt}
          </p>

          <span className="mt-4 text-sm font-medium text-black">
            Read →
          </span>

        </div>

      </article>

    </Link>
  );
}