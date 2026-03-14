import { headers } from "next/headers";

export async function getStories() {

  const headersList = await headers();
  const host = headersList.get("host");

  const protocol = host?.includes("localhost") ? "http" : "https";

  const base = `${protocol}://${host}`;

  const res = await fetch(`${base}/api/get-stories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch stories");
  }

  return res.json();
}