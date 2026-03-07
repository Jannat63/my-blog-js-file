import { NextResponse } from "next/server";
import speakeasy from "speakeasy";

export async function POST(req: Request) {
  const { secret, code } = await req.json();

  if (secret !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: false });
  }

  const verified = speakeasy.totp.verify({
    secret: process.env.ADMIN_2FA_SECRET!,
    encoding: "base32",
    token: code,
  });

  if (!verified) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}