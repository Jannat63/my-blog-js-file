import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          MyBlog
        </Link>

        <div className="space-x-6 text-gray-600 text-sm font-medium">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>
          <Link href="/admin" className="hover:text-black transition">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}