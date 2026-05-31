'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

const EMPTY_FORM = {
  code: '',
  title_fr: '',
  title_en: '',
  start_date: '',
  location: '',
  mode: 'Présentiel',
  active: true,
};

const MODE_OPTIONS = ['Présentiel', 'Hybride', 'Télétravail'];

export default function AdminRecrutementPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [pdfFR, setPdfFR] = useState(null);
  const [pdfEN, setPdfEN] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const supabase = getSupabaseBrowserClient();

  async function fetchOffers() {
    const { data } = await supabase
      .from('job_offers')
      .select('*')
      .order('created_at', { ascending: false });
    setOffers(data || []);
    setLoading(false);
  }

  useEffect(() => { fetchOffers(); }, []);

  function openAdd() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setPdfFR(null);
    setPdfEN(null);
    setError('');
    setShowForm(true);
  }

  function openEdit(offer) {
    setForm({
      code: offer.code || '',
      title_fr: offer.title_fr || '',
      title_en: offer.title_en || '',
      start_date: offer.start_date || '',
      location: offer.location || '',
      mode: offer.mode || 'Présentiel',
      active: offer.active ?? true,
    });
    setEditId(offer.id);
    setPdfFR(null);
    setPdfEN(null);
    setError('');
    setShowForm(true);
  }

  async function uploadPdf(file, filename) {
    const { error: uploadError } = await supabase.storage
      .from('job-pdfs')
      .upload(filename, file, { upsert: true, contentType: 'application/pdf' });
    if (uploadError) throw uploadError;
    const { data: urlData } = supabase.storage
      .from('job-pdfs')
      .getPublicUrl(filename);
    return urlData.publicUrl;
  }

  async function handleSave(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = { ...form };
      if (pdfFR) payload.pdf_fr = await uploadPdf(pdfFR, `${form.code}-FR.pdf`);
      if (pdfEN) payload.pdf_en = await uploadPdf(pdfEN, `${form.code}-EN.pdf`);

      if (editId) {
        const { error: dbError } = await supabase
          .from('job_offers')
          .update(payload)
          .eq('id', editId);
        if (dbError) throw dbError;
      } else {
        const { error: dbError } = await supabase
          .from('job_offers')
          .insert(payload);
        if (dbError) throw dbError;
      }
      setShowForm(false);
      await fetchOffers();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(offer) {
    await supabase
      .from('job_offers')
      .update({ active: !offer.active })
      .eq('id', offer.id);
    await fetchOffers();
  }

  async function handleDelete(offer) {
    if (!confirm(`Supprimer l'offre "${offer.title_fr}" ? Cette action est irréversible.`)) return;
    if (offer.pdf_fr) await supabase.storage.from('job-pdfs').remove([`${offer.code}-FR.pdf`]);
    if (offer.pdf_en) await supabase.storage.from('job-pdfs').remove([`${offer.code}-EN.pdf`]);
    await supabase.from('job_offers').delete().eq('id', offer.id);
    await fetchOffers();
  }

  const thStyle = {
    background: 'var(--sks-primary)',
    color: '#fff',
    fontFamily: 'var(--font-sks-l2)',
    fontSize: 'var(--fs-caption)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: 'var(--space-s) var(--space-m)',
    textAlign: 'left',
    whiteSpace: 'nowrap',
  };

  const tdStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fs-caption)',
    color: 'var(--text-color)',
    padding: 'var(--space-s) var(--space-m)',
    borderBottom: '1px solid rgba(25,40,79,0.08)',
    verticalAlign: 'middle',
  };

  const actionBtnStyle = (color) => ({
    background: 'none',
    border: `1px solid ${color}`,
    borderRadius: '3px',
    cursor: 'pointer',
    padding: '2px 8px',
    fontSize: 'var(--fs-ui)',
    color,
    fontFamily: 'var(--font-body)',
  });

  return (
    <div style={{ minHeight: '100svh', background: 'var(--sks-bg)', fontFamily: 'var(--font-body)' }}>
      <header style={{
        background: 'var(--sks-header-bg)',
        borderBottom: '1px solid rgba(25,40,79,0.12)',
        padding: 'var(--space-s) var(--space-l)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-m)',
      }}>
        <Link href="/admin/dashboard" style={{
          color: 'var(--sks-primary)',
          textDecoration: 'none',
          fontSize: 'var(--fs-caption)',
          fontWeight: 700,
        }}>
          ← Dashboard
        </Link>
        <span style={{
          fontFamily: 'var(--font-sks-l1)',
          fontSize: 'var(--fs-body)',
          fontWeight: 700,
          color: 'var(--title-color)',
        }}>
          Gestion des offres d'emploi
        </span>
      </header>

      <main style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: 'var(--space-2xl) var(--space-l)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xl)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={openAdd}
            className="btn-sks"
            style={{ background: 'var(--sks-mint)', padding: 'var(--space-s) var(--space-l)' }}
          >
            + Ajouter une offre
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-color)' }}>
            Chargement…
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Code</th>
                  <th style={thStyle}>Titre FR</th>
                  <th style={thStyle}>Titre EN</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Lieu</th>
                  <th style={thStyle}>Mode</th>
                  <th style={thStyle}>Statut</th>
                  <th style={thStyle}>PDF FR</th>
                  <th style={thStyle}>PDF EN</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {offers.length === 0 && (
                  <tr>
                    <td colSpan={10} style={{ ...tdStyle, textAlign: 'center', fontStyle: 'italic' }}>
                      Aucune offre.
                    </td>
                  </tr>
                )}
                {offers.map((offer, i) => (
                  <tr key={offer.id} style={{ background: i % 2 === 0 ? 'var(--sks-bg)' : '#FBF5D3' }}>
                    <td style={tdStyle}>{offer.code}</td>
                    <td style={tdStyle}>{offer.title_fr}</td>
                    <td style={tdStyle}>{offer.title_en || '—'}</td>
                    <td style={tdStyle}>{offer.start_date || '—'}</td>
                    <td style={tdStyle}>{offer.location || '—'}</td>
                    <td style={tdStyle}>{offer.mode || '—'}</td>
                    <td style={tdStyle}>
                      <span style={{
                        color: offer.active ? 'var(--sks-mint)' : 'var(--sks-bordeaux)',
                        fontWeight: 700,
                      }}>
                        {offer.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      {offer.pdf_fr
                        ? <a href={offer.pdf_fr} target="_blank" rel="noreferrer" style={{ color: 'var(--sks-primary)' }}>PDF ↗</a>
                        : '—'}
                    </td>
                    <td style={tdStyle}>
                      {offer.pdf_en
                        ? <a href={offer.pdf_en} target="_blank" rel="noreferrer" style={{ color: 'var(--sks-primary)' }}>PDF ↗</a>
                        : '—'}
                    </td>
                    <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
                        <button onClick={() => openEdit(offer)} style={actionBtnStyle('var(--sks-primary)')}>
                          Modifier
                        </button>
                        <button onClick={() => toggleActive(offer)} style={actionBtnStyle(offer.active ? 'var(--sks-bordeaux)' : 'var(--sks-mint)')}>
                          {offer.active ? 'Désactiver' : 'Activer'}
                        </button>
                        <button onClick={() => handleDelete(offer)} style={actionBtnStyle('var(--sks-bordeaux)')}>
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Formulaire modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div
            style={{
              background: 'var(--sks-bg)',
              borderRadius: '3px',
              maxWidth: '560px',
              width: '100%',
              maxHeight: '90svh',
              overflowY: 'auto',
              boxShadow: '4px 6px 20px rgba(0,0,0,0.30)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-sticky-header">
              <span className="modal-founder-name">
                {editId ? "Modifier l'offre" : 'Nouvelle offre'}
              </span>
              <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
            </div>

            <form
              onSubmit={handleSave}
              style={{ padding: 'var(--space-m)', display: 'flex', flexDirection: 'column', gap: 'var(--space-m)' }}
            >
              <div className="form-field">
                <label className="form-label">
                  Code du poste <span className="req">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={form.code}
                  onChange={e => setForm(f => ({ ...f, code: e.target.value }))}
                  required
                  placeholder="ex : DSI"
                />
              </div>

              <div className="form-field">
                <label className="form-label">
                  Titre FR <span className="req">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={form.title_fr}
                  onChange={e => setForm(f => ({ ...f, title_fr: e.target.value }))}
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label">Titre EN</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.title_en}
                  onChange={e => setForm(f => ({ ...f, title_en: e.target.value }))}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Date de début</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.start_date}
                  onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))}
                  placeholder="ex : À définir, ou 01/09/2026"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Lieu</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  placeholder="ex : Rabat, Maroc"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Mode de travail</label>
                <select
                  className="form-input"
                  value={form.mode}
                  onChange={e => setForm(f => ({ ...f, mode: e.target.value }))}
                >
                  {MODE_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={e => setForm(f => ({ ...f, active: e.target.checked }))}
                />
                Offre active (visible sur le site)
              </label>

              <div className="form-field">
                <label className="form-label">PDF FR</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={e => setPdfFR(e.target.files?.[0] || null)}
                  style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', color: 'var(--text-color)' }}
                />
              </div>

              <div className="form-field">
                <label className="form-label">PDF EN (optionnel)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={e => setPdfEN(e.target.files?.[0] || null)}
                  style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', color: 'var(--text-color)' }}
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-m)' }}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(25,40,79,0.3)',
                    borderRadius: '3px',
                    padding: 'var(--space-s) var(--space-l)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fs-caption)',
                    color: 'var(--text-color)',
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-sks btn-send"
                  disabled={saving}
                  style={{ background: 'var(--sks-primary)', padding: 'var(--space-s) var(--space-l)' }}
                >
                  {saving ? 'Enregistrement…' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
