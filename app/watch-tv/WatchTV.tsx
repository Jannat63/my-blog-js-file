"use client";

import { useState } from "react";

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
        📺 Watch Live TV Online
      </h1>

      <div className="grid lg:grid-cols-[2.3fr_1fr] gap-8">

        {/* PLAYER */}

        <div className="bg-black rounded-xl overflow-hidden shadow-xl">

          <div className="aspect-video">

            <iframe
              src={getEmbed(active.youtube_url)}
              title={active.name}
              allowFullScreen
              loading="lazy"
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
                aria-label={`Watch ${channel.name}`}
                onClick={() => setActive(channel)}
                className={`w-full flex items-center gap-3 px-4 py-4 border-b transition
                ${active.id === channel.id
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"}`}
              >

                <div className="text-xs opacity-60 w-6">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div id={channel.name.replace(/\s+/g, "-")}>

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


{/* ================= SEO SECTION ================= */}

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


{/* FAQ STRUCTURED DATA */}

<script
type="application/ld+json"
dangerouslySetInnerHTML={{
__html: JSON.stringify({
"@context":"https://schema.org",
"@type":"FAQPage",
"mainEntity":[
{
"@type":"Question",
"name":"How can I watch live TV online?",
"acceptedAnswer":{"@type":"Answer","text":"You can watch live TV online using streaming platforms that provide embedded video players for television channels."}
},
{
"@type":"Question",
"name":"Can I watch TV online for free?",
"acceptedAnswer":{"@type":"Answer","text":"Many broadcasters provide free live streams that can be watched online without subscription."}
},
{
"@type":"Question",
"name":"Is live TV streaming legal?",
"acceptedAnswer":{"@type":"Answer","text":"Live TV streaming is legal when the broadcast is provided by official or authorized sources."}
},
{
"@type":"Question",
"name":"What internet speed is needed for live TV streaming?",
"acceptedAnswer":{"@type":"Answer","text":"A stable internet connection is required for smooth live television streaming."}
}
]
})
}}
/>

    </main>
  );
}