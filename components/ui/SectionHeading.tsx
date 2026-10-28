import { Reveal } from './Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-eyebrow text-accent-hover">{children}</p>
  );
}

export function SectionHeading({ eyebrow, title, intro, id, align = 'left', className = '' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start';
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="text-3xl leading-tight sm:text-4xl lg:text-[44px]">
        {title}
      </h2>
      {intro ? <p className="max-w-prose text-lg text-fg-muted">{intro}</p> : null}
    </Reveal>
  );
}
