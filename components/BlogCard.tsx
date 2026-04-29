import Link from "next/link";

type BlogCardProps = {
  title: string;
  excerpt: string;
  image?: string;
  url: string;
};

export default function BlogCard({
  title,
  excerpt,
  image,
  url,
}: BlogCardProps) {

  return (
    <Link href={url} className="block group h-full">

      <article className="blog-card">

        {/* Image */}
        {image && (
          <div className="blog-card-img-wrap">
            <img
              src={image}
              alt={title}
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div className="blog-card-body">

          <h2 className="text-[15px] font-semibold leading-snug mb-2 line-clamp-2 text-gray-900 group-hover:text-[var(--accent)] transition-colors">
            {title}
          </h2>

          <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-3 flex-grow">
            {excerpt}
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--accent)]">
            Read →
          </span>

        </div>

      </article>

    </Link>
  );
}
