import { google } from "googleapis";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const { name, comment, postSlug } = body;

    if (!name || !comment || !postSlug) {
      return Response.json({ success: false, error: "Missing fields" });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const date = new Date().toISOString().split("T")[0];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Comments!A:F",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            Date.now().toString(),
            postSlug,
            name,
            comment,
            date,
            "pending",
          ],
        ],
      },
    });

    return Response.json({ success: true });

  } catch (error) {
    return Response.json({ success: false, error: "Server error" });
  }
}