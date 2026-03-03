"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur border-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">

        <Link href="/" className="text-xl font-semibold tracking-tight">
          Ahsan<span className="text-gray-400">.</span>
        </Link>

        <nav className="flex items-center gap-8 text-sm text-gray-600">
          <Link
            href="/"
            className="hover:text-black transition"
          >
            Home
          </Link>

          <Link
            href="/admin"
            className="hover:text-black transition"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}