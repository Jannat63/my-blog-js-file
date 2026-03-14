import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔐 AUTH CHECK
    if (body.secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, excerpt, content, image, date, status } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // 🔍 CHECK DUPLICATE SLUG
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Stories!C2:C1000",
    });

    const existingSlugs = existing.data.values?.flat() || [];

    if (existingSlugs.includes(slug)) {
      return NextResponse.json(
        { error: "Story with this title already exists" },
        { status: 400 }
      );
    }

    // ➕ ADD ROW
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Stories!A:H",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          Date.now().toString(),
          title,
          slug,
          excerpt || "",
          content,
          image || "",
          date || new Date().toISOString().split("T")[0],
          status || "draft",
        ]],
      },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}