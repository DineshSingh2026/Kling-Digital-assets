import { Cloud, Compass, Network, Rocket, ScanSearch, Server, type LucideIcon } from 'lucide-react';
import { VisualFrame } from './VisualFrame';

const phases: { label: string; Icon: LucideIcon }[] = [
  { label: 'Assess', Icon: ScanSearch },
  { label: 'Strategy', Icon: Compass },
  { label: 'Infrastructure', Icon: Server },
  { label: 'Implement', Icon: Rocket },
];

const ACTIVE = 1;

const archNodes: { label: string; Icon: LucideIcon; main?: boolean }[] = [
  { label: 'Server', Icon: Server },
  { label: 'Cloud', Icon: Cloud, main: true },
  { label: 'Network', Icon: Network },
];

function PhaseLabel({ show, active, index, label }: { show: boolean; active: boolean; index: number; label: string }) {
  return (
    <span className={`flex h-4 items-center gap-1 whitespace-nowrap text-[10px] font-medium ${show ? '' : 'invisible'}`}>
      <span className="font-mono text-[8px] text-fg-muted/60">0{index + 1}</span>
      <span className={active ? 'text-fg' : 'text-fg-muted'}>{label}</span>
    </span>
  );
}

/** Strategy roadmap (Assess → Strategy → Infrastructure → Implement) above a small architecture diagram. */
export function ConsultingVisual() {
  return (
    <VisualFrame>
      {/* Roadmap — labels alternate above/below the track so long phase names never collide */}
      <div className="absolute inset-x-3 top-5">
        <div className="relative grid grid-cols-4">
          {/* Track + travelling pulse, spanning node centres (12.5% → 87.5%); 16px label + 6px gap + 16px half-node */}
          <div className="absolute left-[12.5%] right-[12.5%] top-[38px] h-px bg-gradient-to-r from-accent/70 via-accent-3/50 to-accent-2/40">
            <span className="svc-travel absolute -top-[3px] h-[7px] w-10 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent-soft)/0.95),rgb(var(--accent)/0.4)_60%,transparent)] blur-[1px]" />
          </div>

          {phases.map(({ label, Icon }, i) => {
            const active = i === ACTIVE;
            const below = i % 2 === 0;
            return (
              <div key={label} className="flex flex-col items-center">
                <PhaseLabel show={!below} active={active} index={i} label={label} />
                <span
                  className={`relative my-1.5 flex h-8 w-8 items-center justify-center rounded-full border transition-[transform,box-shadow,border-color] duration-300 group-hover:-translate-y-0.5 ${
                    active
                      ? 'border-accent/60 bg-accent-deep text-accent-hover shadow-[0_0_0_4px_rgb(var(--accent)/0.12),0_0_20px_-2px_rgb(var(--accent)/0.7)] group-hover:shadow-[0_0_0_5px_rgb(var(--accent)/0.18),0_0_26px_0_rgb(var(--accent)/0.85)]'
                      : 'border-white/[0.12] bg-surface text-fg/75 group-hover:border-accent/35'
                  }`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
                <PhaseLabel show={below} active={active} index={i} label={label} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture */}
      <div className="absolute inset-x-3 top-[110px] flex justify-center">
        <div className="flex items-center rounded-xl border border-white/[0.07] bg-white/[0.02] p-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
          {archNodes.map(({ label, Icon, main }, i) => (
            <div key={label} className="flex items-center">
              {i > 0 ? <span className="svc-flow h-px w-4 opacity-70 transition-opacity duration-300 group-hover:opacity-100 sm:w-6" /> : null}
              <div
                className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-[10px] transition-transform duration-300 ${
                  main
                    ? 'border-accent/40 bg-accent/10 text-fg group-hover:-translate-y-0.5'
                    : 'border-white/10 bg-surface text-fg-muted'
                }`}
              >
                <Icon className={`h-3 w-3 ${main ? 'text-accent-hover' : 'text-accent-2-soft'}`} strokeWidth={1.75} />
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton line: the roadmap document fading out */}
      <div className="absolute inset-x-8 top-[166px] flex items-center justify-center gap-2">
        <div className="h-1 w-16 rounded-full bg-white/[0.07]" />
        <div className="h-1 w-8 rounded-full bg-accent/25" />
        <div className="h-1 w-12 rounded-full bg-white/[0.07]" />
      </div>
    </VisualFrame>
  );
}
