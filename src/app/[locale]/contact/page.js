'use client';
import Header from '@/components/Header';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');

  const SITUATIONS = [
    t('s1'),
    t('s2'),
    t('s3'),
    t('s4'),
    t('s5'),
    t('s6'),
    t('s7'),
  ];

  const [form, setForm] = useState({
    name: '',
    company: '',
    fonction: '',
    email: '',
    countryCode: '',
    phone: '',
    situations: [],
    otherDetail: '',
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
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
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="mobile-frame">
        <Header />
        <main className="page-main contact-success">
          <h1>{t('thanks')}</h1>
          <p>{t('confirmation')}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="mobile-frame">
      <Header />
      <main className="page-main">
        <h1 className="contact-title">{t('title')}</h1>
        <p className="contact-subtitle">{t('subtitle')}</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <label className="form-label">
            {t('labelName')} <span className="req">*</span>
            <input
              className="form-input"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-label">
            {t('labelCompany')} <span className="req">*</span>
            <input
              className="form-input"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-label">
            {t('labelFonction')} <span className="req">*</span>
            <input
              className="form-input"
              name="fonction"
              value={form.fonction}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-label">
            {t('labelEmail')} <span className="req">*</span>
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
            {t('labelPhone')} <span className="req">*</span>
            <div className="phone-row">
              <select
                className="form-select"
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                required
              >
                <option value="">{t('labelCountry')}</option>
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
              {t('situationsLegend')} <span className="req">*</span>{' '}
              <span className="multi-hint">{t('multiHint')}</span>
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
            {loading ? t('sending') : t('btnSend')}
          </button>
        </form>
      </main>
    </div>
  );
}
