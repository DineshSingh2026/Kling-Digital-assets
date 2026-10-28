import { Code2, Compass, Database, Gamepad2, LayoutDashboard, MapPin, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { contact, services } from '@/lib/content';

/**
 * "Capability orbit": the five services (from lib/content) as glass nodes on an orbit around a
 * central Kling hub, with data pulses travelling inward along fine gradient connectors.
 * Geometry is authored in a 560 × 600 viewBox; HTML nodes are placed in % of the same box and
 * sized in container-query units, so the whole thing scales as one piece down to 320px.
 */

const W = 560;
const H = 600;
const CX = 280;
const CY = 280;
const NODE_R = 200;

type ServiceIconName = (typeof services.items)[number]['icon'];

const serviceIcons: Record<ServiceIconName, LucideIcon> = {
  Database,
  LayoutDashboard,
  Compass,
  Code2,
  Gamepad2,
};

// Rounded so server and client render identical SVG coordinates (avoids hydration mismatches).
const round = (v: number) => Math.round(v * 100) / 100;

const nodes = services.items.map((service, i) => {
  const angle = ((-90 + i * 72) * Math.PI) / 180;
  const x = round(CX + NODE_R * Math.cos(angle));
  const y = round(CY + NODE_R * Math.sin(angle));
  return { ...service, Icon: serviceIcons[service.icon], x, y };
});

/** Tick marks around the outer ring, every 5°, longer every 30°. */
const ticks = Array.from({ length: 72 }, (_, i) => {
  const a = (i * 5 * Math.PI) / 180;
  const major = i % 6 === 0;
  const r1 = 258;
  const r2 = major ? 268 : 263;
  return {
    x1: round(CX + r1 * Math.cos(a)),
    y1: round(CY + r1 * Math.sin(a)),
    x2: round(CX + r2 * Math.cos(a)),
    y2: round(CY + r2 * Math.sin(a)),
    major,
  };
});

const pct = (v: number, total: number) => `${((v / total) * 100).toFixed(3)}%`;

const KEYFRAMES = `
@keyframes kda-spin { to { transform: rotate(360deg); } }
@keyframes kda-spin-rev { to { transform: rotate(-360deg); } }
@keyframes kda-pulse-travel { from { stroke-dashoffset: 18; } to { stroke-dashoffset: -190; } }
@keyframes kda-breathe { 0%, 100% { opacity: .55; transform: scale(1); } 50% { opacity: 1; transform: scale(1.06); } }
@keyframes kda-ping { 0% { transform: scale(.6); opacity: .7; } 100% { transform: scale(2.4); opacity: 0; } }
`;

const orbit: CSSProperties = { transformOrigin: `${CX}px ${CY}px`, transformBox: 'view-box' };

export function AboutVisual() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative isolate mx-auto aspect-[560/600] w-full max-w-[560px] select-none [container-type:inline-size]"
    >
      <style>{KEYFRAMES}</style>

      {/* Background glow + faint dot field */}
      <div className="absolute inset-[20%] -z-10 rounded-full bg-accent/20 blur-[70px]" />
      <div className="absolute right-[4%] top-[6%] -z-10 h-[38%] w-[38%] rounded-full bg-accent-3/20 blur-[60px]" />
      <div className="absolute bottom-[10%] left-[2%] -z-10 h-[32%] w-[32%] rounded-full bg-accent-2/[0.12] blur-[60px]" />
      <div className="bg-dots absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(closest-side,black_40%,transparent)]" />

      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none">
        <defs>
          <radialGradient id="kda-hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.22" />
            <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="kda-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent-soft))" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.06" />
            <stop offset="100%" stopColor="rgb(var(--accent-3))" stopOpacity="0.35" />
          </linearGradient>
          {nodes.map((n, i) => (
            <linearGradient
              key={n.title}
              id={`kda-link-${i}`}
              gradientUnits="userSpaceOnUse"
              x1={n.x}
              y1={n.y}
              x2={CX}
              y2={CY}
            >
              <stop offset="0%" stopColor="rgb(var(--accent-hover))" stopOpacity="0.55" />
              <stop offset="100%" stopColor="rgb(var(--accent-hover))" stopOpacity="0.05" />
            </linearGradient>
          ))}
          <filter id="kda-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
        </defs>

        <circle cx={CX} cy={CY} r="150" fill="url(#kda-hub-glow)" />

        {/* Outer instrument ring with ticks */}
        <circle cx={CX} cy={CY} r="262" stroke="white" strokeOpacity="0.05" />
        <g stroke="white">
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              strokeOpacity={t.major ? 0.18 : 0.07}
            />
          ))}
        </g>

        {/* Node orbit */}
        <circle cx={CX} cy={CY} r={NODE_R} stroke="url(#kda-ring)" />
        <g style={{ ...orbit, animation: 'kda-spin 90s linear infinite' }}>
          <circle cx={CX} cy={CY} r="236" stroke="white" strokeOpacity="0.07" strokeDasharray="2 7" />
        </g>

        {/* Inner orbit */}
        <g style={{ ...orbit, animation: 'kda-spin-rev 60s linear infinite' }}>
          <circle cx={CX} cy={CY} r="118" stroke="white" strokeOpacity="0.09" />
          <path
            d={`M ${CX - 118} ${CY} A 118 118 0 0 1 ${CX} ${CY - 118}`}
            stroke="rgb(var(--accent-hover))"
            strokeOpacity="0.6"
            strokeLinecap="round"
          />
          <circle cx={CX} cy={CY - 118} r="3" fill="rgb(var(--accent-pale))" />
          <circle cx={CX} cy={CY + 118} r="2" fill="rgb(var(--accent-2))" fillOpacity="0.8" />
        </g>

        {/* Connectors + travelling pulses */}
        {nodes.map((n, i) => {
          const d = `M ${n.x.toFixed(2)} ${n.y.toFixed(2)} L ${CX} ${CY}`;
          return (
            <g key={n.title}>
              <path d={d} stroke={`url(#kda-link-${i})`} />
              <path
                d={d}
                stroke="rgb(var(--accent-soft))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="14 400"
                filter="url(#kda-soft)"
                style={{ animation: `kda-pulse-travel 4.8s ${(i * 0.95).toFixed(2)}s cubic-bezier(.45,0,.55,1) infinite`, strokeDashoffset: 18 }}
              />
              <path
                d={d}
                stroke="rgb(var(--accent-pale))"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeDasharray="10 400"
                style={{ animation: `kda-pulse-travel 4.8s ${(i * 0.95).toFixed(2)}s cubic-bezier(.45,0,.55,1) infinite`, strokeDashoffset: 18 }}
              />
            </g>
          );
        })}
      </svg>

      {/* Hub */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: pct(CX, W), top: pct(CY, H), width: 'clamp(92px, 26cqw, 148px)' }}
      >
        <div
          className="absolute -inset-[18%] -z-10 rounded-full bg-[conic-gradient(from_0deg,rgb(var(--accent)/0.0),rgb(var(--accent)/0.35),rgb(var(--accent-3)/0.0),rgb(var(--accent-2)/0.22),rgb(var(--accent)/0.0))] blur-xl"
          style={{ animation: 'kda-spin 24s linear infinite' }}
        />
        <div className="relative flex aspect-square w-full flex-col items-center justify-center gap-[9%] rounded-[24%] border border-white/15 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02)_45%,rgb(var(--accent)/0.08))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_60px_-10px_rgb(var(--accent)/0.45)] backdrop-blur-md">
          <Image src="/brand/kling-mark.png" alt="" width={113} height={192} className="h-[46%] w-auto drop-shadow-[0_8px_24px_rgba(240,135,46,0.35)]" />
          <span className="flex items-center gap-1.5 font-mono text-[length:clamp(7.5px,1.7cqw,10px)] uppercase tracking-[0.14em] text-fg-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] shadow-[0_0_8px_#34D399]" />
            IT Consultancy
          </span>
        </div>
      </div>

      {/* Service nodes */}
      {nodes.map((n, i) => (
        <div
          key={n.title}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: pct(n.x, W), top: pct(n.y, H), width: 'clamp(40px, 11cqw, 62px)' }}
        >
          <span
            className="absolute inset-0 -z-10 rounded-[30%] bg-accent/40 blur-lg"
            style={{ animation: `kda-breathe 4.8s ${(i * 0.95 + 3.2).toFixed(2)}s ease-in-out infinite` }}
          />
          <div className="flex aspect-square w-full items-center justify-center rounded-[30%] border border-white/[0.14] bg-[linear-gradient(160deg,rgba(255,255,255,0.10),rgba(255,255,255,0.025))] text-accent-hover shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_16px_40px_-14px_rgba(0,0,0,0.8)] backdrop-blur-md">
            <n.Icon className="h-[44%] w-[44%]" strokeWidth={1.6} />
          </div>
          <p className="absolute left-1/2 top-full mt-[0.55em] w-[26cqw] -translate-x-1/2 text-balance text-center text-[length:clamp(9.5px,2.25cqw,12.5px)] font-medium leading-tight text-fg/85">
            {n.title}
          </p>
        </div>
      ))}

      {/* Location chip */}
      <div className="absolute bottom-[1.5%] left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-bg/60 py-[0.55em] pl-[0.6em] pr-[1em] text-[length:clamp(10.5px,2.3cqw,13px)] text-fg-muted shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_16px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <span className="relative flex h-[1.9em] w-[1.9em] items-center justify-center rounded-full bg-accent/15 text-accent-hover ring-1 ring-accent/30">
            <span
              className="absolute inset-0 rounded-full bg-accent/30"
              style={{ animation: 'kda-ping 2.8s ease-out infinite' }}
            />
            <MapPin className="relative h-[1.05em] w-[1.05em]" strokeWidth={1.75} />
          </span>
          <span>
            <span className="text-fg">Dubai Silicon Oasis</span>
            <span className="mx-1.5 text-fg-muted/60">·</span>
            {contact.address.street.replace('Dubai Silicon Oasis, ', '')}
          </span>
        </div>
      </div>
    </div>
  );
}
