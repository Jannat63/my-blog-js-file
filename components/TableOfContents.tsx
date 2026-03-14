"use client";

import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
  level: string;
};

export default function TableOfContents({ content }: { content: string }) {

  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const elements = Array.from(
      doc.querySelectorAll("h2, h3")
    );

    const list = elements.map((el) => {

      const text = el.textContent || "";

      const id = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");

      el.id = id;

      return {
        id,
        text,
        level: el.tagName,
      };

    });

    setHeadings(list);

  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-gray-50 border rounded-xl p-6 my-8">

      <h3 className="font-semibold mb-4">
        এই গল্পে যা আছে
      </h3>

      <ul className="space-y-2 text-sm">

        {headings.map((h, i) => (

          <li
            key={i}
            className={h.level === "H3" ? "ml-4" : ""}
          >

            <a
              href={`#${h.id}`}
              className="text-blue-600 hover:underline"
            >
              {h.text}
            </a>

          </li>

        ))}

      </ul>

    </div>
  );
}