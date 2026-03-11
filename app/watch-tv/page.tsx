import { getTVChannels } from "@/lib/googleSheets";

export const dynamic = "force-dynamic";

export default async function WatchTV(){

const channels = await getTVChannels();

const first = channels[0];

return(

<main className="max-w-[1200px] mx-auto px-6 pt-24 pb-24">

<h1 className="text-4xl font-bold mb-10">
📺 Watch TV
</h1>

<div className="aspect-video w-full mb-10 rounded-xl overflow-hidden shadow">

<iframe
src={first.youtube_url.replace("watch?v=","embed/")}
title={first.name}
allowFullScreen
className="w-full h-full"
/>

</div>

<div className="grid md:grid-cols-3 gap-6">

{channels.map((c:any)=>{

const embed = c.youtube_url.replace("watch?v=","embed/");

return(

<a
key={c.id}
href={`/watch-tv?channel=${c.id}`}
className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
>

<img
src={`/tv/${c.thumbnail}`}
className="w-full h-40 object-cover"
/>

<div className="p-4">

<h3 className="font-semibold">
{c.name}
</h3>

<p className="text-sm text-gray-500">
{c.category}
</p>

</div>

</a>

);

})}

</div>

</main>

);

}