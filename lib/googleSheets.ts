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
    range: "Sheet1!A2:H1000", // Adjust if your sheet name is different
  });


  const rows = response.data.values;

  if (!rows) return [];

  return rows.map((row) => ({
    id: row[0],
    title: row[1],
    slug: row[2],
    excerpt: row[3],
    content: row[4],
    image: row[5],
    date: row[6],
    status: row[7],
  })).filter(post => post.status === "published");
}
export async function getPostBySlug(slug: string) {
  const posts = await getSheetData();
console.log("URL slug:", slug);
console.log("Sheet slugs:", posts.map((p) => p.slug));
  return posts.find(
    (post) =>
      post.slug?.toString().trim().toLowerCase() ===
      slug.toString().trim().toLowerCase()
  );
}