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

  const closeMenu = () => setOpen(false);

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

          <Link href="/" className="nav-link">
            Home
          </Link>

          <Link href="/articles" className="nav-link">
            Articles
          </Link>

          {/* NEW STORIES LINK */}
          <Link href="/stories" className="nav-link">
            Stories
          </Link>

          <Link href="/watch-tv" className="nav-link">
            📺 Watch TV
          </Link>

          <Link href="/about" className="nav-link">
            About
          </Link>

          <div className="flex items-center gap-2 ml-2">

            <button
              onClick={() => changeLang("en")}
              className={`flag-btn ${lang === "en" ? "active" : ""}`}
            >
              🇺🇸
            </button>

            <button
              onClick={() => changeLang("bn")}
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

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[400px] border-t" : "max-h-0"
        }`}
      >

        <div className="px-6 py-4 flex flex-col gap-4">

          <Link href="/" onClick={closeMenu} className="mobile-link">
            Home
          </Link>

          <Link href="/articles" onClick={closeMenu} className="mobile-link">
            Articles
          </Link>

          {/* NEW STORIES LINK */}
          <Link href="/stories" onClick={closeMenu} className="mobile-link">
            Stories
          </Link>

          <Link href="/watch-tv" onClick={closeMenu} className="mobile-link">
            📺 Watch TV
          </Link>

          <Link href="/about" onClick={closeMenu} className="mobile-link">
            About
          </Link>

          {/* Language buttons */}

          <div className="flex flex-col gap-2 pt-2 w-full">

            <button
              onClick={() => changeLang("en")}
              className={`flag-btn w-full text-left ${
                lang === "en" ? "active" : ""
              }`}
            >
              🇺🇸 English
            </button>

            <button
              onClick={() => changeLang("bn")}
              className={`flag-btn w-full text-left ${
                lang === "bn" ? "active" : ""
              }`}
            >
              🇧🇩 বাংলা
            </button>

          </div>

        </div>

      </div>

    </header>
  );
}