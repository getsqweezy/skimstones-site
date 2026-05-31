'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function handleSignOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  const cardStyle = {
    background: '#FBF5D3',
    border: '1px solid rgba(25,40,79,0.12)',
    borderRadius: '3px',
    padding: 'var(--space-xl)',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-s)',
    boxShadow: '1px 2px 6px rgba(0,0,0,0.06)',
    transition: 'filter 0.15s',
    cursor: 'pointer',
  };

  return (
    <div style={{ minHeight: '100svh', background: 'var(--sks-bg)', fontFamily: 'var(--font-body)' }}>
      <header style={{
        background: 'var(--sks-header-bg)',
        borderBottom: '1px solid rgba(25,40,79,0.12)',
        padding: 'var(--space-s) var(--space-l)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: 'var(--font-sks-l1)',
          fontSize: 'var(--fs-body)',
          fontWeight: 700,
          color: 'var(--title-color)',
        }}>
          SKIMSTONES — Back-office
        </span>
        <button
          onClick={handleSignOut}
          className="btn-sks"
          style={{
            background: 'var(--sks-bordeaux)',
            padding: 'var(--space-xs) var(--space-m)',
            fontSize: 'var(--fs-caption)',
          }}
        >
          Déconnexion
        </button>
      </header>

      <main style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: 'var(--space-2xl) var(--space-l)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2xl)',
      }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-sks-l1)',
            fontSize: 'var(--fs-title)',
            color: 'var(--title-color)',
            marginBottom: 'var(--space-xs)',
          }}>
            Dashboard
          </h1>
          {user && (
            <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-color)' }}>
              Connecté en tant que {user.email}
            </p>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-l)' }}>
          <Link href="/admin/recrutement" style={cardStyle}>
            <span style={{
              fontFamily: 'var(--font-sks-l2)',
              fontSize: 'var(--fs-body)',
              fontWeight: 700,
              color: 'var(--title-color)',
            }}>
              Recrutement
            </span>
            <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-color)' }}>
              Gérer les offres d'emploi
            </span>
          </Link>

          <div style={{ ...cardStyle, opacity: 0.45, cursor: 'not-allowed' }}>
            <span style={{
              fontFamily: 'var(--font-sks-l2)',
              fontSize: 'var(--fs-body)',
              fontWeight: 700,
              color: 'var(--title-color)',
            }}>
              SQWEEZY
            </span>
            <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-color)' }}>
              (à venir)
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
