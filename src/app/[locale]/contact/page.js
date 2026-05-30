'use client';
import { Suspense } from 'react';
import Header from '@/components/Header';
import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'libphonenumber-js';
import 'react-phone-number-input/style.css';

const SIT_KEYS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7'];
const SIT_COLUMNS = {
  s1: 'sit_sqweezy_interest',
  s2: 'sit_waste_recovery',
  s3: 'sit_spof',
  s4: 'sit_electricity_decarbonation',
  s5: 'sit_investor',
  s6: 'sit_tech_provider',
  s7: 'sit_other',
};

function isPhoneValid(val) {
  if (!val) return false;
  try { return isValidPhoneNumber(val); } catch { return false; }
}

function ContactContent() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const situationParam = searchParams.get('situation');

  const [form, setForm] = useState({ name: '', company: '', fonction: '', email: '' });
  const [phone, setPhone] = useState('');
  const [phoneCountry, setPhoneCountry] = useState('FR');
  const [situations, setSituations] = useState(() => {
    const base = Object.fromEntries(SIT_KEYS.map((k) => [k, false]));
    if (situationParam === 'wvc')  base.s2 = true;
    if (situationParam === 'spof') base.s3 = true;
    return base;
  });
  const [otherDetail, setOtherDetail] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const otherRef = useRef(null);

  useEffect(() => {
    if (!otherRef.current) return;
    otherRef.current.style.height = 'auto';
    otherRef.current.style.height = otherRef.current.scrollHeight + 'px';
  }, [otherDetail]);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function validateTextField(name, value) {
    if (!value.trim()) return t('errorRequired');
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t('errorEmail');
    return '';
  }

  function handleBlur(e) {
    setFieldErrors((fe) => ({ ...fe, [e.target.name]: validateTextField(e.target.name, e.target.value) }));
  }

  function handlePhoneBlur() {
    setFieldErrors((fe) => ({
      ...fe,
      phone: !phone ? t('errorRequired') : !isPhoneValid(phone) ? t('errorPhone') : '',
    }));
  }

  function toggleSituation(key) {
    setSituations((s) => {
      const next = { ...s, [key]: !s[key] };
      if (Object.values(next).some(Boolean)) setFieldErrors((fe) => ({ ...fe, situations: '' }));
      return next;
    });
  }

  function handleOtherChange(e) {
    const val = e.target.value.slice(0, 500);
    setOtherDetail(val);
    if (val.trim()) setFieldErrors((fe) => ({ ...fe, otherDetail: '' }));
  }

  function validateAll() {
    const errors = {};
    ['name', 'company', 'fonction', 'email'].forEach((k) => {
      errors[k] = validateTextField(k, form[k]);
    });
    errors.phone = !phone ? t('errorRequired') : !isPhoneValid(phone) ? t('errorPhone') : '';
    errors.situations = Object.values(situations).some(Boolean) ? '' : t('errorSituations');
    errors.otherDetail = situations.s7 && !otherDetail.trim() ? t('errorRequired') : '';
    setFieldErrors(errors);
    return Object.values(errors).every((e) => !e);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError('');
    if (!validateAll()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale,
          ...form,
          phone,
          country_code: phoneCountry,
          ...Object.fromEntries(SIT_KEYS.map((k) => [SIT_COLUMNS[k], situations[k]])),
          other_detail: situations.s7 ? otherDetail : null,
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setSubmitError(t('error'));
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
          {t('confirmation').split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
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

        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="form-field">
            <label className="form-label" htmlFor="name">
              {t('labelName')} <span className="req">*</span>
            </label>
            <input
              className={`form-input${fieldErrors.name ? ' input-error' : ''}`}
              id="name"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="company">
              {t('labelCompany')} <span className="req">*</span>
            </label>
            <input
              className={`form-input${fieldErrors.company ? ' input-error' : ''}`}
              id="company"
              name="company"
              autoComplete="organization"
              value={form.company}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {fieldErrors.company && <span className="field-error">{fieldErrors.company}</span>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="fonction">
              {t('labelFonction')} <span className="req">*</span>
            </label>
            <input
              className={`form-input${fieldErrors.fonction ? ' input-error' : ''}`}
              id="fonction"
              name="fonction"
              autoComplete="organization-title"
              value={form.fonction}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {fieldErrors.fonction && <span className="field-error">{fieldErrors.fonction}</span>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="email">
              {t('labelEmail')} <span className="req">*</span>
            </label>
            <div className={`input-email-row${fieldErrors.email ? ' input-error' : ''}`}>
              <span className="email-at">@</span>
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
          </div>

          <div className="form-field">
            <label className="form-label">
              {t('labelPhone')} <span className="req">*</span>
            </label>
            <PhoneInput
              className={`phone-input-wrapper${fieldErrors.phone ? ' input-error' : ''}`}
              defaultCountry="FR"
              value={phone}
              onChange={setPhone}
              onCountryChange={setPhoneCountry}
              onBlur={handlePhoneBlur}
              autoComplete="tel"
            />
            {fieldErrors.phone && <span className="field-error">{fieldErrors.phone}</span>}
          </div>

          <fieldset className="form-fieldset">
            <legend className="form-legend">
              {t('situationsLegend')} <span className="req">*</span>{' '}
              <span className="multi-hint">{t('multiHint')}</span>
            </legend>
            {SIT_KEYS.map((key) => (
              <label key={key} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={situations[key]}
                  onChange={() => toggleSituation(key)}
                />
                <span>{t(key)}</span>
              </label>
            ))}
            {fieldErrors.situations && <span className="field-error">{fieldErrors.situations}</span>}
          </fieldset>

          {situations.s7 && (
            <div className="form-field">
              <label className="form-label" htmlFor="otherDetail">
                {t('otherDetailLabel')} <span className="req">*</span>
              </label>
              <textarea
                ref={otherRef}
                id="otherDetail"
                className={`form-textarea${fieldErrors.otherDetail ? ' input-error' : ''}`}
                value={otherDetail}
                onChange={handleOtherChange}
                rows={2}
              />
              <span className="char-counter">{otherDetail.length}/500</span>
              {fieldErrors.otherDetail && <span className="field-error">{fieldErrors.otherDetail}</span>}
            </div>
          )}

          {submitError && <p className="form-error">{submitError}</p>}

          <button type="submit" className="btn-send" disabled={loading}>
            {loading ? t('sending') : t('btnSend')}
          </button>
        </form>
      </main>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactContent />
    </Suspense>
  );
}
