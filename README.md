# Kling Digital Assets — website

Marketing site for Kling Digital Assets FZCO. Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion, exported as a fully static site.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build & deploy

```bash
npm run build      # writes the static site to out/
npm start          # serves out/ locally to preview the production build
```

`out/` is plain HTML/CSS/JS. Upload it to any static host — Netlify, Vercel, Cloudflare Pages, AWS S3 (+ CloudFront), etc. No server or Node runtime is needed.

### Deploy on Vercel

1. Import the GitHub repo at vercel.com/new. Vercel detects Next.js automatically; keep the defaults (build `npm run build`, no output directory override).
2. Optional: add `NEXT_PUBLIC_FORM_ENDPOINT` under Project Settings, Environment Variables, then redeploy.
3. Add your domain (e.g. kling-digital.com) under Project Settings, Domains. The canonical URL and social image use `site.url` in `lib/content.ts`, so update it if the domain differs.

## Where to edit things

| What | Where |
| --- | --- |
| All copy (headings, services, contact details, SEO title/description) | `lib/content.ts` |
| Logo | `public/brand/kling-mark.png` (flame) and `public/brand/kling-logo.png` (full lockup). The nav and footer use `components/ui/Logo.tsx`: the flame image plus the wordmark set in HTML so it stays sharp. |
| Favicon / social share image | `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.png` (regenerate with `node scripts/generate-og-image.mjs` after changing the name or tagline) |
| Design tokens (colours, radius, spacing, fonts) | `app/globals.css` (CSS variables, colours stored as RGB channels so `bg-accent/10` etc. work) + `tailwind.config.ts` |

There are no stock photos: every illustration (hero dashboard, service visuals, about orbit, map placeholder) is drawn in code under `components/visuals/`, so it stays sharp and on-brand. The only raster image is the logo.

## Colour themes

Three variants ship with the site: Midnight Blue (default), Sunset Orange and Emerald. Visitors switch with the floating **Theme** picker (bottom right); the choice is saved in the browser and applied before the page paints.

- Token values: `app/globals.css` (`:root`, `:root[data-theme='orange']`, `:root[data-theme='emerald']`).
- Theme list and default: `lib/themes.ts`. To ship a single theme, set `DEFAULT_THEME` and remove `<ThemeSwitcher />` from `app/layout.tsx`.
- Illustrations use the same tokens (`accent`, `accent-2`, `accent-3`, `surface`…), so never hardcode hex colours in components.

## Contact form

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_FORM_ENDPOINT` to a form backend that accepts `POST` with `FormData` (e.g. a Formspree endpoint). The value is baked in at build time, so rebuild after changing it.

- **Set:** the form submits in place and shows a success or error message.
- **Not set:** submitting opens the visitor's email app with a pre-filled message to `info@klingmetaverse.io`, so the form always works.

## Notes

- `node scripts/generate-og-image.mjs` uses Next's bundled `@vercel/og`, which fails on Windows paths. On Windows, point `OG_RENDERER` at a copy of `node_modules/next/dist/compiled/@vercel/og/index.node.js` (with its `.ttf`/`.wasm` files) whose `fileURLToPath(join(import.meta.url, "../x"))` calls are changed to `fileURLToPath(new URL("./x", import.meta.url))`.
- Motion respects `prefers-reduced-motion`. The hero entrance is CSS-only so the headline paints before JavaScript loads.
