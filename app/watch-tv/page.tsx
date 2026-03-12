import { getTVChannels } from "@/lib/googleSheets";
import WatchTV from "./WatchTV";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Watch Live TV Online | Stream Live TV Channels Free",
  description:
    "Watch live TV online and stream television channels instantly. Enjoy live news, sports, and entertainment broadcasts from anywhere on your phone, laptop, tablet, or smart TV.",

  keywords: [
    "watch live TV online",
    "live TV streaming",
    "watch TV online free",
    "live television channels",
    "live news streaming",
    "watch sports live streaming",
    "online TV channels",
    "internet TV streaming",
    "watch TV without cable",
    "live broadcast online"
  ],

  alternates: {
    canonical: "https://ahsansblog.netlify.app/watch-tv"
  },

  openGraph: {
    title: "Watch Live TV Online – Stream Live TV Channels",
    description:
      "Stream live television channels online including news, sports, and entertainment broadcasts.",
    url: "https://ahsansblog.netlify.app/watch-tv",
    siteName: "Live TV Online",
    type: "website",
    images: [
      {
        url: "https://ahsansblog.netlify.app/live-tv-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Watch Live TV Online"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Watch Live TV Online",
    description:
      "Stream live TV channels online including news, sports, and entertainment.",
    images: ["https://ahsansblog.netlify.app/live-tv-cover.jpg"]
  },

  robots: {
    index: true,
    follow: true
  }
};

export default async function Page() {

  const channels = await getTVChannels();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [

      {
        "@type": "WebPage",
        "@id": "https://ahsansblog.netlify.app/watch-tv",
        "url": "https://ahsansblog.netlify.app/watch-tv",
        "name": "Watch Live TV Online",
        "description":
          "Stream live television channels including news, sports, and entertainment broadcasts.",
        "inLanguage": "en"
      },

      {
        "@type": "BreadcrumbList",
        "@id": "https://ahsansblog.netlify.app/watch-tv#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://ahsansblog.netlify.app/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Watch Live TV",
            "item": "https://ahsansblog.netlify.app/watch-tv"
          }
        ]
      },

      {
        "@type": "Article",
        "@id": "https://ahsansblog.netlify.app/watch-tv#article",
        "headline": "Watch Live TV Online",
        "description":
          "Stream live TV channels including news, sports, and entertainment broadcasts online.",
        "author": {
          "@type": "Organization",
          "name": "Live TV Online"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Live TV Online"
        },
        "mainEntityOfPage": "https://ahsansblog.netlify.app/watch-tv"
      },

      {
        "@type": "VideoObject",
        "@id": "https://ahsansblog.netlify.app/watch-tv#video",
        "name": "Live TV Streaming",
        "description":
          "Watch live television channels online including news, sports, and entertainment.",
        "thumbnailUrl": "https://ahsansblog.netlify.app/live-tv-cover.jpg",
        "uploadDate": "2024-01-01",
        "embedUrl": "https://ahsansblog.netlify.app/watch-tv"
      },

      {
        "@type": "BroadcastEvent",
        "@id": "https://ahsansblog.netlify.app/watch-tv#broadcast",
        "name": "Live TV Streaming",
        "description": "Live broadcast of television channels online.",
        "isLiveBroadcast": true,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
        "startDate": "2024-01-01T00:00:00Z",
        "endDate": "2030-01-01T00:00:00Z",
        "location": {
          "@type": "VirtualLocation",
          "url": "https://ahsansblog.netlify.app/watch-tv"
        }
      },

      {
        "@type": "ItemList",
        "@id": "https://ahsansblog.netlify.app/watch-tv#channels",
        "name": "Live TV Channels",
        "itemListElement": channels?.map((channel: any, index: number) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": channel.name,
          "url": `https://ahsansblog.netlify.app/watch-tv#${channel.name.replace(/\s+/g, "-")}`
        }))
      },

      {
        "@type": "FAQPage",
        "@id": "https://ahsansblog.netlify.app/watch-tv#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How can I watch live TV online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can watch live TV online using streaming platforms that provide embedded video players for television channels."
            }
          },
          {
            "@type": "Question",
            "name": "Can I watch TV online for free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Many broadcasters provide free live streams that can be watched online without subscription."
            }
          },
          {
            "@type": "Question",
            "name": "Is live TV streaming legal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Live TV streaming is legal when the broadcast is provided by official or authorized sources."
            }
          },
          {
            "@type": "Question",
            "name": "What internet speed is needed for live TV streaming?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A stable internet connection is required for smooth live television streaming."
            }
          }
        ]
      }

    ]
  };

  return (
    <>

      {/* Hidden SEO Content */}

      <section className="sr-only">

        <h1>Watch Live TV Online</h1>
        <h2>Stream Live Television Channels</h2>
        <h3>Live News, Sports and Entertainment Streaming</h3>

        <p>
          Watch live TV online and stream television channels instantly.
          Access live news broadcasts, sports matches, entertainment programs,
          and international TV channels directly from your browser using
          smartphones, laptops, tablets, and smart TVs.
        </p>

      </section>

      {/* TV Player */}

      <WatchTV channels={channels} />

      {/* Structured Data */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }}
      />

    </>
  );
}