'use client';

import { MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MapPlaceholder } from '@/components/visuals/contact/MapPlaceholder';
import { contact } from '@/lib/content';

const MAP_SRC = 'https://www.google.com/maps?q=Dubai+Silicon+Oasis+DDP+Building+A2&output=embed';

/**
 * Mounts the Google Maps iframe only once it is near the viewport. Native `loading="lazy"`
 * still fetched ~400 KB of Maps scripts on first load, competing with the hero for bandwidth.
 * A crafted SVG placeholder sits underneath until the iframe has loaded, then it fades in.
 */
export function MapEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative rounded-[20px] border border-white/10 bg-white/[0.03] p-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-surface">
        <MapPlaceholder className="absolute inset-0" />

        {visible ? (
          <iframe
            title="Map of Dubai Silicon Oasis"
            src={MAP_SRC}
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-700 [filter:grayscale(1)_invert(0.92)_contrast(0.9)_brightness(0.95)] ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        ) : null}

        {/* Edge vignette + hairline so the map sits inside the frame rather than on top of it */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[14px] shadow-[inset_0_0_50px_rgb(var(--bg)/0.55)] ring-1 ring-inset ring-white/10"
        />

        {/* Floating pin card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2.5 left-2.5 flex max-w-[calc(100%-20px)] items-center gap-2.5 rounded-xl border border-white/10 bg-bg/75 py-1.5 pl-1.5 pr-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_16px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md sm:bottom-4 sm:left-4 sm:gap-3 sm:py-2 sm:pl-2 sm:pr-4"
        >
          <span className="relative flex h-8 w-8 shrink-0 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-gradient-to-b from-accent-strong to-accent-strong/70 text-on-accent shadow-[0_0_20px_-4px_rgb(var(--accent)/0.8)]">
            <MapPin className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[13px] font-semibold text-fg">{contact.company}</span>
            <span className="mt-0.5 hidden truncate text-xs text-fg-muted sm:block">Dubai Silicon Oasis</span>
          </span>
        </div>
      </div>
    </div>
  );
}
