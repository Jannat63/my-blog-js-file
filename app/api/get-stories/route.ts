import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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

    const stories = rows.map((row) => ({
      id: row[0],
      title: row[1],
      slug: row[2],
      excerpt: row[3],
      content: row[4],
      image: row[5],
      date: row[6],
      status: row[7],
    }));

    return NextResponse.json(stories);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}