Ce site est déployé avec netlify. Un push sur le git permet donc le déploiement.

## Supabase

Le projet utilise `@supabase/supabase-js` + `@supabase/ssr`.

**Deux clients distincts selon le contexte :**

- `@/lib/supabase/client.js` → Client Components (`"use client"`)
  - Singleton via `getSupabaseBrowserClient()`
- `@/lib/supabase/server.js` → Server Components, Route Handlers, Server Actions
  - Async via `await getSupabaseServerClient()`
  - Utilise `await cookies()` de `next/headers` (API async de Next.js 16)

**Variables d'environnement requises** (voir `.env.local.example`) :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Ces variables doivent aussi être configurées dans Netlify (Site settings → Environment variables).

@AGENTS.md
