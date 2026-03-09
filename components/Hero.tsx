export default function Hero() {
  return (
    <section className="max-w-[1100px] mx-auto px-6 pt-28 pb-24">

      <div className="space-y-8 max-w-3xl">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
          Ahsan's Blog
        </h1>

        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Thoughts on technology, artificial intelligence, internet culture,
          and the digital world shaping our future.
        </p>

        <div className="flex items-center gap-4 pt-2">

          <a
            href="#latest"
            className="bg-black text-white px-6 py-3 rounded-lg text-sm hover:bg-gray-800 transition"
          >
            Explore Articles
          </a>

          <a
            href="/about"
            className="text-sm font-medium text-gray-700 hover:underline"
          >
            About Me
          </a>

        </div>

        <div className="h-px w-32 bg-gradient-to-r from-black/60 to-transparent"></div>

      </div>

    </section>
  );
}