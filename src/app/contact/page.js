"use client";
import Header from "@/components/Header";
import { useState } from "react";

const SITUATIONS = [
  "Big electricity consumer seeking green solutions",
  "Industrial facility seeking waste to energy solutions",
  "Energy facility seeking QoS and resilience",
  "Public actor seeking energy saving solutions",
  "Investor seeking bankable and climate-positive projects",
  "Technology provider seeking for partnership",
  "Other: Please detail",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    fonction: "",
    email: "",
    countryCode: "",
    phone: "",
    situations: [],
    otherDetail: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function toggleSituation(s) {
    setForm((f) => ({
      ...f,
      situations: f.situations.includes(s)
        ? f.situations.filter((x) => x !== s)
        : [...f.situations, s],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="mobile-frame">
        <Header />
        <main className="page-main contact-success">
          <h1>Thank you!</h1>
          <p>We will contact you as rapidly as possible.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="mobile-frame">
      <Header />
      <main className="page-main">
        <h1 className="contact-title">Contact form</h1>
        <p className="contact-subtitle">
          Please fill the form below and we will contact you as rapidly as
          possible
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <label className="form-label">
            Your name <span className="req">*</span>
            <input
              className="form-input"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Entrer le texte"
              required
            />
          </label>

          <label className="form-label">
            Company <span className="req">*</span>
            <input
              className="form-input"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Entrer le texte"
              required
            />
          </label>

          <label className="form-label">
            Your fonction <span className="req">*</span>
            <input
              className="form-input"
              name="fonction"
              value={form.fonction}
              onChange={handleChange}
              placeholder="Entrer le texte"
              required
            />
          </label>

          <label className="form-label">
            Professional email <span className="req">*</span>
            <div className="input-email-row">
              <span className="email-at">@</span>
              <input
                className="form-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <label className="form-label">
            Phone number <span className="req">*</span>
            <div className="phone-row">
              <select
                className="form-select"
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                required
              >
                <option value="">Country</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+212">🇲🇦 +212</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+34">🇪🇸 +34</option>
                <option value="+39">🇮🇹 +39</option>
              </select>
              <input
                className="form-input phone-input"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <fieldset className="form-fieldset">
            <legend className="form-legend">
              Please describe your company situation{" "}
              <span className="req">*</span>{" "}
              <span className="multi-hint">(multiple choice allowed)</span>
            </legend>
            {SITUATIONS.map((s) => (
              <label key={s} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.situations.includes(s)}
                  onChange={() => toggleSituation(s)}
                />
                <span>{s}</span>
              </label>
            ))}
          </fieldset>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn-send" disabled={loading}>
            {loading ? "Sending…" : "Send"}
          </button>
        </form>
      </main>
    </div>
  );
}
