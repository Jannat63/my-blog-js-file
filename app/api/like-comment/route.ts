import { google } from "googleapis";

export async function POST(req:Request){

const {id} = await req.json();

const auth = new google.auth.GoogleAuth({
credentials:{
client_email:process.env.GOOGLE_CLIENT_EMAIL,
private_key:process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g,"\n")
},
scopes:["https://www.googleapis.com/auth/spreadsheets"]
});

const sheets = google.sheets({version:"v4",auth});

const res = await sheets.spreadsheets.values.get({
spreadsheetId:process.env.GOOGLE_SHEET_ID,
range:"Comments!A2:H1000"
});

const rows = res.data.values || [];

const index = rows.findIndex((r:any)=>r[0]===id);

if(index===-1){
return Response.json({success:false});
}

const rowNumber = index + 2;

const currentLikes = Number(rows[index][7] || 0) + 1;

await sheets.spreadsheets.values.update({
spreadsheetId:process.env.GOOGLE_SHEET_ID,
range:`Comments!H${rowNumber}`,
valueInputOption:"RAW",
requestBody:{
values:[[currentLikes]]
}
});

return Response.json({success:true});

}