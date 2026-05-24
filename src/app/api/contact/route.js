import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const SIT_LABELS_FR = {
  sit_sqweezy_interest: "Grand consommateur d'électricité cherchant des solutions vertes",
  sit_waste_recovery: "Installation industrielle cherchant des solutions de valorisation énergétique des déchets",
  sit_spof: "Installation énergétique cherchant QoS et résilience",
  sit_electricity_decarbonation: "Collectivité ou acteur public cherchant des solutions d'efficacité énergétique",
  sit_investor: "Investisseur cherchant des projets finançables et à impact climatique positif",
  sit_tech_provider: "Fournisseur de technologie en recherche de partenariat",
  sit_other: "Autre",
};

const SIT_LABELS_EN = {
  sit_sqweezy_interest: "Large-scale electricity consumer seeking green solutions",
  sit_waste_recovery: "Industrial facility seeking waste to energy solutions",
  sit_spof: "Energy facility seeking QoS and resilience",
  sit_electricity_decarbonation: "Public entity seeking energy efficiency solutions",
  sit_investor: "Investor seeking bankable and climate-positive projects",
  sit_tech_provider: "Technology provider seeking a partnership",
  sit_other: "Other",
};

const emailTextsFR = {
  confirmation: {
    subject: "Nous avons bien reçu votre demande de contact",
    greeting: (name) => `Bonjour ${name},`,
    body1: "Nous avons bien reçu votre demande et un membre de notre équipe vous contactera dans les meilleurs délais.",
    body2: "Merci de votre intérêt.",
    signoff: "Cordialement,",
    signature: "L'équipe Skimstones",
  },
  notification: {
    subject: (name, company) => `Nouvelle demande de contact — ${name} - ${company}`,
    intro: "Nouvelle demande reçue via le formulaire de contact.",
    labels: {
      name: "Nom",
      company: "Société",
      fonction: "Fonction",
      email: "Email",
      phone: "Téléphone",
      situations: "Situations cochées",
      detail: "Détail",
    },
  },
};

const emailTextsEN = {
  confirmation: {
    subject: "We received your inquiry",
    greeting: (name) => `Dear ${name},`,
    body1: "We have received your request and a member of our team will get back to you as soon as possible.",
    body2: "Thank you for your interest.",
    signoff: "Kind regards,",
    signature: "The Skimstones Team",
  },
  notification: {
    subject: (name, company) => `New contact form submission — ${name} - ${company}`,
    intro: "New request received via the contact form.",
    labels: {
      name: "Name",
      company: "Company",
      fonction: "Position",
      email: "Email",
      phone: "Phone",
      situations: "Selected situations",
      detail: "Detail",
    },
  },
};

function buildConfirmationHtml(txt, name) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:520px;margin:32px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
    <div style="background:#004E7E;padding:24px 32px">
      <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.5px">SKIMSTONES</span>
    </div>
    <div style="padding:32px">
      <p style="color:#004E7E;font-size:17px;font-weight:700;margin:0 0 16px 0">${txt.greeting(name)}</p>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 12px 0">${txt.body1}</p>
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 24px 0">${txt.body2}</p>
      <p style="color:#475569;font-size:15px;margin:0 0 4px 0">${txt.signoff}</p>
      <p style="color:#004E7E;font-size:15px;font-weight:600;margin:0 0 32px 0">${txt.signature}</p>
      <a href="https://www.skimstones.com" style="color:#004E7E;font-size:13px;text-decoration:none">www.skimstones.com</a>
    </div>
  </div>
</body>
</html>`;
}

function buildNotificationHtml(txt, sitLabels, body) {
  const {
    name, company, fonction, email, phone, country_code,
    sit_sqweezy_interest, sit_waste_recovery, sit_spof, sit_electricity_decarbonation,
    sit_investor, sit_tech_provider, sit_other, other_detail,
  } = body;

  const checkedSituations = Object.entries({
    sit_sqweezy_interest, sit_waste_recovery, sit_spof, sit_electricity_decarbonation,
    sit_investor, sit_tech_provider, sit_other,
  })
    .filter(([, v]) => v)
    .map(([k]) => `• ${sitLabels[k]}`)
    .join('<br>');

  const row = (label, value) => value
    ? `<tr>
        <td style="padding:7px 16px 7px 0;font-weight:700;color:#004E7E;white-space:nowrap;vertical-align:top;font-size:14px">${label}</td>
        <td style="padding:7px 0;color:#334155;font-size:14px;line-height:1.5">${value}</td>
      </tr>`
    : '';

  const phoneDisplay = phone + (country_code ? ` (${country_code})` : '');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
    <div style="background:#004E7E;padding:20px 32px">
      <span style="color:#ffffff;font-size:15px;font-weight:700">SKIMSTONES — ${txt.intro}</span>
    </div>
    <div style="padding:32px">
      <table style="border-collapse:collapse;width:100%">
        ${row(txt.labels.name, name)}
        ${row(txt.labels.company, company)}
        ${row(txt.labels.fonction, fonction)}
        ${row(txt.labels.email, email)}
        ${row(txt.labels.phone, phoneDisplay)}
        ${checkedSituations ? row(txt.labels.situations, checkedSituations) : ''}
        ${sit_other && other_detail ? row(txt.labels.detail, other_detail) : ''}
      </table>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request) {
  const body = await request.json();
  const {
    locale,
    name, company, fonction, email,
    phone, country_code,
    sit_sqweezy_interest, sit_waste_recovery, sit_spof, sit_electricity_decarbonation,
    sit_investor, sit_tech_provider, sit_other,
    other_detail,
  } = body;

  const supabase = await getSupabaseServerClient();

  const { error: dbError } = await supabase.from("contact_submissions").insert({
    name,
    company,
    fonction,
    email,
    phone,
    country_code,
    sit_sqweezy_interest,
    sit_waste_recovery,
    sit_spof,
    sit_electricity_decarbonation,
    sit_investor,
    sit_tech_provider,
    sit_other,
    other_detail,
  });

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return NextResponse.json({ success: false, error: dbError.message }, { status: 500 });
  }

  const lang = locale === "fr" ? "fr" : "en";
  const txt = lang === "fr" ? emailTextsFR : emailTextsEN;
  const sitLabels = lang === "fr" ? SIT_LABELS_FR : SIT_LABELS_EN;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await Promise.all([
      resend.emails.send({
        from: "Skimstones <contact@skimstones.com>",
        to: email,
        subject: txt.confirmation.subject,
        html: buildConfirmationHtml(txt.confirmation, name),
      }),
      resend.emails.send({
        from: "Skimstones Form <contact@skimstones.com>",
        to: "contact@skimstones.com",
        subject: txt.notification.subject(name, company),
        html: buildNotificationHtml(txt.notification, sitLabels, body),
      }),
    ]);
  } catch (emailError) {
    console.error("Resend error:", emailError);
  }

  return NextResponse.json({ success: true });
}
