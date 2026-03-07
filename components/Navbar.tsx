import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
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
        <nav className="flex items-center gap-3 text-sm">

          <Link
            href="/"
            className="px-4 py-2 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 transition"
          >
            Home
          </Link>

        </nav>

      </div>

    </header>
  );
}