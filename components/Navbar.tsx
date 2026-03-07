"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {

  const [lang, setLang] = useState("en");

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("googtrans="));

    if (cookie) {
      const value = cookie.split("=")[1];
      if (value.includes("/bn")) setLang("bn");
    }
  }, []);

  const changeLang = (target: "en" | "bn") => {

    const langCode = target === "bn" ? "/en/bn" : "/en/en";

    document.cookie = `googtrans=${langCode}; path=/`;
    document.cookie = `googtrans=${langCode}; path=/; domain=${window.location.hostname}`;

    setLang(target);

    window.location.reload();
  };

  return (
    <header className="border-b bg-white sticky top-0 z-40">

      <div className="max-w-[1100px] mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition"
        >
          <Image
            src="/logo.png"
            alt="Ahsan Blog Logo"
            width={180}
            height={50}
            className="h-auto"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4 text-sm">

          <Link
            href="/"
            className="px-4 py-2 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 transition"
          >
            Home
          </Link>

          {/* Language Flags */}
          <div className="flex items-center gap-2">

            <button
              onClick={() => changeLang("en")}
              className={`flag-btn ${lang === "en" ? "active" : ""}`}
              title="English"
            >
              🇺🇸
            </button>

            <button
              onClick={() => changeLang("bn")}
              className={`flag-btn ${lang === "bn" ? "active" : ""}`}
              title="বাংলা"
            >
              🇧🇩
            </button>

          </div>

        </nav>

      </div>

    </header>
  );
}