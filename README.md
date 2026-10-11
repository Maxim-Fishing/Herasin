# HERARESIN

Sitio de HERARESIN · Neiva, Huila. Next.js (exportación estática) + Tailwind + Supabase.

## Ver en local

```bash
node node_modules/next/dist/bin/next dev -p 3100
```

Sin variables de Supabase el sitio funciona en **modo demo** con el catálogo de ejemplo.

## Publicado en GitHub Pages

Cada `push` a `main` publica el sitio con `.github/workflows/pages.yml`.

1. GitHub → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. URL final: `https://maxim-fishing.github.io/Herasin/`.

## Conectar Supabase (usuarios, base de datos y fotos)

1. Crea un proyecto en <https://supabase.com>.
2. **SQL Editor** → pega `supabase/schema.sql` → *Run*. Al final, descomenta y ejecuta el `insert` con el correo
   de la administradora.
3. **Authentication → Providers**: activa *Email* y, si quieres, *Google*.
   En **URL Configuration** agrega `https://maxim-fishing.github.io/Herasin/admin/` como *Redirect URL*.
4. **Project Settings → API**: copia *Project URL* y *anon public key*.
5. En GitHub: **Settings → Secrets and variables → Actions → Variables** crea
   `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
6. En local: copia `.env.local.example` a `.env.local` con los mismos valores.
7. Entra a `/admin/`, inicia sesión y toca **Cargar catálogo inicial** en Productos.

## Panel `/admin`

Productos, kits de temporada, categorías, aviso de temporada, ajustes del sitio y usuarios con acceso.
Las fotos se suben al bucket `fotos` de Supabase Storage.
