import { google } from "googleapis";

/* Generate slug */
function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/-+/g, "-");
}

export async function getStoriesFromSheet() {

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Stories!A2:H1000",
  });

  const rows = response.data.values || [];

  return rows.map((row) => {

    const title = row[1] || "";
    const manualSlug = row[2] || "";

    const slug =
      manualSlug && manualSlug.trim() !== ""
        ? createSlug(manualSlug)
        : createSlug(title);

    return {
      id: row[0],
      title,
      slug,
      excerpt: row[3],
      content: row[4],
      image: row[5],
      date: row[6],
      status: row[7],
    };

  });
}