'use client';

import { Building2, Mail, MessageSquare, User, type LucideIcon } from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { contact } from '@/lib/content';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

const labelClass = 'mb-2 block text-sm font-medium text-fg';
const fieldClass =
  'peer block w-full rounded-xl border border-white/10 bg-bg/50 pl-11 pr-4 text-[15px] text-fg shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] placeholder:text-fg-muted/50 transition-[border-color,box-shadow,background-color] duration-200 hover:border-white/20 focus:border-accent/70 focus:bg-bg/70 focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_0_0_4px_rgb(var(--accent)/0.16),0_0_32px_-8px_rgb(var(--accent)/0.6)] focus:outline-none focus-visible:outline-none disabled:opacity-60';

/** Positions a decorative icon inside the field; it lights up when the field has focus. */
function Field({ icon: Icon, children, top = false }: { icon: LucideIcon; children: ReactNode; top?: boolean }) {
  return (
    <div className="relative">
      {children}
      <Icon
        aria-hidden="true"
        strokeWidth={1.75}
        className={`pointer-events-none absolute left-4 h-4 w-4 text-fg-muted/60 transition-colors duration-200 peer-focus:text-accent-hover ${top ? 'top-[15px]' : 'top-1/2 -translate-y-1/2'}`}
      />
    </div>
  );
}

function buildMailto(data: FormData) {
  const get = (key: string) => String(data.get(key) ?? '').trim();
  const name = get('name');
  const company = get('company');
  const body = [
    `Name: ${name}`,
    `Email: ${get('email')}`,
    company ? `Company: ${company}` : null,
    '',
    get('message'),
  ]
    .filter((line) => line !== null)
    .join('\n');
  const subject = `Website enquiry from ${name}`;
  return `${contact.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const submitting = status === 'submitting';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!endpoint) {
      window.location.href = buildMailto(data);
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" aria-busy={submitting}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <Field icon={User}>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              disabled={submitting}
              className={`${fieldClass} h-12`}
            />
          </Field>
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <Field icon={Mail}>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
              disabled={submitting}
              className={`${fieldClass} h-12`}
            />
          </Field>
        </div>
      </div>

      <div>
        <label htmlFor="contact-company" className={labelClass}>
          Company <span className="font-normal text-fg-muted">(optional)</span>
        </label>
        <Field icon={Building2}>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            disabled={submitting}
            className={`${fieldClass} h-12`}
          />
        </Field>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <Field icon={MessageSquare} top>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="Tell us what you're working on…"
            disabled={submitting}
            className={`${fieldClass} min-h-[152px] resize-y py-3 leading-relaxed`}
          />
        </Field>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" arrow disabled={submitting} className="w-full shrink-0 whitespace-nowrap sm:w-auto">
          {submitting ? 'Sending…' : 'Send message'}
        </Button>

        <p aria-live="polite" role="status" className="text-balance text-sm sm:max-w-xs sm:text-right">
          {status === 'success' ? (
            <span className="text-fg">Thanks, we&apos;ll be in touch shortly.</span>
          ) : status === 'error' ? (
            <span className="text-fg-muted">
              Something went wrong. Please email us at{' '}
              <a href={contact.emailHref} className="text-accent-hover underline underline-offset-4 hover:text-fg">
                {contact.email}
              </a>
              .
            </span>
          ) : !endpoint ? (
            <span className="text-fg-muted">Opens your email app with your message ready to send.</span>
          ) : null}
        </p>
      </div>
    </form>
  );
}
