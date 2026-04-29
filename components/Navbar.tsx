"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {

  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("googtrans="));

    if (cookie) {
      const value = cookie.split("=")[1];
      if (value.includes("/bn")) setLang("bn");
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeLang = (target: "en" | "bn") => {
    const langCode = target === "bn" ? "/en/bn" : "/en/en";
    document.cookie = `googtrans=${langCode}; path=/`;
    document.cookie = `googtrans=${langCode}; path=/; domain=${window.location.hostname}`;
    setLang(target);
    window.location.reload();
  };

  const closeMenu = () => setOpen(false);

  const navLinks = [
    { href: "/",          label: "Home" },
    { href: "/articles",  label: "Articles" },
    { href: "/stories",   label: "Stories" },
    { href: "/watch-tv",  label: "Watch TV" },
    { href: "/about",     label: "About" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 py-3 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link
          href="/"
          aria-label="Ahsan's Blog Home"
          className="flex flex-col hover:opacity-85 transition flex-shrink-0"
        >
          <Image
            src="/logo.png"
            alt="Ahsan Blog Logo"
            width={160}
            height={44}
            sizes="160px"
            className="h-auto"
            priority
          />
          <span className="text-[10px] text-gray-400 font-medium tracking-wide mt-0.5 pl-0.5">
            Insights · Tech · World
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm flex-1 justify-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link ${isActive(href) ? "active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-3">

          {/* Search icon (visual) */}
          <button
            aria-label="Search"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
          >
            <FaSearch size={13} />
          </button>

          {/* Language flags */}
          <div className="lang-flags">
            <button
              onClick={() => changeLang("en")}
              className={`flag-btn ${lang === "en" ? "active" : ""}`}
              aria-label="English"
            >
              🇺🇸
            </button>
            <button
              onClick={() => changeLang("bn")}
              className={`flag-btn ${lang === "bn" ? "active" : ""}`}
              aria-label="বাংলা"
            >
              🇧🇩
            </button>
          </div>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes size={16} /> : <FaBars size={16} />}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-gray-100 bg-white px-6 py-5 flex flex-col gap-1">

          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className={`mobile-link ${isActive(href) ? "text-[var(--accent)] font-semibold" : ""}`}
            >
              {label}
            </Link>
          ))}

          {/* Language buttons */}
          <div className="flex gap-2 pt-4 mt-2 border-t border-gray-100">
            <button
              onClick={() => changeLang("en")}
              className={`flag-btn flex-1 gap-2 justify-center text-sm ${lang === "en" ? "active" : ""}`}
            >
              🇺🇸 English
            </button>
            <button
              onClick={() => changeLang("bn")}
              className={`flag-btn flex-1 gap-2 justify-center text-sm ${lang === "bn" ? "active" : ""}`}
            >
              🇧🇩 বাংলা
            </button>
          </div>

        </div>
      </div>

    </header>
  );
}
