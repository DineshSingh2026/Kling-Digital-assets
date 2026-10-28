import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

/** Elevated surface with a hairline border. `interactive` adds the hover lift + brighter border. */
export function Card({ children, className = '', interactive = false }: CardProps) {
  const hover = interactive
    ? 'transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_12px_40px_-12px_rgb(var(--accent)/0.35)]'
    : '';
  return (
    <div className={`rounded-card border border-border bg-bg-elevated/60 p-6 sm:p-8 ${hover} ${className}`}>
      {children}
    </div>
  );
}

/** 44px rounded square for a line icon. */
export function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent-hover">
      {children}
    </span>
  );
}
