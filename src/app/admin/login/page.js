'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  }

  return (
    <div style={{
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--sks-bg)',
      fontFamily: 'var(--font-body)',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '3px',
        padding: 'var(--space-3xl) var(--space-2xl)',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '2px 4px 16px rgba(0,0,0,0.12)',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-sks-l1)',
          fontSize: 'var(--fs-title)',
          color: 'var(--title-color)',
          marginBottom: 'var(--space-xl)',
          textAlign: 'center',
        }}>
          SKIMSTONES — Admin
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-m)' }}>
          <div className="form-field">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-field">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button
            type="submit"
            className="btn-sks btn-send"
            disabled={loading}
            style={{
              background: 'var(--sks-primary)',
              padding: 'var(--space-m) var(--space-l)',
              alignSelf: 'stretch',
            }}
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
