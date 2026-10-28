import type { CSSProperties, ReactNode } from 'react';
import {
  AppWindow,
  Database,
  FileText,
  Film,
  FolderOpen,
  Gamepad2,
  Image as ImageIcon,
  LayoutDashboard,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react';

/*
 * Decorative hero composition: a portal dashboard (the hub) with floating glass cards for
 * the things Kling builds around it — asset library, code, games, secure access.
 * Pure HTML/CSS/SVG. Fixed aspect ratio, so it never shifts layout.
 * All copy is generic UI filler or taken from lib/content.ts (Data / Documents / Multimedia,
 * Arcade / iGaming / RMG). No numbers or business claims.
 */

const css = `
@keyframes hv-float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, var(--hv-amp, -10px), 0); }
}
@keyframes hv-dash {
  to { stroke-dashoffset: -240; }
}
@keyframes hv-ping {
  0% { transform: scale(1); opacity: 0.7; }
  80%, 100% { transform: scale(2.6); opacity: 0; }
}
@keyframes hv-draw {
  from { stroke-dashoffset: 600; }
  to { stroke-dashoffset: 0; }
}
.hv-float { animation: hv-float var(--hv-dur, 8s) ease-in-out var(--hv-delay, 0s) infinite; will-change: transform; }
.hv-pulse { stroke-dasharray: 14 226; animation: hv-dash var(--hv-dur, 4s) linear var(--hv-delay, 0s) infinite; }
.hv-ping { animation: hv-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite; }
.hv-draw { stroke-dasharray: 600; animation: hv-draw 2.2s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both; }
@media (prefers-reduced-motion: reduce) {
  .hv-float, .hv-pulse, .hv-ping, .hv-draw { animation: none; }
  .hv-pulse { stroke-dasharray: none; opacity: 0; }
  .hv-draw { stroke-dasharray: none; }
}
`;

const glass =
  'rounded-2xl border border-white/10 bg-surface/80 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07),0_30px_80px_-24px_rgba(0,0,0,0.75)]';

function Float({
  children,
  className = '',
  dur = 8,
  delay = 0,
  amp = -10,
}: {
  children: ReactNode;
  className?: string;
  dur?: number;
  delay?: number;
  amp?: number;
}) {
  const style = { '--hv-dur': `${dur}s`, '--hv-delay': `${delay}s`, '--hv-amp': `${amp}px` } as CSSProperties;
  return (
    <div className={`absolute ${className}`}>
      <div className="hv-float" style={style}>
        {children}
      </div>
    </div>
  );
}

function Dots() {
  return (
    <div className="flex gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
      <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
    </div>
  );
}

function Bar({ w, className = '' }: { w: string; className?: string }) {
  return <span className={`block h-1.5 rounded-full bg-white/10 ${className}`} style={{ width: w }} />;
}

const nav = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: FolderOpen, label: 'Assets' },
  { icon: AppWindow, label: 'Portals' },
  { icon: Users, label: 'Users' },
  { icon: Settings, label: 'Settings' },
];

function Dashboard() {
  return (
    <div className={`${glass} overflow-hidden`}>
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-3.5 py-2.5">
        <Dots />
        <div className="mx-auto flex h-5 w-[46%] items-center justify-center gap-1.5 rounded-md bg-white/[0.04] text-[9px] text-fg-muted/80">
          <ShieldCheck className="h-2.5 w-2.5 text-emerald-400/80" strokeWidth={2} />
          <span className="truncate">portal / overview</span>
        </div>
        <span className="w-[30px]" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-[27%] shrink-0 border-r border-white/[0.06] p-2.5 sm:block">
          <div className="mb-3 flex items-center gap-2 px-1.5">
            <span className="h-4 w-4 rounded-[5px] bg-gradient-to-br from-accent-hover to-accent-3" />
            <Bar w="52%" className="bg-white/20" />
          </div>
          <ul className="space-y-0.5">
            {nav.map(({ icon: Icon, label, active }) => (
              <li
                key={label}
                className={`flex items-center gap-2 rounded-md px-1.5 py-1.5 text-[10px] ${
                  active ? 'bg-accent/15 text-fg shadow-[inset_0_0_0_1px_rgb(var(--accent-hover)/0.18)]' : 'text-fg-muted/80'
                }`}
              >
                <Icon className={`h-3 w-3 ${active ? 'text-accent-hover' : ''}`} strokeWidth={1.75} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Main */}
        <div className="min-w-0 flex-1 p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-[12px] font-semibold text-fg">Overview</p>
              <Bar w="72px" className="mt-1.5 bg-white/[0.07]" />
            </div>
            <span className="rounded-md bg-accent px-2 py-1 text-[9px] font-medium text-on-accent shadow-[0_4px_14px_-4px_rgb(var(--accent)/0.8)]">
              Deploy
            </span>
          </div>

          {/* Mini tiles */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { c: 'rgb(var(--accent-hover))', d: 'M0 14 L8 10 L16 12 L24 6 L32 8 L40 3' },
              { c: 'rgb(var(--accent-2))', d: 'M0 12 L8 13 L16 8 L24 9 L32 4 L40 5' },
              { c: 'rgb(var(--accent-3))', d: 'M0 10 L8 6 L16 9 L24 7 L32 10 L40 4' },
            ].map((t, i) => (
              <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                <Bar w="60%" className="bg-white/[0.08]" />
                <div className="mt-2 flex items-end justify-between gap-1">
                  <Bar w="38%" className="h-2 bg-white/20" />
                  <svg viewBox="0 0 40 16" className="h-3.5 w-9" fill="none">
                    <path d={t.d} stroke={t.c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Area chart */}
          <div className="mt-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
            <div className="flex items-center justify-between">
              <Bar w="28%" className="bg-white/[0.1]" />
              <div className="flex gap-1">
                <span className="h-1.5 w-4 rounded-full bg-accent-hover/70" />
                <span className="h-1.5 w-4 rounded-full bg-accent-2/50" />
              </div>
            </div>
            <svg viewBox="0 0 300 80" className="mt-2 h-auto w-full" fill="none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="hv-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="rgb(var(--accent))" stopOpacity="0.45" />
                  <stop offset="1" stopColor="rgb(var(--accent))" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="hv-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="rgb(var(--accent-hover))" />
                  <stop offset="1" stopColor="rgb(var(--accent-soft))" />
                </linearGradient>
              </defs>
              {[20, 40, 60].map((y) => (
                <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4" />
              ))}
              <path
                d="M0 62 C 25 58, 40 48, 62 50 S 100 30, 125 36 S 165 52, 190 34 S 235 14, 258 20 S 290 10, 300 8 L300 80 L0 80 Z"
                fill="url(#hv-area)"
              />
              <path
                d="M0 68 C 30 66, 50 60, 75 62 S 120 50, 150 54 S 200 44, 225 46 S 275 34, 300 32"
                stroke="rgb(var(--accent-2))"
                strokeOpacity="0.45"
                strokeWidth="1.25"
                strokeDasharray="3 3"
              />
              <path
                className="hv-draw"
                d="M0 62 C 25 58, 40 48, 62 50 S 100 30, 125 36 S 165 52, 190 34 S 235 14, 258 20 S 290 10, 300 8"
                stroke="url(#hv-line)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="258" cy="20" r="3.5" fill="rgb(var(--bg))" stroke="rgb(var(--accent-soft))" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Rows */}
          <div className="mt-2.5 space-y-1.5">
            {[
              { w: '46%', chip: 'Active', tone: 'emerald' },
              { w: '34%', chip: 'Synced', tone: 'blue' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-2 rounded-md px-1 py-1">
                <span
                  className={`h-4 w-4 shrink-0 rounded-full ${
                    i === 0 ? 'bg-gradient-to-br from-accent-hover to-accent-2' : 'bg-gradient-to-br from-accent-3 to-accent-hover'
                  } opacity-80`}
                />
                <Bar w={r.w} className="bg-white/[0.12]" />
                <span className="ml-auto flex items-center gap-1 rounded-full border border-white/[0.08] px-1.5 py-0.5 text-[8.5px] text-fg-muted">
                  <span className={`h-1 w-1 rounded-full ${r.tone === 'emerald' ? 'bg-emerald-400' : 'bg-accent-hover'}`} />
                  {r.chip}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const files = [
  { icon: Database, name: 'records.db', tag: 'Data', color: 'rgb(var(--accent-hover))' },
  { icon: FileText, name: 'brand_guide.pdf', tag: 'Documents', color: 'rgb(var(--accent-soft))' },
  { icon: ImageIcon, name: 'campaign.png', tag: 'Multimedia', color: 'rgb(var(--accent-2))' },
  { icon: Film, name: 'product_reel.mp4', tag: 'Multimedia', color: 'rgb(var(--accent-3))' },
];

function AssetLibrary() {
  return (
    <div className={`${glass} p-3`}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-fg">Asset library</p>
        <span className="flex h-5 items-center gap-1 rounded-md bg-white/[0.04] px-1.5 text-[9px] text-fg-muted/80">
          <Search className="h-2.5 w-2.5" strokeWidth={2} />
          Search
        </span>
      </div>
      <ul className="mt-2.5 space-y-1">
        {files.map(({ icon: Icon, name, tag, color }, i) => (
          <li
            key={name}
            className={`flex items-center gap-2 rounded-lg px-1.5 py-1.5 ${
              i === 1 ? 'bg-white/[0.04] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]' : ''
            }`}
          >
            <span
              className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-white/[0.08]"
              style={{ background: `${color}1f` }}
            >
              <Icon className="h-3 w-3" style={{ color }} strokeWidth={1.75} />
            </span>
            <span className="min-w-0 truncate text-[10px] text-fg/90">{name}</span>
            <span className="ml-auto shrink-0 rounded-full bg-white/[0.05] px-1.5 py-0.5 text-[8.5px] text-fg-muted">
              {tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CodeCard() {
  const k = 'text-accent-3-soft'; // keyword
  const f = 'text-accent-soft'; // function
  const s = 'text-accent-2-soft'; // string
  const p = 'text-fg-muted/70'; // punctuation
  const lines: ReactNode[] = [
    <>
      <span className={k}>const</span> portal <span className={p}>=</span> <span className={f}>createPortal</span>
      <span className={p}>({'{'}</span>
    </>,
    <>
      {'  '}type<span className={p}>:</span> <span className={s}>&quot;customer&quot;</span>
      <span className={p}>,</span>
    </>,
    <>
      {'  '}assets<span className={p}>:</span> <span className={f}>library</span>
      <span className={p}>(</span>
      <span className={s}>&quot;media&quot;</span>
      <span className={p}>),</span>
    </>,
    <span key="close" className={p}>
      {'})'}
    </span>,
    <>
      portal<span className={p}>.</span>
      <span className={f}>deploy</span>
      <span className={p}>({'{ '}</span>access<span className={p}>:</span> <span className={s}>&quot;secure&quot;</span>
      <span className={p}>{' })'}</span>
    </>,
  ];
  return (
    <div className={`${glass} overflow-hidden`}>
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-3 py-2">
        <Dots />
        <span className="rounded bg-white/[0.05] px-1.5 py-0.5 font-mono text-[9px] text-fg-muted">portal.ts</span>
      </div>
      <pre className="overflow-hidden px-3 py-2.5 font-mono text-[9.5px] leading-[1.75] text-fg/90">
        {lines.map((l, i) => (
          <div key={i} className="flex whitespace-pre">
            <span className="mr-2.5 w-3 shrink-0 select-none text-right text-white/20">{i + 1}</span>
            <span>{l}</span>
          </div>
        ))}
      </pre>
      <div className="flex items-center gap-1.5 border-t border-white/[0.06] px-3 py-1.5 font-mono text-[9px] text-emerald-300/90">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        deployed
        <span className="ml-auto text-fg-muted/60">main</span>
      </div>
    </div>
  );
}

function GameCard() {
  return (
    <div className={`${glass} p-3`}>
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-3 to-accent shadow-[0_8px_20px_-6px_rgb(var(--accent-3)/0.7)]">
          <Gamepad2 className="h-4 w-4 text-white" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-fg">Game build</p>
          <Bar w="56px" className="mt-1 bg-white/[0.08]" />
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {['Arcade', 'iGaming', 'RMG'].map((c) => (
          <span
            key={c}
            className="rounded-full border border-accent-3/25 bg-accent-3/10 px-1.5 py-0.5 text-[9px] text-accent-3-soft"
          >
            {c}
          </span>
        ))}
      </div>
      <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
        <span className="block h-full w-[68%] rounded-full bg-gradient-to-r from-accent-3 to-accent-hover" />
      </div>
    </div>
  );
}

function SecurePill() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-surface/85 py-1.5 pl-2 pr-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07),0_16px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl">
      <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/10">
        <ShieldCheck className="h-3 w-3 text-emerald-300" strokeWidth={1.75} />
      </span>
      <span className="text-[10px] font-medium text-fg">Secure access</span>
      <span className="relative ml-0.5 flex h-1.5 w-1.5">
        <span className="hv-ping absolute inset-0 rounded-full bg-emerald-400" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
    </div>
  );
}

/*
 * Connectors in a 600x600 space (the container is square). They run from the dashboard (hub)
 * out to each card and sit behind everything, so only the stretch between panels shows.
 */
const paths = [
  { d: 'M300 280 C 250 360, 160 380, 130 470', delay: 0 }, // hub → asset library
  { d: 'M300 280 C 360 340, 440 360, 450 440', delay: 1.4 }, // hub → code
  { d: 'M300 280 C 380 200, 480 160, 520 70', delay: 2.2 }, // hub → game
  { d: 'M300 280 C 220 200, 100 120, 70 20', delay: 0.7 }, // hub → secure access
];

export function HeroVisual({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none relative select-none ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="relative aspect-square w-full">
        {/* Glow behind the stack */}
        <div
          className="absolute inset-[-12%] -z-10 blur-2xl"
          style={{
            background:
              'radial-gradient(ellipse 45% 40% at 55% 50%, rgb(var(--accent)/0.42), transparent 70%), radial-gradient(ellipse 30% 30% at 30% 75%, rgb(var(--accent-2)/0.2), transparent 70%), radial-gradient(ellipse 30% 30% at 80% 25%, rgb(var(--accent-3)/0.2), transparent 70%)',
          }}
        />

        <div className="absolute inset-0 [transform:perspective(1600px)_rotateY(-12deg)_rotateX(6deg)] [transform-origin:60%_50%]">
          {/* Connectors */}
          <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
            <defs>
              <linearGradient id="hv-wire" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="rgb(var(--accent-hover))" stopOpacity="0.5" />
                <stop offset="1" stopColor="rgb(var(--accent-hover))" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {paths.map((p, i) => (
              <g key={i}>
                <path d={p.d} stroke="url(#hv-wire)" strokeWidth="1" />
                <path
                  d={p.d}
                  className="hv-pulse"
                  stroke="rgb(var(--accent-soft))"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ '--hv-delay': `${p.delay}s`, '--hv-dur': '4.5s' } as CSSProperties}
                />
              </g>
            ))}
          </svg>

          {/* Hub: the portal dashboard */}
          <Float className="left-[4%] top-[9%] w-[92%] sm:left-[7%] sm:w-[82%]" dur={9} amp={-8}>
            <Dashboard />
          </Float>

          <Float className="right-0 top-[1%] xl:right-[-2%] hidden w-[31%] sm:block" dur={7} delay={-2} amp={-12}>
            <GameCard />
          </Float>

          <Float className="bottom-[3%] left-0 w-[66%] sm:w-[48%] xl:left-[-4%]" dur={8} delay={-4} amp={-10}>
            <AssetLibrary />
          </Float>

          <Float className="bottom-[9%] right-0 hidden w-[54%] sm:block xl:right-[-5%]" dur={10} delay={-1} amp={-9}>
            <CodeCard />
          </Float>

          <Float className="left-0 top-0 sm:left-[2%]" dur={6} delay={-3} amp={-6}>
            <SecurePill />
          </Float>
        </div>
      </div>
    </div>
  );
}
