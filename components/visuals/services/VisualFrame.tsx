import type { ReactNode } from 'react';

/**
 * Keyframes + container-query helpers shared by every service illustration.
 * Rendered once by the Services section. CSS animations are neutralised globally
 * under prefers-reduced-motion (see globals.css).
 */
const css = `
.svc-stage{container-type:inline-size}
.svc-wide{display:none}
@container (min-width:420px){.svc-wide{display:flex}.svc-narrow{display:none}}
.svc-wide-grid{display:none}
@container (min-width:420px){.svc-wide-grid{display:block}}
.svc-cols{grid-template-columns:repeat(3,minmax(0,1fr))}
@container (min-width:500px){.svc-cols{grid-template-columns:repeat(4,minmax(0,1fr))}}
@keyframes svc-travel{0%{left:0;opacity:0}12%{opacity:1}88%{opacity:1}100%{left:100%;opacity:0}}
@keyframes svc-flow{to{background-position:24px 0}}
@keyframes svc-blink{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes svc-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
@keyframes svc-dash{to{stroke-dashoffset:-24}}
.svc-travel{animation:svc-travel 4.5s cubic-bezier(.45,0,.55,1) infinite}
.svc-flow{background-image:linear-gradient(90deg,rgb(var(--accent-hover)/.7) 0 6px,transparent 6px 12px);background-size:12px 1px;animation:svc-flow 2.4s linear infinite}
.svc-blink{animation:svc-blink 1.1s steps(1) infinite}
.svc-bob{animation:svc-bob 2.6s ease-in-out infinite}
.svc-dash{stroke-dasharray:4 4;animation:svc-dash 2.4s linear infinite}
`;

export function ServiceVisualStyles() {
  return <style>{css}</style>;
}

/** Fixed-height illustration well: tinted gradient, faint grid, hover glow and a soft bottom fade. */
export function VisualFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-[208px] select-none overflow-hidden rounded-xl border border-white/[0.06] bg-surface ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_0%,rgb(var(--accent)/0.14),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_10%,rgb(var(--accent-hover)/0.16),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,#000_30%,transparent_80%)] [-webkit-mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,#000_30%,transparent_80%)]" />
      <div className="svc-stage relative h-full">{children}</div>
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-surface to-transparent" />
    </div>
  );
}

/** Glass panel used for windows inside the illustrations. */
export const glass =
  'rounded-xl border border-white/10 bg-surface/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur';

export function WindowDots() {
  return (
    <span className="flex shrink-0 gap-1">
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
    </span>
  );
}
