import { ArrowUpRight, Building2, Mail, MapPin, Phone, Send } from 'lucide-react';
import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { contact, contactSection } from '@/lib/content';
import { ContactForm } from './ContactForm';
import { MapEmbed } from './MapEmbed';

const ICON_PROPS = { 'aria-hidden': true, className: 'h-[18px] w-[18px]', strokeWidth: 1.75 } as const;

const glass =
  'border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur';

function DetailRow({
  icon,
  label,
  children,
  linked = false,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  /** The row contains a link stretched over the whole row (via the `stretchedLink` class). */
  linked?: boolean;
}) {
  return (
    <li
      className={`group relative flex items-start gap-4 px-4 py-4 sm:px-5 ${linked ? 'transition-colors duration-200 hover:bg-white/[0.03]' : ''}`}
    >
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-gradient-to-b from-accent/20 to-accent/5 text-accent-hover shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
        {icon}
      </span>
      <div className="min-w-0 flex-1 pt-px">
        <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-fg-muted">{label}</p>
        <div className="mt-1 break-words text-[15px] text-fg">{children}</div>
      </div>
      {linked ? (
        <ArrowUpRight
          aria-hidden="true"
          className="mt-2.5 h-4 w-4 shrink-0 text-fg-muted/60 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-hover"
          strokeWidth={1.75}
        />
      ) : null}
    </li>
  );
}

const linkClass =
  'transition-colors duration-200 group-hover:text-accent-hover after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-accent-hover';

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden border-b border-border bg-gradient-to-b from-accent/[0.05] via-accent/[0.015] to-transparent py-20 lg:py-28"
    >
      {/* Band background: hairline glow, light beam, aurora, faint grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 select-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-hover/60 to-transparent" />
        <div className="absolute left-1/2 top-0 h-24 w-[min(640px,90%)] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(var(--accent-hover)/0.35),transparent)] blur-2xl" />
        <div className="absolute left-1/2 top-0 h-[620px] w-[min(1200px,160%)] -translate-x-1/2 bg-[conic-gradient(from_150deg_at_50%_0%,transparent_0deg,rgb(var(--accent-hover)/0.12)_30deg,transparent_60deg)] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="animate-drift absolute -left-[10%] top-[18%] h-[420px] w-[min(620px,90%)] rounded-full bg-accent/[0.14] blur-[110px]" />
        <div className="animate-drift absolute -right-[8%] bottom-[8%] h-[380px] w-[min(560px,80%)] rounded-full bg-accent-3/[0.10] blur-[110px] [animation-delay:-10s]" />
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
      </div>

      <Container>
        <SectionHeading
          id="contact-heading"
          eyebrow={contactSection.eyebrow}
          title={contactSection.heading}
          intro={contactSection.sub}
        />

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
          <Reveal className="flex flex-col gap-6">
            <address className="not-italic">
              <ul className={`divide-y divide-white/[0.06] overflow-hidden rounded-2xl ${glass}`}>
                <DetailRow icon={<Building2 {...ICON_PROPS} />} label="Company">
                  {contact.company}
                </DetailRow>
                <DetailRow icon={<MapPin {...ICON_PROPS} />} label="Address">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </DetailRow>
                <DetailRow icon={<Phone {...ICON_PROPS} />} label="Phone" linked>
                  <a href={contact.phoneHref} className={linkClass}>
                    {contact.phone}
                  </a>
                </DetailRow>
                <DetailRow icon={<Mail {...ICON_PROPS} />} label="Email" linked>
                  <a href={contact.emailHref} className={linkClass}>
                    {contact.email}
                  </a>
                </DetailRow>
              </ul>
            </address>

            <MapEmbed />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_40px_100px_-30px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:p-8 lg:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent-hover/70 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-[90px]"
              />

              <div className="mb-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-white/[0.06] pb-6">
                <p className="flex items-center gap-3 text-sm font-medium text-fg">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-accent/25 bg-gradient-to-b from-accent/20 to-accent/5 text-accent-hover shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                  >
                    <Send className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  Send us a message
                </p>
                <p className="flex items-center gap-2 font-mono text-xs text-fg-muted">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#34D399] shadow-[0_0_8px_#34D399]" />
                  {contact.email}
                </p>
              </div>

              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
