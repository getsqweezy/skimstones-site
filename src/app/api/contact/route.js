import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request) {
  const body = await request.json();
  const {
    name, company, fonction, email,
    phone, phone_country,
    s1, s2, s3, s4, s5, s6, s7,
    other_detail,
  } = body;

  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.from("contact_submissions").insert({
    name,
    company,
    fonction,
    email,
    phone,
    phone_country,
    s1, s2, s3, s4, s5, s6, s7,
    other_detail,
  });

  if (error) {
    console.error("Supabase insert error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
