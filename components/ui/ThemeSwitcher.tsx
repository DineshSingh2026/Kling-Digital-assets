'use client';

import { Palette } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DEFAULT_THEME, THEME_STORAGE_KEY, themes, type ThemeId } from '@/lib/themes';

function applyTheme(id: ThemeId) {
  if (id === DEFAULT_THEME) document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', id);
}

/**
 * Colour variant picker. The choice is remembered and applied before paint by the inline script in layout.
 * `floating` (tablet and up) sits bottom right; `inline` lives in the mobile menu so it never covers content on phones.
 */
export function ThemeSwitcher({ placement = 'floating' }: { placement?: 'floating' | 'inline' }) {
  const [active, setActive] = useState<ThemeId>(DEFAULT_THEME);

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current && themes.some((t) => t.id === current)) setActive(current as ThemeId);
  }, []);

  const choose = (id: ThemeId) => {
    setActive(id);
    applyTheme(id);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      // storage unavailable (private mode): the theme still applies for this visit
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={`items-center gap-1 rounded-full border border-white/10 bg-bg/80 p-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl ${
        placement === 'floating' ? 'fixed bottom-6 right-6 z-40 hidden sm:flex' : 'flex w-fit'
      }`}
    >
      <span className="inline-flex items-center gap-1.5 pl-2 pr-1.5 text-xs font-medium text-fg-muted">
        <Palette aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
        Theme
      </span>
      {themes.map((theme) => {
        const selected = active === theme.id;
        return (
          <button
            key={theme.id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${theme.label} theme`}
            title={theme.label}
            onClick={() => choose(theme.id)}
            className={`group relative flex h-9 items-center gap-2 rounded-full px-1.5 text-xs font-medium transition-colors duration-200 ${
              selected ? 'bg-white/[0.08] pr-3 text-fg' : 'text-fg-muted hover:bg-white/[0.04] hover:text-fg'
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-6 w-6 rounded-full ring-1 ring-inset ring-white/20 transition-transform duration-200 group-hover:scale-110 ${
                selected ? 'shadow-[0_0_0_2px_rgb(var(--bg)),0_0_0_3.5px_rgba(255,255,255,0.7)]' : ''
              }`}
              style={{ background: `linear-gradient(135deg, ${theme.swatch[0]} 0%, ${theme.swatch[1]} 100%)` }}
            />
            {selected ? <span>{theme.label}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
