import { Gamepad2 } from 'lucide-react';
import { VisualFrame } from './VisualFrame';

const genres = ['App games', 'Arcade', 'iGaming', 'RMG'] as const;

/** 1-unit pixel helper for the SVG scene (viewBox units). */
function Px({ x, y, w = 1, h = 1, c }: { x: number; y: number; w?: number; h?: number; c: string }) {
  return <rect x={x} y={y} width={w} height={h} fill={c} />;
}

const stars: [number, number][] = [
  [6, 5], [17, 11], [29, 4], [44, 9], [58, 3], [71, 12], [84, 6], [93, 14], [37, 16], [65, 19],
];

/** Landscape handheld console with a pixel-art platformer, a Gamepad2 badge and genre chips. */
export function GameVisual() {
  return (
    <VisualFrame>
      <div className="absolute inset-x-0 top-4 flex justify-center">
        <div className="relative">
          {/* Console body */}
          <div className="relative flex h-[118px] w-[244px] items-center gap-3 rounded-[26px] border border-white/10 bg-gradient-to-b from-surface to-surface px-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_24px_50px_-18px_rgba(0,0,0,0.85)] transition-[transform,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_24px_60px_-18px_rgb(var(--accent)/0.45)]">
            {/* D-pad */}
            <div className="relative h-9 w-9 shrink-0">
              <span className="absolute left-1/2 top-0 h-full w-3 -translate-x-1/2 rounded-[3px] bg-white/[0.12]" />
              <span className="absolute left-0 top-1/2 h-3 w-full -translate-y-1/2 rounded-[3px] bg-white/[0.12]" />
              <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface" />
            </div>

            {/* Screen */}
            <div className="relative h-[90px] flex-1 overflow-hidden rounded-xl border border-black/40 bg-bg-deep shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
              <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" shapeRendering="crispEdges">
                <defs>
                  <linearGradient id="svc-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="rgb(var(--accent-deep))" />
                    <stop offset="1" stopColor="rgb(var(--accent-deep))" />
                  </linearGradient>
                </defs>
                <rect width="100" height="60" fill="url(#svc-sky)" />
                {stars.map(([x, y]) => (
                  <Px key={`${x}-${y}`} x={x} y={y} c="rgb(var(--accent-pale)/0.55)" />
                ))}
                {/* distant hills */}
                <path d="M0 44 H8 V40 H16 V36 H26 V40 H34 V44 H46 V38 H54 V34 H62 V38 H70 V44 H80 V40 H90 V37 H100 V60 H0 Z" fill="rgb(var(--accent-deep))" opacity="0.55" />
                {/* floating platform */}
                <Px x={58} y={30} w={16} h={3} c="rgb(var(--accent-3))" />
                <Px x={58} y={33} w={16} h={1} c="rgb(var(--accent-3))" />
                {/* ground */}
                <Px x={0} y={50} w={100} h={10} c="rgb(var(--accent-strong-hover))" />
                <Px x={0} y={50} w={100} h={2} c="rgb(var(--accent-hover))" />
                {Array.from({ length: 10 }).map((_, i) => (
                  <Px key={i} x={i * 10 + 4} y={54} w={2} h={2} c="rgb(var(--accent-deep))" />
                ))}
                {/* enemy */}
                <Px x={80} y={46} w={5} h={4} c="rgb(var(--accent-3-soft))" />
                <Px x={81} y={47} w={1} h={1} c="rgb(var(--bg-deep))" />
                <Px x={83} y={47} w={1} h={1} c="rgb(var(--bg-deep))" />
              </svg>

              {/* Coins (HTML so they can bob / glow) */}
              <div className="absolute left-[60%] top-[30%] flex gap-[6px]">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="svc-bob block h-[5px] w-[5px] bg-accent-2-soft shadow-[0_0_6px_rgb(var(--accent-2)/0.7)] transition-shadow duration-300 group-hover:shadow-[0_0_10px_rgb(var(--accent-2)/1)]"
                    style={{ animationDelay: `${i * 180}ms` }}
                  />
                ))}
              </div>

              {/* Player sprite: jumps on hover */}
              <svg
                viewBox="0 0 6 8"
                shapeRendering="crispEdges"
                className="absolute bottom-[16.6%] left-[22%] h-[13px] w-[10px] transition-transform duration-300 ease-out group-hover:-translate-y-[10px]"
              >
                <rect x="1" y="0" width="4" height="2" fill="rgb(var(--accent-soft))" />
                <rect x="0" y="2" width="6" height="3" fill="#F8FAFC" />
                <rect x="4" y="3" width="1" height="1" fill="rgb(var(--bg))" />
                <rect x="1" y="5" width="4" height="1" fill="rgb(var(--accent))" />
                <rect x="0" y="6" width="2" height="2" fill="rgb(var(--accent))" />
                <rect x="4" y="6" width="2" height="2" fill="rgb(var(--accent))" />
              </svg>

              {/* HUD */}
              <div className="absolute inset-x-1.5 top-1 flex items-center justify-between font-mono text-[7px] leading-none tracking-wider text-accent-pale/80">
                <span>SCORE 004200</span>
                <span className="flex gap-[2px]">
                  <span className="h-[4px] w-[4px] bg-accent-hover" />
                  <span className="h-[4px] w-[4px] bg-accent-hover" />
                  <span className="h-[4px] w-[4px] bg-accent-hover/30" />
                </span>
              </div>
              {/* scanlines */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_3px)]" />
            </div>

            {/* A / B buttons */}
            <div className="relative h-9 w-9 shrink-0">
              <span className="absolute right-0 top-0.5 h-4 w-4 rounded-full bg-accent shadow-[0_0_10px_-1px_rgb(var(--accent)/0.8)] transition-shadow duration-300 group-hover:shadow-[0_0_14px_1px_rgb(var(--accent)/0.9)]" />
              <span className="absolute bottom-0.5 left-0 h-4 w-4 rounded-full bg-accent-3/80" />
            </div>
          </div>

          {/* Gamepad badge */}
          <span className="absolute -right-3 -top-2 flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-accent-deep text-accent-hover shadow-[0_8px_20px_-6px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]">
            <Gamepad2 className="h-3.5 w-3.5" strokeWidth={1.75} />
          </span>
        </div>
      </div>

      {/* Genre chips */}
      <div className="absolute inset-x-3 top-[150px] flex flex-wrap justify-center gap-1.5">
        {genres.map((g, i) => (
          <span
            key={g}
            className={`rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors duration-300 ${
              i === 1
                ? 'border-accent/40 bg-accent/15 text-fg group-hover:border-accent/70'
                : 'border-white/10 bg-white/[0.04] text-fg-muted group-hover:text-fg/85'
            }`}
          >
            {g}
          </span>
        ))}
      </div>
    </VisualFrame>
  );
}
