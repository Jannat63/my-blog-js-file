"use client";

import { useState } from "react";
import Script from "next/script";

export default function ArticlesSEOSection() {

  const [open, setOpen] = useState(false);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What kind of articles are published on this blog?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Articles on Ahsan's Blog focus on technology trends, artificial intelligence developments, internet culture, and global geopolitical events shaping the modern digital world."
        }
      },
      {
        "@type": "Question",
        name: "What topics are covered in these articles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Topics include artificial intelligence, global politics, internet culture, technology innovation, and digital economic transformation."
        }
      },
      {
        "@type": "Question",
        name: "Who writes the articles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All articles are written by Ahsan Jannat, a developer and independent writer analyzing global technology trends and digital transformation."
        }
      }
    ]
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">

      <Script
        id="articles-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center">

        <button
          onClick={() => setOpen(!open)}
          className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border rounded-full hover:bg-black hover:text-white transition"
        >
          {open ? "Hide Articles Overview" : "Learn More About These Articles"}

          <span
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            ↓
          </span>

        </button>

      </div>

      <div
        className={`transition-all duration-500 overflow-hidden ${
          open ? "max-h-[4000px] opacity-100 mt-12" : "max-h-0 opacity-0"
        }`}
      >

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <h2 className="text-2xl font-semibold">
            About These Articles
          </h2>

          <p>
            This page contains the complete collection of articles published on
            Ahsan's Blog. The articles explore major developments in technology,
            artificial intelligence, internet culture, and global geopolitical
            trends shaping the modern digital world.
          </p>

          <p>
            Each article aims to explain complex topics clearly while providing
            insights into how technology, global politics, and digital
            innovation influence economies and societies.
          </p>

          <h3 className="text-xl font-semibold">
            Topics Covered
          </h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>Artificial intelligence and emerging technologies</li>
            <li>Global geopolitical developments</li>
            <li>Internet culture and digital platforms</li>
            <li>Technology innovation and digital transformation</li>
          </ul>

        </div>

      </div>

    </section>
  );
}