import { LayoutDashboard, Lock, MessageSquare, Settings, ShoppingBag, ShoppingCart, Users } from 'lucide-react';
import { glass, VisualFrame, WindowDots } from './VisualFrame';

const segments = ['Enterprise', 'Customer', 'Ecommerce'] as const;
const nav = [LayoutDashboard, MessageSquare, Users, ShoppingCart, Settings];

/** Browser window with a portal: segment switcher, sidebar, a collaboration thread and a checkout card. */
export function PortalVisual() {
  return (
    <VisualFrame>
      <div className={`absolute inset-x-4 -bottom-4 top-4 flex flex-col overflow-hidden ${glass}`}>
        {/* Browser chrome */}
        <div className="flex h-7 shrink-0 items-center gap-3 border-b border-white/[0.06] px-3">
          <WindowDots />
          <div className="mx-auto flex h-5 w-full max-w-[220px] items-center justify-center gap-1 rounded-md bg-white/[0.04] px-2 text-[9px] text-fg-muted">
            <Lock className="h-2.5 w-2.5 shrink-0" strokeWidth={2} />
            <span className="truncate">portal.company.com</span>
          </div>
          <span className="w-[30px] shrink-0" />
        </div>

        <div className="flex min-h-0 flex-1 gap-2.5 p-2.5 pb-0">
          {/* Sidebar */}
          <div className="svc-wide w-8 shrink-0 flex-col items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] py-2">
            {nav.map((Icon, i) => (
              <span
                key={i}
                className={`flex h-6 w-6 items-center justify-center rounded-md ${
                  i === 0 ? 'bg-accent/15 text-accent-hover' : 'text-fg-muted/70'
                }`}
              >
                <Icon className="h-3 w-3" strokeWidth={1.75} />
              </span>
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2.5">
            {/* Segmented control: indicator slides to the next portal type on hover */}
            <div className="relative flex w-fit rounded-lg border border-white/[0.06] bg-white/[0.03] p-0.5 text-[10px]">
              <span className="absolute inset-y-0.5 left-0.5 w-[74px] rounded-md border border-accent/30 bg-accent/15 shadow-[0_0_16px_-4px_rgb(var(--accent)/0.6)] transition-transform duration-300 ease-out group-hover:translate-x-[74px]" />
              {segments.map((s) => (
                <span key={s} className="relative w-[74px] py-[3px] text-center text-fg/85">
                  {s}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 items-start gap-2.5">
              {/* Collaboration / communication */}
              <div className="flex min-w-0 flex-col gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] p-2">
                <div className="flex items-center gap-1.5 text-[9px] text-fg-muted">
                  <MessageSquare className="h-3 w-3 text-accent-2-soft" strokeWidth={1.75} />
                  Team thread
                  <span className="ml-auto flex -space-x-1">
                    <span className="h-3 w-3 rounded-full border border-surface bg-accent-2/70" />
                    <span className="h-3 w-3 rounded-full border border-surface bg-accent-3/80" />
                    <span className="h-3 w-3 rounded-full border border-surface bg-accent/80" />
                  </span>
                </div>
                <div className="flex items-end gap-1.5">
                  <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-accent-2/60" />
                  <div className="w-[70%] space-y-1 rounded-lg rounded-bl-sm bg-white/[0.06] p-1.5">
                    <div className="h-1 w-full rounded-full bg-white/20" />
                    <div className="h-1 w-2/3 rounded-full bg-white/15" />
                  </div>
                </div>
                <div className="ml-auto w-[62%] rounded-lg rounded-br-sm bg-accent/70 p-1.5 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <div className="h-1 w-full rounded-full bg-white/60" />
                </div>
                <div className="flex gap-0.5 pl-5">
                  <span className="h-1 w-1 rounded-full bg-fg-muted/60" />
                  <span className="h-1 w-1 rounded-full bg-fg-muted/40" />
                  <span className="h-1 w-1 rounded-full bg-fg-muted/25" />
                </div>
              </div>

              {/* Transactions */}
              <div className="flex min-w-0 flex-col gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] p-2">
                <div className="flex items-center gap-1.5 text-[9px] text-fg-muted">
                  <ShoppingCart className="h-3 w-3 text-accent-3-soft" strokeWidth={1.75} />
                  Checkout
                </div>
                {[0].map((r) => (
                  <div key={r} className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/[0.05]">
                      <ShoppingBag className="h-2.5 w-2.5 text-fg-muted" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className={`h-1 rounded-full bg-white/20 ${r ? 'w-1/2' : 'w-3/4'}`} />
                      <div className="h-1 w-1/3 rounded-full bg-white/10" />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-2 border-t border-white/[0.06] pt-2">
                  <div className="h-1 w-8 rounded-full bg-white/15" />
                  <span className="rounded-md bg-accent px-2 py-0.5 text-[9px] font-medium text-on-accent shadow-[0_0_14px_-2px_rgb(var(--accent)/0.7)] transition-shadow duration-300 group-hover:shadow-[0_0_18px_0_rgb(var(--accent)/0.9)]">
                    Pay
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}
