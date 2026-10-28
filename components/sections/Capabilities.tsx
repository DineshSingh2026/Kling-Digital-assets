import { Container } from '@/components/ui/Container';
import { capabilities } from '@/lib/content';

/*
 * Slim capability band under the hero: an infinite, slow marquee of `capabilities`.
 * The first list is the accessible one; the duplicate (for the seamless loop) is aria-hidden.
 * Under reduced motion the duplicate is removed and the first list wraps as a static row.
 */
const css = `
@keyframes cap-marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
.cap-track { animation: cap-marquee 55s linear infinite; }
.cap-viewport:hover .cap-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .cap-track { animation: none; transform: none; flex-wrap: wrap; width: auto; row-gap: 0.5rem; }
  .cap-dup { display: none; }
  .cap-list { flex-wrap: wrap; flex-shrink: 1; row-gap: 0.5rem; }
  .cap-viewport { -webkit-mask-image: none !important; mask-image: none !important; }
}
`;

const fade = 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)';

function Items({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : 'Capabilities'}
      className={`flex shrink-0 items-center ${hidden ? 'cap-dup' : 'cap-list'}`}
    >
      {capabilities.map((item) => (
        <li key={item} className="flex shrink-0 items-center whitespace-nowrap">
          <span className="text-[15px] font-medium text-fg/80">{item}</span>
          <span
            aria-hidden="true"
            className="mx-6 h-1.5 w-1.5 rotate-45 rounded-[1px] bg-gradient-to-br from-accent-hover to-accent-2 opacity-70"
          />
        </li>
      ))}
    </ul>
  );
}

export function Capabilities() {
  return (
    <section aria-label="What we deliver" className="relative border-y border-white/[0.08] bg-white/[0.015]">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-hover/40 to-transparent"
      />
      <Container className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-8">
        <p className="shrink-0 text-xs font-semibold uppercase tracking-eyebrow text-accent-hover md:border-r md:border-white/10 md:pr-8">
          What we deliver
        </p>
        <div
          className="cap-viewport min-w-0 flex-1 overflow-hidden"
          style={{ maskImage: fade, WebkitMaskImage: fade }}
        >
          <div className="cap-track flex w-max">
            <Items />
            <Items hidden />
          </div>
        </div>
      </Container>
    </section>
  );
}
