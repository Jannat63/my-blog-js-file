import { getTVChannels } from "@/lib/googleSheets";
import WatchTV from "./WatchTV";

export const dynamic = "force-dynamic";

export default async function Page() {

  const channels = await getTVChannels();

  return <WatchTV channels={channels} />;

}