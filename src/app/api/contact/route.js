import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request) {
  const body = await request.json();
  const { name, company, fonction, email, countryCode, phone, situations, otherDetail } = body;

  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.from("contact_submissions").insert({
    name,
    company,
    fonction,
    email,
    country_code: countryCode,
    phone,
    situations,
    other_detail: otherDetail,
  });

  if (error) {
    console.error("Supabase insert error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
