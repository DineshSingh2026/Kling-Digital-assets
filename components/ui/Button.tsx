import { ArrowRight } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent-strong text-on-accent shadow-[0_8px_24px_-8px_rgb(var(--accent)/0.6)] hover:bg-accent-strong-hover',
  secondary: 'border border-border-strong bg-white/[0.02] text-fg hover:border-white/30 hover:bg-white/[0.06]',
  ghost: 'text-fg-muted hover:text-fg',
};

const sizes: Record<Size, string> = {
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
};

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
      strokeWidth={1.75}
    />
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
};

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  arrow = false,
  className = '',
  children,
  ...props
}: CommonProps & ComponentPropsWithoutRef<'a'>) {
  return (
    <a className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </a>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  arrow = false,
  className = '',
  children,
  type = 'button',
  ...props
}: CommonProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}
