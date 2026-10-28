'use client';

import { m } from 'framer-motion';
import { Code2, Compass, Database, Gamepad2, LayoutDashboard, type LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';
import { Container } from '@/components/ui/Container';
import { fadeUp, Stagger } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  AssetManagementVisual,
  ConsultingVisual,
  GameVisual,
  PortalVisual,
  ServiceVisualStyles,
  SoftwareVisual,
} from '@/components/visuals/services';
import { services } from '@/lib/content';

type ServiceIconName = (typeof services.items)[number]['icon'];

const serviceIcons: Record<ServiceIconName, LucideIcon> = {
  Database,
  LayoutDashboard,
  Compass,
  Code2,
  Gamepad2,
};

/** Illustration per service, keyed by the content icon so copy order can change safely. */
const serviceVisuals: Record<ServiceIconName, ComponentType> = {
  Database: AssetManagementVisual,
  LayoutDashboard: PortalVisual,
  Compass: ConsultingVisual,
  Code2: SoftwareVisual,
  Gamepad2: GameVisual,
};

/**
 * Bento placement:
 * - mobile: 1 column
 * - md: 2 columns; the 5th card spans both and lays out horizontally
 * - lg: 6-column track → two wide cards (3+3), then three (2+2+2)
 */
function placement(index: number) {
  if (index < 2) return 'lg:col-span-3';
  if (index === 4) return 'md:col-span-2 lg:col-span-2';
  return 'lg:col-span-2';
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="relative isolate overflow-hidden py-16 lg:py-24">
      <ServiceVisualStyles />

      {/* Faint dot field, masked toward the centre */}
      <div
        aria-hidden="true"
        className="bg-dots pointer-events-none absolute inset-0 -z-10 [-webkit-mask-image:radial-gradient(ellipse_65%_55%_at_50%_55%,#000_15%,transparent_75%)] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_55%,#000_15%,transparent_75%)]"
      />
      {/* Soft glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[520px] w-[min(1000px,100%)] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[360px] w-[360px] rounded-full bg-accent-3/[0.05] blur-3xl"
      />
      {/* Hairline at the top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-px max-w-content bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <Container>
        <SectionHeading
          id="services-heading"
          eyebrow={services.eyebrow}
          title={services.heading}
          intro={services.intro}
        />

        <Stagger as="ul" className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6 lg:mt-16 lg:grid-cols-6">
          {services.items.map((item, index) => {
            const Icon = serviceIcons[item.icon];
            const Visual = serviceVisuals[item.icon];
            const horizontalAtMd = index === 4;
            return (
              <m.li key={item.title} variants={fadeUp} className={`flex ${placement(index)}`}>
                <div
                  className={`group relative isolate flex h-full w-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.02] p-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_60px_-30px_rgba(0,0,0,0.6)] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_24px_60px_-24px_rgb(var(--accent)/0.35)] ${
                    horizontalAtMd ? 'md:grid md:grid-cols-2 md:items-center lg:flex lg:items-stretch' : ''
                  }`}
                >
                  {/* Corner accent glow on hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-accent/20 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <Visual />

                  <div className="flex flex-1 flex-col px-4 pb-5 pt-6 sm:px-5 sm:pb-6 lg:px-4 xl:px-5">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] border border-accent/20 bg-accent/10 text-accent-hover">
                        <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <h3 className="text-lg leading-snug xl:text-xl">{item.title}</h3>
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{item.description}</p>
                  </div>
                </div>
              </m.li>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
