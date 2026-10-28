import type { CSSProperties } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { HeroVisual } from '@/components/visuals/HeroVisual';
import { hero, site } from '@/lib/content';

/*
 * The entrance stagger is plain CSS (not Framer) so it starts with the first paint of the
 * server-rendered HTML instead of waiting for hydration — the H1 is the LCP element and must
 * never sit at opacity 0 while JS loads. 0.6s ease-out, 16px rise, 80ms between items.
 */
const heroCss = `
@keyframes hero-in {
  /* 0.01, not 0: Chrome skips opacity-0 text for LCP, which would push LCP behind the JS bundle. */
  from { opacity: 0.01; transform: translate3d(0, 16px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hero-fade {
  from { opacity: 0; transform: translate3d(0, 24px, 0) scale(0.98); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes hero-aurora-a {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(-6%, 5%, 0) scale(1.12); }
}
@keyframes hero-aurora-b {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1.05); }
  50% { transform: translate3d(8%, -4%, 0) scale(0.95); }
}
.hero-in {
  animation: hero-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i, 0) * 80ms);
}
.hero-fade {
  animation: hero-fade 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.24s both;
}
.hero-aurora-a { animation: hero-aurora-a 26s ease-in-out infinite; }
.hero-aurora-b { animation: hero-aurora-b 32s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .hero-in, .hero-fade, .hero-aurora-a, .hero-aurora-b { animation: none; }
}
`;

const step = (i: number) => ({ '--i': i }) as CSSProperties;

const gridMask = 'radial-gradient(ellipse 75% 65% at 60% 35%, #000 10%, transparent 72%)';
const beamMask = 'linear-gradient(to bottom, #000 0%, transparent 85%)';
const noise =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-[var(--nav-height)]"
    >
      <style dangerouslySetInnerHTML={{ __html: heroCss }} />

      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 select-none">
        {/* Aurora */}
        <div
          className="hero-aurora-a absolute -top-[30%] right-[-20%] h-[900px] w-[900px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgb(var(--accent)/0.28) 0%, rgb(var(--accent)/0) 65%)' }}
        />
        <div
          className="hero-aurora-b absolute right-[10%] top-[30%] h-[620px] w-[620px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgb(var(--accent-3)/0.16) 0%, rgb(var(--accent-3)/0) 65%)' }}
        />
        <div
          className="hero-aurora-b absolute -left-[18%] bottom-[-25%] h-[680px] w-[680px] rounded-full blur-3xl [animation-delay:-14s]"
          style={{ background: 'radial-gradient(circle, rgb(var(--accent-2)/0.10) 0%, rgb(var(--accent-2)/0) 65%)' }}
        />

        {/* Light beam from the top, behind the visual */}
        <div
          className="absolute left-1/2 top-0 h-[85%] w-[140%] -translate-x-1/2 lg:left-[72%] lg:w-[90%]"
          style={{
            background:
              'conic-gradient(from 180deg at 50% 0%, transparent 155deg, rgb(var(--accent-hover)/0.16) 172deg, rgb(var(--accent-soft)/0.22) 180deg, rgb(var(--accent-hover)/0.16) 188deg, transparent 205deg)',
            maskImage: beamMask,
            WebkitMaskImage: beamMask,
          }}
        />
        <div className="absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-hover/50 to-transparent lg:left-[72%] lg:w-[40%]" />

        {/* Grid */}
        <div className="bg-grid absolute inset-0" style={{ maskImage: gridMask, WebkitMaskImage: gridMask }} />

        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: noise }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: noise }} />

        {/* Fade into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <Container className="grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] lg:gap-10 lg:py-24 xl:gap-14">
        <div className="max-w-[640px]">
          <div className="hero-in" style={step(0)}>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>
          <h1
            id="hero-title"
            className="hero-in mt-6 text-balance text-[40px] leading-[1.08] tracking-heading md:text-[56px] lg:text-[52px] xl:text-[58px]"
            style={step(1)}
          >
            {site.tagline}
          </h1>
          <p className="hero-in mt-6 max-w-[560px] text-lg text-fg-muted" style={step(2)}>
            {site.heroSupport}
          </p>
          <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={step(3)}>
            <ButtonLink href={hero.primaryCta.href} size="lg" arrow className="w-full sm:w-auto">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary" size="lg" className="w-full sm:w-auto">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="hero-fade mx-auto w-full max-w-[560px] lg:max-w-none xl:-mr-8">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
