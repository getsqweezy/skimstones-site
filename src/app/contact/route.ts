// app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { nom, email, message } = body;

  // logique : email, Supabase, etc.

  return NextResponse.json({ success: true });
}
