import { calculateReadingTime } from "@/lib/readingTime";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getStories() {

  const res = await fetch("/api/get-stories", {
    cache: "no-store",
  });

  return res.json();
}

export default async function StoryPage({ params }: Props) {

  const { slug } = await params;

  const stories = await getStories();

  const story = stories.find(
    (s: any) =>
      String(s.slug).toLowerCase() === String(slug).toLowerCase() &&
      String(s.status).toLowerCase() === "published"
  );

  if (!story) {
    return (
      <main className="max-w-[800px] mx-auto px-6 pt-24 pb-24">
        <h1 className="text-3xl font-bold">Story not found</h1>
      </main>
    );
  }

  return (
    <main className="max-w-[800px] mx-auto px-6 pt-24 pb-24">

      <article className="prose prose-lg max-w-none">

        {/* TITLE */}

        <h1>{story.title}</h1>

        {/* META */}

        <p className="text-gray-500 text-sm">
          {calculateReadingTime(story.content)} • {story.date}
        </p>

        {/* COVER IMAGE */}

        {story.image && (
          <div className="my-6">
            <img
              src={story.image}
              alt={story.title}
              className="w-full max-h-[420px] object-cover rounded-2xl shadow-sm"
            />
          </div>
        )}

        {/* STORY CONTENT */}

        <div
          dangerouslySetInnerHTML={{ __html: story.content }}
        />

      </article>

    </main>
  );
}