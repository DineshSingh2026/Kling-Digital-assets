'use client';

import { m, type Variants } from 'framer-motion';
import { ShieldCheck, Target, Workflow, type LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { fadeUp, Reveal, Stagger } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AboutVisual } from '@/components/visuals/about/AboutVisual';
import { about } from '@/lib/content';

type PillarIconName = (typeof about.pillars)[number]['icon'];

const pillarIcons: Record<PillarIconName, LucideIcon> = {
  Target,
  ShieldCheck,
  Workflow,
};

/** fadeUp with a slight delay so the visual lands just after the copy. */
const visualReveal: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 } },
};

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative isolate overflow-hidden py-16 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/2 -z-10 h-[640px] w-[min(900px,120%)] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.10),transparent)]"
      />
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
          <div>
            <SectionHeading id="about-heading" eyebrow={about.eyebrow} title={about.heading} />

            <Reveal className="mt-6 max-w-prose space-y-4 text-base leading-relaxed text-fg-muted sm:text-lg">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>

            <Stagger as="ul" className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {about.pillars.map((pillar) => {
                const Icon = pillarIcons[pillar.icon];
                return (
                  <m.li
                    key={pillar.title}
                    variants={fadeUp}
                    className="group relative flex gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur transition-colors duration-300 hover:border-accent/30 sm:flex-col sm:gap-3 sm:p-5 lg:flex-row lg:items-center lg:gap-4 lg:px-5 lg:py-4"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-hover/50 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-gradient-to-b from-accent/20 to-accent/5 text-accent-hover shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold leading-snug">{pillar.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-fg-muted">{pillar.text}</p>
                    </div>
                  </m.li>
                );
              })}
            </Stagger>
          </div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={visualReveal}
          >
            <AboutVisual />
          </m.div>
        </div>
      </Container>
    </section>
  );
}
