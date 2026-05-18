"use client";
import { useState, useEffect } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [values, setValues] = useState([]);
  const supabase = getSupabaseBrowserClient();

  //BONJOUR
  async function fetchValues() {
    const { data } = await supabase.from("test").select("value");
    if (data) setValues(data.map((row) => row.value));
  }

  useEffect(() => {
    fetchValues();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from("test").insert({ value: form.nom });
    setForm({ ...form, nom: "" });
    fetchValues();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
        />
        <button type="submit">Envoyer</button>
      </form>

      <ul>
        {values.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  );
}
