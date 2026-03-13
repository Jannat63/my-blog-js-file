import Image from "next/image";
import Script from "next/script";
import { FaLinkedin, FaFacebook, FaEnvelope, FaWhatsapp, FaGlobe } from "react-icons/fa";

export const metadata = {
  title: "About | Ahsan's Blog",
  description:
    "Learn about Ahsan Jannat, SEO expert and technology writer behind Ahsan's Blog covering artificial intelligence, technology trends, and global digital developments.",
};

export default function AboutPage() {
  return (
    <main className="max-w-[900px] mx-auto px-6 py-16">

      {/* Author Schema */}
      <Script
        id="author-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ahsan Jannat",
            url: "https://ahsansblog.netlify.app",
            mainEntityOfPage: "https://ahsansblog.netlify.app/about",
            image: "https://ahsansblog.netlify.app/ahsan-jannat-author.png",
            jobTitle: "SEO Expert and Technology Writer",
            worksFor: {
              "@type": "Organization",
              name: "Ahsan's Blog",
              url: "https://ahsansblog.netlify.app"
            },
            sameAs: [
              "https://www.linkedin.com/in/ahsan-jannat/",
              "https://www.facebook.com/ahsan.jnat.2024/",
              "https://ahsan-jannat.netlify.app/"
            ]
          })
        }}
      />

      {/* Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Ahsan's Blog",
            url: "https://ahsansblog.netlify.app",
            founder: {
              "@type": "Person",
              name: "Ahsan Jannat"
            }
          })
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="about-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://ahsansblog.netlify.app"
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "About",
                item: "https://ahsansblog.netlify.app/about"
              }
            ]
          })
        }}
      />

      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center py-14 rounded-2xl bg-gradient-to-b from-gray-50 to-white border">

        <Image
          src="/ahsan-jannat-author.png"
          alt="Ahsan Jannat"
          width={170}
          height={170}
          priority
          className="rounded-full shadow-md border border-gray-200 mb-6 transition-transform duration-300 hover:scale-105"
        />

        <h1 className="text-3xl font-bold">
          Ahsan Jannat
        </h1>

        <p className="text-gray-500 mt-2">
          SEO Expert • Tech Writer • Digital Enthusiast
        </p>

        {/* Expertise Tags */}
        <div className="flex gap-3 mt-4 text-xs text-gray-600 justify-center flex-wrap text-center">
          <span className="bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition">
            Artificial Intelligence
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition">
            Technology
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition">
            Geopolitics
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition">
            Digital Economy
          </span>
        </div>

        <p className="text-gray-700 mt-6 max-w-[600px] leading-relaxed">
          I’m an SEO expert focused on modern web technologies,
          artificial intelligence, and global digital trends. Through
          Ahsan's Blog, I explore complex topics and break them down into
          clear and simple insights for readers interested in technology,
          internet culture, and world events.
        </p>

      </section>

      {/* Divider */}
      <div className="mt-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

      {/* About Blog */}
      <section className="mt-16">

        <h2 className="text-2xl font-semibold mb-4">
          About This Blog
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Ahsan's Blog is a technology and analysis platform covering
          artificial intelligence, internet culture, digital transformation,
          and global geopolitical trends. The blog explores how emerging
          technologies and world events interact to shape the future of the
          digital economy and modern society.
        </p>

      </section>

      {/* TWO COLUMN SECTION */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Author Expertise Card */}
        <div className="bg-gray-50 border rounded-xl p-6 hover:shadow-md transition">

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
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline mt-4"
          >
            <FaGlobe />
            View My Portfolio
          </a>

        </div>

        {/* Contact Card */}
        <div className="bg-gray-50 border rounded-xl p-6 hover:shadow-md transition">

          <h2 className="text-2xl font-semibold mb-4">
            Contact
          </h2>

          <div className="flex flex-col gap-3 text-gray-700 mb-10">

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
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-black"
            >
              <FaWhatsapp />
              +8801643644550
            </a>

          </div>

          <h2 className="text-2xl font-semibold mb-4">
            Social Profiles
          </h2>

          <div className="flex gap-6 text-xl text-gray-600">

            <a
              href="https://www.linkedin.com/in/ahsan-jannat/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://www.facebook.com/ahsan.jnat.2024/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebook />
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}