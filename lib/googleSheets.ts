import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

export async function getSheetData() {
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A2:H1000",
  });

  const rows = response.data.values || [];

  const posts = rows.map((row: any[]) => ({
    id: row[0],
    title: row[1],
    slug: row[2],
    excerpt: row[3],
    content: row[4],
    image: row[5],
    date: row[6],
    status: row[7] || "draft", // fallback safety
    metaTitle: row[8],
    metaDescription: row[9],
  }));

  // 🔐 Only published posts are public
  return posts.filter(
    (post) =>
      post.status &&
      post.status.toString().trim().toLowerCase() === "published"
  );
}

export async function getPostBySlug(slug: string) {
  const posts = await getSheetData();

  return posts.find(
    (post) =>
      post.slug &&
      post.slug.toString().trim().toLowerCase() ===
        slug.toString().trim().toLowerCase()
  );
}

/* -----------------------------
   TV CHANNELS (Watch TV Page)
-------------------------------- */

export async function getTVChannels() {

  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "TV_CHANNELS!A2:F1000",
  });

  const rows = res.data.values || [];

  const channels = rows.map((row: any[]) => ({
    id: row[0],
    category: row[1],
    name: row[2],
    youtube_url: row[3],
    thumbnail: row[4],
    status: row[5],
  }));

  return channels.filter(
    (c) =>
      c.status &&
      c.status.toString().trim().toLowerCase() === "active"
  );
}