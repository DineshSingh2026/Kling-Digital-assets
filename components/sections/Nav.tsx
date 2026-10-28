'use client';

import { AnimatePresence, m } from 'framer-motion';
import { Mail, Menu, Phone, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { buttonClasses } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { Container } from '@/components/ui/Container';
import { contact, hero, navLinks, site } from '@/lib/content';

type SectionId = (typeof navLinks)[number]['id'];

const SHEET_ID = 'mobile-nav-sheet';
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Tracks which section crosses the upper-middle band of the viewport. */
function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('home');

  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Map<string, boolean>();
    const pick = () => {
      // At the very bottom the last section may never reach the band — force it.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }
      const first = ids.find((id) => visible.get(id));
      if (first) setActive(first);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        pick();
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    window.addEventListener('scroll', pick, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', pick);
    };
  }, []);

  return active;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Body scroll lock, Escape, focus trap and focus return.
  useEffect(() => {
    if (!open) {
      if (wasOpen.current) toggleRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;

    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const focusFirst = window.requestAnimationFrame(() => {
      sheetRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !sheetRef.current) return;
      const focusables = Array.from(sheetRef.current.querySelectorAll<HTMLElement>('a[href], button'));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      window.cancelAnimationFrame(focusFirst);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  // Close the sheet if the viewport grows to desktop.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const frosted = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[var(--nav-height)] border-b transition-[background-color,border-color,backdrop-filter] duration-200 ${
          frosted
            ? 'border-[rgba(255,255,255,0.08)] bg-[rgb(var(--bg)/0.72)] backdrop-blur-md backdrop-saturate-150'
            : 'border-transparent bg-transparent'
        }`}
      >
        <Container className="flex h-full items-center justify-between gap-6">
          <a href="#home" className="flex shrink-0 items-center rounded-md">
            <Logo size={42} priority />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      aria-current={isActive ? 'location' : undefined}
                      className={`relative block rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'
                      }`}
                    >
                      {link.label}
                      {isActive ? (
                        <m.span
                          layoutId="nav-underline"
                          aria-hidden="true"
                          className="absolute inset-x-4 -bottom-px h-px rounded-full bg-accent"
                          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                        />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3 xl:gap-6">
            <div className="hidden flex-col items-end leading-tight xl:flex">
              <span className="text-xs text-fg-muted">Need help? {hero.secondaryCta.label}</span>
              <a
                href={contact.phoneHref}
                className="rounded-sm text-sm font-medium tabular-nums text-fg transition-colors duration-200 hover:text-accent-hover"
              >
                {contact.phone}
              </a>
            </div>
            <a href={hero.secondaryCta.href} className={buttonClasses('primary', 'md', 'hidden sm:inline-flex')}>
              {hero.secondaryCta.label}
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={SHEET_ID}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-fg transition-colors duration-200 hover:bg-[rgba(255,255,255,0.06)] lg:hidden"
            >
              {open ? (
                <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap `position: fixed`. */}
      <AnimatePresence>
        {open ? (
          <m.div key="mobile-nav" className="fixed inset-0 z-40 lg:hidden">
            <m.div
              aria-hidden="true"
              className="absolute inset-0 bg-[rgb(var(--bg-deep)/0.7)] backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />
            <m.div
              ref={sheetRef}
              id={SHEET_ID}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-[rgba(255,255,255,0.08)] bg-bg-elevated px-6 pb-8 pt-[calc(var(--nav-height)+24px)] shadow-[0_0_80px_rgba(0,0,0,0.5)]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: EASE_OUT }}
            >
              <nav aria-label="Mobile">
                <ul className="flex flex-col">
                  {navLinks.map((link) => {
                    const isActive = active === link.id;
                    return (
                      <li key={link.id} className="border-b border-[rgba(255,255,255,0.08)]">
                        <a
                          href={link.href}
                          onClick={close}
                          aria-current={isActive ? 'location' : undefined}
                          className={`flex items-center justify-between rounded-md py-4 font-display text-2xl font-semibold tracking-heading transition-colors duration-200 ${
                            isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'
                          }`}
                        >
                          {link.label}
                          {isActive ? <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" /> : null}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-auto flex flex-col gap-4 pt-8">
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center gap-3 rounded-md text-fg-muted transition-colors duration-200 hover:text-fg"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 text-accent-hover" strokeWidth={1.75} />
                  <span className="tabular-nums">{contact.phone}</span>
                </a>
                <a
                  href={contact.emailHref}
                  className="inline-flex items-center gap-3 rounded-md text-fg-muted transition-colors duration-200 hover:text-fg"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 text-accent-hover" strokeWidth={1.75} />
                  <span className="break-all">{contact.email}</span>
                </a>
                <a
                  href={hero.secondaryCta.href}
                  onClick={close}
                  className={buttonClasses('primary', 'lg', 'mt-4 w-full')}
                >
                  {hero.secondaryCta.label}
                </a>
                <div className="mt-2 sm:hidden">
                  <ThemeSwitcher placement="inline" />
                </div>
              </div>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
