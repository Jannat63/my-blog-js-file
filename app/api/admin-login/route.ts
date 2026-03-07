import { NextResponse } from "next/server";
import speakeasy from "speakeasy";

export async function POST(req: Request) {
  const { password, token } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: false });
  }

  const verified = speakeasy.totp.verify({
    secret: process.env.ADMIN_2FA_SECRET!,
    encoding: "base32",
    token: token,
    window: 1
  });

  if (!verified) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}