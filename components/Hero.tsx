export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-28 pb-24">

      <div className="border-l-4 border-black pl-8">

        {/* Heading */}
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent">
          Welcome<span className="text-gray-400">.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
          A modern journal exploring <span className="font-medium text-gray-800">technology</span>, 
          internet culture, and the global trends shaping our digital future.
        </p>

        {/* subtle divider */}
        <div className="mt-10 h-px w-32 bg-gradient-to-r from-black/60 to-transparent"></div>

      </div>

    </section>
  );
}