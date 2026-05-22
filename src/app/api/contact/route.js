import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request) {
  const body = await request.json();
  const {
    name, company, fonction, email,
    phone, country_code,
    sit_big_electricity, sit_waste_to_energy, sit_energy_qos, sit_public_energy,
    sit_investor, sit_tech_provider, sit_other,
    other_detail,
  } = body;

  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.from("contact_submissions").insert({
    name,
    company,
    fonction,
    email,
    phone,
    country_code,
    sit_big_electricity,
    sit_waste_to_energy,
    sit_energy_qos,
    sit_public_energy,
    sit_investor,
    sit_tech_provider,
    sit_other,
    other_detail,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
