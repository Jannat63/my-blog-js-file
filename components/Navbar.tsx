"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {

  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);

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
    <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-40">

      <div className="max-w-[1100px] mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          aria-label="Ahsan's Blog Home"
          className="flex items-center hover:opacity-80 transition"
        >
          <Image
            src="/logo.png"
            alt="Ahsan Blog Logo"
            width={180}
            height={50}
            sizes="180px"
            className="h-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 text-sm">

          <Link
            href="/"
            className="px-4 py-2 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 hover:underline transition"
          >
            Home
          </Link>

          <Link
            href="/articles"
            className="px-4 py-2 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 hover:underline transition"
          >
            Articles
          </Link>

          <Link
            href="/about"
            className="px-4 py-2 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 hover:underline transition"
          >
            About
          </Link>

          <div className="flex items-center gap-2 ml-2">

            <button
              onClick={() => changeLang("en")}
              aria-label="Switch to English"
              className={`flag-btn ${lang === "en" ? "active" : ""}`}
            >
              🇺🇸
            </button>

            <button
              onClick={() => changeLang("bn")}
              aria-label="Switch to Bangla"
              className={`flag-btn ${lang === "bn" ? "active" : ""}`}
            >
              🇧🇩
            </button>

          </div>

        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t px-6 py-4 space-y-3">

          <Link href="/" className="block text-gray-700">
            Home
          </Link>

          <Link href="/articles" className="block text-gray-700">
            Articles
          </Link>

          <Link href="/about" className="block text-gray-700">
            About
          </Link>

          <Link href="/watch-tv">
          Watch TV
          </Link>

          <div className="flex gap-3 pt-2">

            <button
              onClick={() => changeLang("en")}
              className={`flag-btn ${lang === "en" ? "active" : ""}`}
            >
              🇺🇸 English
            </button>

            <button
              onClick={() => changeLang("bn")}
              className={`flag-btn ${lang === "bn" ? "active" : ""}`}
            >
              🇧🇩 বাংলা
            </button>

          </div>

        </div>
      )}

    </header>
  );
}