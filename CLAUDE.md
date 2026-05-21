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

## Règles UI

Tous les headers de modales utilisent une teinte PLUS CLAIRE que le fond de page,
obtenue avec `color-mix` vers `#fff` :
```css
background: color-mix(in srgb, var(--sks-header-bg) 85%, #fff 15%);
```

Dans toutes les modales du site, le header sticky contient UNIQUEMENT le nom
et la fonction. Les titres de section du contenu (Education, Expérience, etc.)
restent dans le corps scrollable et utilisent systématiquement
`font-family: var(--font-sks-l2)` avec la classe `.modal-section-title`.

## Formulaire de contact

Le formulaire de contact utilise `react-phone-number-input` pour la gestion internationale des téléphones. Tous les numéros sont stockés en format E.164 dans Supabase. La colonne `phone_country` reçoit le code ISO du pays (ex. `"FR"`). Les cases à cocher situations sont des booléens indépendants (`s1` à `s7`), pas un tableau de strings. Cette convention s'applique à tous les futurs formulaires du site.

@AGENTS.md
