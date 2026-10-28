'use client';

import { m, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  // Only set `delay` when given: an explicit delay overrides a parent Stagger's staggerChildren timing.
  visible: (delay?: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, ...(delay ? { delay } : {}) },
  }),
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'article';
};

/** Fades its children up 16px once, when they enter the viewport. */
export function Reveal({ children, className, delay, as = 'div' }: RevealProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      custom={delay}
    >
      {children}
    </Component>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: 'div' | 'ul';
};

/** Parent for staggered reveals; children should use `variants={fadeUp}` (e.g. an `m.li`). */
export function Stagger({ children, className, stagger = 0.06, as = 'div' }: StaggerProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Component>
  );
}
