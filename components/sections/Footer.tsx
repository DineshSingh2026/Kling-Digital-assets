import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/ui/Container';
import { contact, navLinks, site } from '@/lib/content';

const exploreLinks = navLinks.filter((link) => link.id !== 'home');

const headingClass = 'font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-fg';
const linkClass = 'text-fg-muted transition-colors duration-200 hover:text-fg';

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden pt-14 text-sm lg:pt-20">
      {/* Gradient hairline + glow along the top edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 select-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute left-1/2 top-0 h-px w-[min(560px,80%)] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-hover to-transparent" />
        <div className="absolute left-1/2 top-0 h-32 w-[min(720px,100%)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(var(--accent)/0.22),transparent)] blur-xl" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-accent/[0.05] to-transparent" />
      </div>

      <Container>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.2fr)] md:gap-8">
          <div className="flex flex-col gap-5">
            <a href="#home" className="inline-flex w-fit">
              <Logo size={48} />
            </a>
            <p className="max-w-xs leading-relaxed text-fg-muted">{site.footerLine}</p>
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-fg-muted shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#34D399] shadow-[0_0_8px_#34D399]" />
              Dubai Silicon Oasis, UAE
            </p>
          </div>

          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className={headingClass}>
              Explore
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingClass}>Contact</h2>
            <address className="mt-5 flex flex-col gap-3 not-italic text-fg-muted">
              <span className="text-fg">{contact.company}</span>
              <span>
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
              <a href={contact.phoneHref} className={`${linkClass} w-fit`}>
                {contact.phone}
              </a>
              <a href={contact.emailHref} className={`${linkClass} w-fit break-all`}>
                {contact.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-fg-muted/70">{site.legalName}</p>
        </div>
      </Container>

      {/* Oversized outlined wordmark, cropped by the footer's bottom edge */}
      <div aria-hidden="true" className="pointer-events-none mt-6 select-none overflow-hidden lg:mt-10">
        <p className="-mb-[0.2em] bg-gradient-to-b from-white/[0.07] via-white/[0.025] to-transparent bg-clip-text text-center font-display text-[clamp(96px,25vw,340px)] font-semibold leading-[0.8] tracking-[-0.045em] text-transparent">

          KLING
        </p>
      </div>
    </footer>
  );
}
