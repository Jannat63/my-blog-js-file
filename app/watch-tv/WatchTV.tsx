"use client";

import { useState, useEffect, useRef } from "react";

export default function WatchTV({ channels }: any) {

  if (!channels || channels.length === 0) {
    return (
      <main className="max-w-[1200px] mx-auto px-6 pt-24 pb-24">
        <h1 className="text-4xl font-bold mb-6">📺 Watch Live TV Online</h1>
        <p className="text-gray-600">No channels available.</p>
      </main>
    );
  }

  const [active, setActive] = useState(channels[0]);
  const [focusIndex, setFocusIndex] = useState(0);

  const playerRef = useRef<HTMLDivElement>(null);

  /* ---------- VIDEO ID ---------- */

  const getVideoId = (url?: string) => {

    if (!url) return "";

    if (url.includes("watch?v=")) return url.split("watch?v=")[1].split("&")[0];
    if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split("?")[0];
    if (url.includes("/live/")) return url.split("/live/")[1].split("?")[0];
    if (url.includes("/embed/")) return url.split("/embed/")[1].split("?")[0];

    return "";
  };

  /* ---------- EMBED ---------- */

  const getEmbed = (url?: string) => {

    const id = getVideoId(url);

    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0`;
  };

  /* ---------- THUMBNAIL ---------- */

  const getThumbnail = (url?: string) => {

    const id = getVideoId(url);

    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  };

  /* ---------- KEYBOARD CONTROLS ---------- */

  useEffect(() => {

    const handleKey = (e: KeyboardEvent) => {

      const total = channels.length;

      if (e.key === "ArrowRight") {
        setFocusIndex((prev) => (prev + 1) % total);
      }

      if (e.key === "ArrowLeft") {
        setFocusIndex((prev) => (prev - 1 + total) % total);
      }

      if (e.key === "ArrowDown") {
        setFocusIndex((prev) => (prev + 5) % total);
      }

      if (e.key === "ArrowUp") {
        setFocusIndex((prev) => (prev - 5 + total) % total);
      }

      if (e.key === "Enter") {
        setActive(channels[focusIndex]);
      }

      if (e.key.toLowerCase() === "f" && playerRef.current) {

        if (!document.fullscreenElement) {
          playerRef.current.requestFullscreen();
        } else {
          document.exitFullscreen();
        }

      }

    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);

  }, [channels, focusIndex]);

  return (

    <main className="max-w-[1100px] mx-auto px-6 pt-24 pb-24">

      {/* HEADER */}

      <div className="text-center mb-10">

        <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
          📺 WATCH LIVE TV
        </h1>

        <p className="text-gray-500 mt-3">
          Stream international news and documentary channels live.
        </p>

      </div>

      {/* PLAYER */}

      <div
        ref={playerRef}
        className="bg-black rounded-xl overflow-hidden shadow-xl"
      >

        <div className="aspect-video">

          <iframe
            key={active.id}
            src={getEmbed(active.youtube_url)}
            title={active.name}
            allowFullScreen
            loading="lazy"
            className="w-full h-full"
          />

        </div>

      </div>

      {/* NOW PLAYING */}

      <div className="text-center text-sm text-gray-700 mt-4 mb-12 flex items-center justify-center gap-3">

        <span className="text-gray-500">
          NOW PLAYING
        </span>

        <span className="font-semibold">
          {active.name}
        </span>

        <span className="flex items-center gap-1 text-red-600 font-semibold">

          <span className="relative flex h-3 w-3">

            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>

            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>

          </span>

          LIVE

        </span>

        <span className="text-gray-400">
          [{active.category}]
        </span>

      </div>

      {/* CHANNEL GRID */}

      <h2 className="text-xl font-semibold mb-6">
        Browse Live Channels
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

        {channels.map((channel: any, index: number) => (

          <button
            key={channel.id}
            onClick={() => {
              setActive(channel);
              setFocusIndex(index);
            }}
            className={`p-5 rounded-xl border bg-white shadow-sm transition-all duration-200
            hover:shadow-md hover:-translate-y-1
            ${active.id === channel.id ? "border-black ring-2 ring-black" : "border-gray-200"}
            ${focusIndex === index ? "ring-2 ring-red-500" : ""}`}
          >

            <div className="flex flex-col items-center gap-3">

              <img
                src={getThumbnail(channel.youtube_url)}
                alt={channel.name}
                className="w-12 h-12 object-contain"
                onError={(e:any)=> e.currentTarget.src="/tv-placeholder.png"}
              />

              <div className="text-sm font-semibold text-center">
                {channel.name}
              </div>

              <div className="text-xs text-gray-500">
                [{channel.category}]
              </div>

            </div>

          </button>

        ))}

      </div>

      {/* SEO SECTION */}

      <section className="mt-16 max-w-[900px] mx-auto">

        <details className="group border rounded-xl bg-white shadow-sm overflow-hidden">

          <summary className="cursor-pointer px-6 py-5 text-lg font-semibold flex justify-between items-center">
            Additional Information
            <span className="transition group-open:rotate-180">⌄</span>
          </summary>

          <div className="px-6 pb-8 text-gray-700 leading-relaxed space-y-6">

            <h2 className="text-2xl font-semibold">
        Watch Live TV Online
      </h2>

      <p>
        Watching <strong>live TV online</strong> has become one of the most convenient
        ways to access television channels without relying on traditional cable
        or satellite services. Modern streaming technology allows viewers to
        watch live news, sports, entertainment programs, and international
        television channels directly from their browser.
      </p>

      <p>
        Online TV streaming platforms allow users to switch between channels
        instantly and watch real-time broadcasts without complicated setup,
        making live television streaming a flexible and modern way to stay
        connected with global events.
      </p>

      <h3 className="text-xl font-semibold">
        What is Live TV Streaming?
      </h3>

      <p>
        Live TV streaming is the process of broadcasting television channels
        over the internet instead of traditional cable or satellite systems,
        allowing viewers to watch programs in real time from almost any
        internet-connected device.
      </p>

      <h3 className="text-xl font-semibold">
        Benefits of Watching TV Online
      </h3>

      <ul className="list-disc pl-6 space-y-2">
        <li>Watch live television channels from anywhere</li>
        <li>No cable or satellite subscription required</li>
        <li>Compatible with smartphones, laptops, tablets, and smart TVs</li>
        <li>Instantly switch between multiple channels</li>
        <li>Access global news, sports, and entertainment programs</li>
      </ul>

      <h3 className="text-xl font-semibold">
        Devices That Support Live TV Streaming
      </h3>

      <p>
        You can watch live television online using smartphones, tablets,
        desktop computers, laptops, smart TVs, and streaming devices.
      </p>


{/* PEOPLE ALSO ASK */}

<h2 className="text-2xl font-semibold">
People Also Ask
</h2>

<div className="space-y-4">

<div>
<h4 className="font-semibold">How can I watch live TV online?</h4>
<p>
You can watch live TV online through platforms that provide embedded
video players for television channels allowing instant streaming.
</p>
</div>

<div>
<h4 className="font-semibold">Can I watch TV online for free?</h4>
<p>
Many broadcasters offer official live streams of their channels online
so viewers can watch news, sports, and entertainment programs for free.
</p>
</div>

<div>
<h4 className="font-semibold">Is live TV streaming legal?</h4>
<p>
Live TV streaming is legal when the broadcast comes from official or
authorized sources provided by television networks.
</p>
</div>

<div>
<h4 className="font-semibold">What internet speed is needed?</h4>
<p>
A stable internet connection is recommended for smooth streaming,
especially for high-definition live broadcasts.
</p>
</div>

</div>


{/* FAQ */}

<h2 className="text-2xl font-semibold">
Frequently Asked Questions
</h2>

<div className="space-y-4">

<div>
<h4 className="font-semibold">What is the best way to watch live TV online?</h4>
<p>
The best way to watch live TV online is by using platforms that provide
multiple television channels through embedded video players.
</p>
</div>

<div>
<h4 className="font-semibold">Can I watch international TV channels?</h4>
<p>
Yes, many online platforms provide access to international television
channels including news, sports, and entertainment networks.
</p>
</div>

<div>
<h4 className="font-semibold">Do I need an app to watch live TV?</h4>
<p>
No. Most platforms allow viewers to watch live television directly
from a web browser without installing additional applications.
</p>
</div>

</div>

</div>
</details>
</section>


    </main>
  );
}