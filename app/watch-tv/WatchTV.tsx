"use client";

import { useState } from "react";

export default function WatchTV({ channels }: any) {

  if (!channels || channels.length === 0) {
    return (
      <main className="max-w-[1200px] mx-auto px-6 pt-24 pb-24">
        <h1 className="text-4xl font-bold mb-6">📺 Watch TV</h1>
        <p className="text-gray-600">No channels available.</p>
      </main>
    );
  }

  const [active, setActive] = useState(channels[0]);

  const getEmbed = (url: string) => {

    let id = "";

    if (url.includes("watch?v=")) id = url.split("watch?v=")[1].split("&")[0];
    else if (url.includes("youtu.be/")) id = url.split("youtu.be/")[1].split("?")[0];
    else if (url.includes("/live/")) id = url.split("/live/")[1].split("?")[0];
    else if (url.includes("/embed/")) id = url.split("/embed/")[1].split("?")[0];

    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;
  };

  return (
    <main className="max-w-[1250px] mx-auto px-6 pt-24 pb-24">

      <h1 className="text-4xl font-bold mb-10 flex items-center gap-3">
        📺 Watch TV
      </h1>

      <div className="grid lg:grid-cols-[2.3fr_1fr] gap-8">

        {/* PLAYER */}

        <div className="bg-black rounded-xl overflow-hidden shadow-xl">

          <div className="aspect-video">

            <iframe
              src={getEmbed(active.youtube_url)}
              title={active.name}
              allowFullScreen
              className="w-full h-full"
            />

          </div>

          <div className="flex items-center justify-between px-5 py-3 bg-black text-white">

            <div className="font-semibold">
              {active.name}
            </div>

            <div className="text-red-500 text-sm font-semibold">
              ● LIVE
            </div>

          </div>

        </div>

        {/* CHANNEL LIST */}

        <div className="border rounded-xl overflow-hidden bg-white shadow-sm">

          <div className="px-4 py-3 border-b font-semibold bg-gray-50">
            Channels
          </div>

          <div className="max-h-[520px] overflow-y-auto">

            {channels.map((channel: any, i: number) => (

              <button
                key={channel.id}
                onClick={() => setActive(channel)}
                className={`w-full flex items-center gap-3 px-4 py-4 border-b transition
                ${active.id === channel.id
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"}`}
              >

                <div className="text-xs opacity-60 w-6">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div>

                  <div className="font-medium">
                    {channel.name}
                  </div>

                  <div className="text-xs opacity-70">
                    {channel.category}
                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>

      </div>

    </main>
  );
}