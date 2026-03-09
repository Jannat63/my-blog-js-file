import { google } from "googleapis";

export async function GET() {

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Comments!A2:F1000",
  });

  const rows = response.data.values || [];

  const comments = rows.map((row: any[]) => ({
    id: row[0],
    postSlug: row[1],
    name: row[2],
    comment: row[3],
    date: row[4],
    status: row[5],
  }));

  return Response.json(comments.reverse());
}