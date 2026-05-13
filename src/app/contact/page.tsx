// app/contact/page.tsx
"use client";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={(e) => setForm({ ...form, nom: e.target.value })} />
      <button type="submit">Envoyer</button>
    </form>
  );
}
