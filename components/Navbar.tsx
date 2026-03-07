import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="border-b bg-white">

      <div className="max-w-[1100px] mx-auto px-6 py-4 flex justify-between items-center">

        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Ahsan Blog Logo"
            width={150}
            height={40}
            priority
          />
        </Link>

        <nav className="flex items-center gap-8 text-sm text-gray-500">

          <Link href="/" className="hover:text-black transition">
            Home
          </Link>

        </nav>

      </div>

    </header>
  );
}