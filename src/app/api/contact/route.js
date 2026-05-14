// app/api/contact/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { nom, email, message } = body;

  // logique : email, Supabase, etc.

  console.log("contactreçu:", await request.json()); // visible dans Netlify Functions logs

  return NextResponse.json({ success: true });
}
