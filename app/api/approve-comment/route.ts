import { google } from "googleapis";

export async function POST(req: Request) {

  const body = await req.json();
  const { id } = body;

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

  const index = rows.findIndex((r:any)=>r[0]===id);

  if(index === -1){
    return Response.json({success:false});
  }

  const rowNumber = index + 2;

  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `Comments!F${rowNumber}`,
    valueInputOption:"RAW",
    requestBody:{
      values:[["approved"]]
    }
  });

  return Response.json({success:true});
}