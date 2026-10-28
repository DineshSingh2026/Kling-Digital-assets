// Renders app/opengraph-image.png (1200x630). Run: node scripts/generate-og-image.mjs
// A static PNG is used because Next's dynamic opengraph-image route is not emitted by `output: 'export'`.
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { createElement as h } from 'react';
// OG_RENDERER lets you point at a patched copy of @vercel/og (its bundled build breaks on Windows paths).
const { ImageResponse } = await import(
  process.env.OG_RENDERER ? pathToFileURL(process.env.OG_RENDERER).href : 'next/dist/compiled/@vercel/og/index.node.js'
);

const eyebrow = 'IT Consultancy · Dubai Silicon Oasis';
const logo = 'data:image/png;base64,' + (await readFile(new URL('../public/brand/kling-logo.png', import.meta.url))).toString('base64');
const tagline = 'Digital assets, portals and software, built for businesses that run on technology.';

const image = h(
  'div',
  {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 96px',
      backgroundColor: '#0B0F17',
      backgroundImage:
        'radial-gradient(circle at 78% 18%, rgba(240,135,46,0.22), rgba(11,15,23,0) 55%), radial-gradient(circle at 10% 100%, rgba(226,174,90,0.10), rgba(11,15,23,0) 45%)',
      color: '#F5F7FA',
    },
  },
  h(
    'div',
    { style: { display: 'flex', alignItems: 'center', gap: 16 } },
    h('div', { style: { width: 40, height: 2, backgroundColor: '#E2AE5A' } }),
    h(
      'div',
      { style: { fontSize: 24, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F0B46A' } },
      eyebrow,
    ),
  ),
  h('img', { src: logo, width: 329, height: 168, style: { marginTop: 36 } }),
  h('div', { style: { marginTop: 36, maxWidth: 900, fontSize: 34, lineHeight: 1.4, color: '#9AA4B2' } }, tagline),
);

const res = new ImageResponse(image, { width: 1200, height: 630 });
await writeFile(new URL('../app/opengraph-image.png', import.meta.url), Buffer.from(await res.arrayBuffer()));
console.log('Wrote app/opengraph-image.png');
