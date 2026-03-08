import Link from "next/link";
import {
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaWhatsapp,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20 bg-white">

      {/* Gradient Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <div className="max-w-[1100px] mx-auto px-6 py-12">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">

          {/* Blog */}
          <div>
            <h3 className="font-semibold mb-3">
              Ahsan's Blog
            </h3>

            <p className="text-gray-500 leading-relaxed">
              Insights about technology, internet culture,
              and global digital trends shaping the modern world.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="font-semibold mb-3">
              Pages
            </h3>

            <ul className="space-y-2 text-gray-500">

              <li>
                <Link href="/about" className="hover:text-black transition">
                  About
                </Link>
              </li>

              <li>
                <Link href="/privacy-policy" className="hover:text-black transition">
                  Privacy Policy
                </Link>
              </li>

            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">
              Social
            </h3>

            <ul className="space-y-2 text-gray-500">

              <li>
                <a
                  href="https://www.linkedin.com/in/ahsan-jannat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-black transition"
                >
                  <FaLinkedin />
                  LinkedIn
                </a>
              </li>

              <li>
                <a
                  href="https://www.facebook.com/ahsan.jnat.2024/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-black transition"
                >
                  <FaFacebook />
                  Facebook
                </a>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">
              Contact
            </h3>

            <ul className="space-y-2 text-gray-500">

              <li>
                <a
                  href="mailto:ajbmix63@gmail.com"
                  className="flex items-center gap-2 hover:text-black transition"
                >
                  <FaEnvelope />
                  Email
                </a>
              </li>

              <li>
                <a
                  href="https://wa.me/8801643644550"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-black transition"
                >
                  <FaWhatsapp />
                  WhatsApp
                </a>
              </li>

            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t py-6 flex flex-col items-center gap-3 text-xs text-gray-400">

        <a
          href="#top"
          className="flex items-center gap-2 text-gray-500 hover:text-black transition"
        >
          <FaArrowUp />
          Back to top
        </a>

        <p>
          © {new Date().getFullYear()} Ahsan's Blog. All rights reserved.
        </p>

      </div>

    </footer>
  );
}