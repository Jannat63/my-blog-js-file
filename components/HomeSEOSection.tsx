"use client";

import { useState } from "react";
import Script from "next/script";

export default function HomeSEOSection({ posts }: any) {

  const [open, setOpen] = useState(false);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What topics does this blog cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This blog covers technology trends, artificial intelligence, internet culture, digital platforms, and global geopolitical developments shaping the modern digital economy."
        }
      },
      {
        "@type": "Question",
        name: "Why are technology and geopolitics discussed together?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Technology and geopolitics are closely connected because global conflicts, economic policies, and international regulations influence digital infrastructure, cybersecurity, and technological innovation."
        }
      },
      {
        "@type": "Question",
        name: "Who writes the articles on this blog?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Articles are written by Ahsan Jannat, a developer and technology writer who analyzes emerging technologies, internet culture, and global digital trends."
        }
      },
      {
        "@type": "Question",
        name: "How often is new content published?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "New articles are published regularly covering developments in artificial intelligence, technology innovation, and global digital transformation."
        }
      }
    ]
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">

      {/* FAQ Schema */}
      <Script
        id="homepage-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Expand Button */}
      <div className="text-center">

        <button
          onClick={() => setOpen(!open)}
          className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border rounded-full hover:bg-black hover:text-white transition"
        >
          {open ? "Hide Blog Overview" : "Read More About This Blog"}

          <span
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            ↓
          </span>

        </button>

      </div>

      {/* Expandable Content */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          open ? "max-h-[4000px] opacity-100 mt-12" : "max-h-0 opacity-0"
        }`}
      >

        <div className="space-y-10 text-gray-700 leading-relaxed">

          {/* About */}
          <div>

            <h2 className="text-2xl font-semibold mb-4">
              About This Blog
            </h2>

            <p>
              Technology is evolving at an unprecedented pace. Artificial
              intelligence, digital platforms, geopolitical conflicts, and
              global economic shifts are reshaping how people communicate,
              work, and understand the world.
            </p>

            <p className="mt-4">
              Ahsan's Blog explores technology trends, artificial intelligence
              developments, internet culture, and global events shaping the
              digital world and modern economies through research-driven
              analysis and simplified explanations.
            </p>

          </div>

          {/* Explore Topic */}
          <h2 className="text-2xl font-semibold mb-4">
              Explore Topic
            </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <a
    href="/articles"
    className="p-4 border rounded-lg hover:shadow-md transition"
  >
    <h3 className="font-semibold">AI & Technology</h3>
    <p className="text-sm text-gray-600 mt-1">
      Artificial intelligence, machine learning, automation, and emerging
      technologies shaping the future of digital innovation.
    </p>
  </a>

  <a
    href="/articles"
    className="p-4 border rounded-lg hover:shadow-md transition"
  >
    <h3 className="font-semibold">Internet Culture</h3>
    <p className="text-sm text-gray-600 mt-1">
      Social media trends, digital communities, viral internet movements,
      and the evolving creator economy.
    </p>
  </a>

  <a
    href="/articles"
    className="p-4 border rounded-lg hover:shadow-md transition"
  >
    <h3 className="font-semibold">Global Politics</h3>
    <p className="text-sm text-gray-600 mt-1">
      Geopolitical developments influencing technology, global markets,
      and international relations.
    </p>
  </a>

  <a
    href="/articles"
    className="p-4 border rounded-lg hover:shadow-md transition"
  >
    <h3 className="font-semibold">Digital Economy</h3>
    <p className="text-sm text-gray-600 mt-1">
      Economic shifts driven by AI innovation, technology growth, and
      global digital transformation.
    </p>
  </a>

</div>

          {/* Author */}
          <div>

            <h2 className="text-2xl font-semibold mb-4">
              About the Author
            </h2>

            <p>
              Ahsan Jannat is a developer and independent writer studying
              artificial intelligence, internet culture, and global digital
              transformations. His work focuses on explaining complex
              technological and geopolitical developments in a clear and
              accessible way.
            </p>

          </div>

          {/* FAQ */}
          <div>

            <h2 className="text-2xl font-semibold mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">

              <div>
                <h4 className="font-semibold">
                  What topics does this blog cover?
                </h4>
                <p>
                  The blog covers artificial intelligence, technology
                  trends, internet culture, digital platforms, and global
                  geopolitical developments shaping the modern digital
                  economy.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">
                  Why are technology and geopolitics connected?
                </h4>
                <p>
                  Global political events often influence digital
                  infrastructure, cybersecurity policies, technology
                  regulation, and global innovation ecosystems.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">
                  Who writes the articles on this blog?
                </h4>
                <p>
                  All articles are written by Ahsan Jannat, focusing on
                  technology trends and global digital developments.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}