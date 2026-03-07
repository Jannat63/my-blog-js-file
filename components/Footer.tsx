import { FaLinkedin, FaGlobe, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-16">

      <div className="max-w-[1100px] mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="text-center md:text-left">
          <p className="font-semibold text-lg">
            Ahsan's Blog
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Writer exploring modern web experiences.
          </p>
        </div>

        <div className="flex gap-6 text-lg text-gray-600">

          <a
            href="https://www.linkedin.com/in/ahsan-jannat/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://ahsan-jannat.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            <FaGlobe />
          </a>

        </div>

      </div>

      <div className="flex flex-col items-center gap-3 text-xs text-gray-400 pb-6">

        <a
          href="#top"
          className="flex items-center gap-2 text-gray-500 hover:text-black transition"
        >
          <FaArrowUp className="text-sm" />
          Back to top
        </a>

        <p>
          © {new Date().getFullYear()} Ahsan's Blog. All rights reserved.
        </p>

      </div>

    </footer>
  );
}