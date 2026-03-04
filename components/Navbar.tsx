import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">

      <div className="max-w-[1100px] mx-auto px-6 py-4 flex justify-between items-center">

        <Link href="/" className="text-lg font-semibold tracking-tight">
          Ahsan<span className="text-gray-400">.</span>
        </Link>

        <nav className="flex items-center gap-8 text-sm text-gray-500">

          <Link href="/" className="hover:text-black transition">
            Home
          </Link>

          <Link href="/admin" className="hover:text-black transition">
            Admin
          </Link>

        </nav>

      </div>

    </header>
  );
}