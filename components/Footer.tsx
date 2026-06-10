import Link from "next/link";
import {
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaWhatsapp,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-dark mt-20">

      {/* Top divider accent */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40" />

      <div className="max-w-[1100px] mx-auto px-6 pt-14 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Ahsan's Blog"
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-[220px]">
              Exploring technology, artificial intelligence, internet culture,
              and the digital world shaping our future.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/ahsan.jnat.2024/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Facebook"
              >
                <FaFacebook size={14} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Twitter"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="YouTube"
              >
                <FaYoutube size={14} />
              </a>
              <a
                href="https://www.linkedin.com/in/ahsan-jannat/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="footer-col-title">Quick Links</p>
            <ul className="space-y-3">
              {[
                { href: "/",          label: "Home" },
                { href: "/articles",  label: "Articles" },
                { href: "/stories",   label: "Stories" },
                { href: "/watch-tv",  label: "Watch TV" },
                { href: "/about",     label: "About Me" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <p className="footer-col-title">Categories</p>
            <ul className="space-y-3">
              {[
                "Analysis",
                "Stories",
                "Tech & AI",
                "Opinion",
                "World",
              ].map((cat) => (
                <li key={cat}>
                  <Link href="/articles">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + Contact */}
          <div>
            <p className="footer-col-title">Resources</p>
            <ul className="space-y-3 mb-8">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Terms of Use</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Disclaimer</Link>
              </li>
              <li>
                <Link href="/about">Contact</Link>
              </li>
            </ul>

            <p className="footer-col-title">Contact</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:ajbmix63@gmail.com"
                  className="flex items-center gap-2"
                >
                  <FaEnvelope size={12} />
                  ajbmix63@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/8801643644550"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FaWhatsapp size={12} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/06">
        <div className="max-w-[1100px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-600">

          <p>© {new Date().getFullYear()} Ahsan's Blog. All rights reserved.</p>

          <p className="flex items-center gap-1.5">
            Built with
            <span className="text-[var(--accent)]">♥</span>
            for readers like you
          </p>

        </div>
      </div>

    </footer>
  );
}
