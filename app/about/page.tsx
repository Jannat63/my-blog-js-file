import Image from "next/image";
import { FaLinkedin, FaFacebook, FaEnvelope, FaWhatsapp, FaGlobe } from "react-icons/fa";

export const metadata = {
  title: "About | Ahsan's Blog",
  description:
    "Learn about Ahsan Jannat, web developer and writer behind Ahsan's Blog covering technology, AI, and global trends.",
};

export default function AboutPage() {
  return (
    <main className="max-w-[900px] mx-auto px-6 py-16">

      {/* Hero */}
      <section className="flex flex-col items-center text-center">

        <Image
          src="/ahsan-jannat-author.png"
          alt="Ahsan Jannat"
          width={160}
          height={160}
          className="rounded-full mb-6 shadow-md"
        />

        <h1 className="text-3xl font-bold">
          Ahsan Jannat
        </h1>

        <p className="text-gray-500 mt-2">
          Web Developer • Tech Writer • Digital Enthusiast
        </p>

        <p className="text-gray-700 mt-6 max-w-[600px] leading-relaxed">
          I’m a web developer passionate about modern web technologies,
          artificial intelligence, and global digital trends. Through
          Ahsan's Blog, I explore complex topics and break them down into
          clear and simple insights for readers interested in technology,
          internet culture, and world events.
        </p>

      </section>


      {/* About Blog */}
      <section className="mt-16">

        <h2 className="text-2xl font-semibold mb-4">
          About This Blog
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Ahsan's Blog is a platform where technology, global trends,
          and digital culture intersect. The blog focuses on topics
          such as artificial intelligence, modern web development,
          internet innovation, and major world events shaping the
          future.
        </p>

      </section>


      {/* Expertise */}
      <section className="mt-16">

        <h2 className="text-2xl font-semibold mb-4">
          Author Expertise
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          My work focuses on building modern web experiences and
          exploring emerging technologies. You can explore my projects
          and development work in my portfolio.
        </p>

        <a
          href="https://ahsan-jannat.netlify.app/"
          target="_blank"
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <FaGlobe />
          View My Portfolio
        </a>

      </section>


      {/* Contact */}
      <section className="mt-16">

        <h2 className="text-2xl font-semibold mb-4">
          Contact
        </h2>

        <div className="flex flex-col gap-3 text-gray-700">

          <a
            href="mailto:ajbmix63@gmail.com"
            className="flex items-center gap-2 hover:text-black"
          >
            <FaEnvelope />
            ajbmix63@gmail.com
          </a>

          <a
            href="https://wa.me/8801643644550"
            target="_blank"
            className="flex items-center gap-2 hover:text-black"
          >
            <FaWhatsapp />
            +8801643644550
          </a>

        </div>

      </section>


      {/* Social */}
      <section className="mt-16">

        <h2 className="text-2xl font-semibold mb-4">
          Social Profiles
        </h2>

        <div className="flex gap-6 text-xl text-gray-600">

          <a
            href="https://www.linkedin.com/in/ahsan-jannat/"
            target="_blank"
            className="hover:text-blue-600"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.facebook.com/ahsan.jnat.2024/"
            target="_blank"
            className="hover:text-blue-500"
          >
            <FaFacebook />
          </a>

        </div>

      </section>

    </main>
  );
}