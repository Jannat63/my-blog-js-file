import { FaLinkedin, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t mt-16">

      <div className="max-w-[1100px] mx-auto px-6 py-8 flex justify-between items-center">

        <div>
          <p className="font-semibold">Ahsan Jannat</p>
          <p className="text-sm text-gray-500">
            Developer & Writer exploring modern web experiences.
          </p>
        </div>

        <div className="flex gap-5 text-lg">

          <a
            href="https://www.linkedin.com/in/ahsan-jannat/"
            target="_blank"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://ahsan-jannat.netlify.app/"
            target="_blank"
          >
            <FaGlobe />
          </a>

        </div>

      </div>

    </footer>
  );
}