import { Database, KeyRound } from 'lucide-react';
import { glass, VisualFrame, WindowDots } from './VisualFrame';

const k = 'text-accent-3-soft'; // keyword (violet)
const f = 'text-accent-soft'; // function / property (blue)
const s = 'text-accent-2-soft'; // string (cyan)
const p = 'text-fg-muted'; // punctuation

/** Each line is a list of [text, colourClass] tokens. */
const code: [string, string][][] = [
  [['import', k], [' db ', 'text-fg/85'], ['from', k], [" './db'", s], [';', p]],
  [],
  [['async ', k], ['function ', k], ['list', f], ['() {', p]],
  [['  return ', k], ['db.', 'text-fg/85'], ['assets', f]],
  [['    .', p], ['findMany', f], ['({', p]],
  [['      where', f], [': { ', p], ['owner', 'text-fg/85'], [' },', p]],
  [['    });', p]],
  [['}', p]],
];

const tables: { name: string; fields: { name: string; type: string; key?: boolean; link?: boolean }[] }[] = [
  {
    name: 'assets',
    fields: [
      { name: 'id', type: 'uuid', key: true },
      { name: 'name', type: 'text' },
      { name: 'owner_id', type: 'fk', link: true },
    ],
  },
  {
    name: 'users',
    fields: [
      { name: 'id', type: 'uuid', key: true, link: true },
      { name: 'email', type: 'text' },
    ],
  },
];

/** Code editor alongside a mini database schema (assets → users). */
export function SoftwareVisual() {
  return (
    <VisualFrame>
      {/* Editor */}
      <div
        className={`absolute -bottom-4 left-4 right-14 top-4 overflow-hidden transition-transform duration-300 group-hover:-translate-x-1 ${glass}`}
      >
        <div className="flex h-8 items-center gap-3 border-b border-white/[0.06] px-3">
          <WindowDots />
          <span className="rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[9px] text-fg/80">assets.ts</span>
          <span className="svc-wide font-mono text-[9px] text-fg-muted/60">schema.sql</span>
        </div>
        <pre className="px-3 py-2.5 font-mono text-[9px] leading-[16px]">
          {code.map((line, i) => (
            <div key={i} className="flex whitespace-pre">
              <span className="mr-3 w-3 shrink-0 select-none text-right text-fg-muted/40">{i + 1}</span>
              {line.map(([t, c], j) => (
                <span key={j} className={c}>
                  {t}
                </span>
              ))}
              {i === 5 ? <span className="svc-blink ml-px inline-block h-[13px] w-[1.5px] translate-y-[1px] bg-accent-hover" /> : null}
            </div>
          ))}
        </pre>
      </div>

      {/* Schema */}
      <div className="absolute right-3 top-9 flex w-[104px] flex-col gap-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-0.5">
        {/* Relation line: assets.owner_id → users.id */}
        <svg className="absolute -left-3 top-[58px] h-[62px] w-4 overflow-visible" viewBox="0 0 16 62" fill="none">
          <path
            d="M14 0 H5 a3 3 0 0 0 -3 3 V59 a3 3 0 0 0 3 3 H14"
            stroke="rgb(var(--accent-hover)/0.6)"
            strokeWidth="1"
            className="svc-dash transition-[stroke] duration-300"
          />
          <circle cx="14" cy="0" r="1.75" fill="rgb(var(--accent-hover))" />
          <circle cx="14" cy="62" r="1.75" fill="rgb(var(--accent-2))" />
        </svg>

        {tables.map((t) => (
          <div
            key={t.name}
            className="overflow-hidden rounded-lg border border-white/10 bg-surface/95 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_14px_30px_-12px_rgba(0,0,0,0.85)] transition-colors duration-300 group-hover:border-accent/30"
          >
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.03] px-2 py-1">
              <Database className="h-2.5 w-2.5 text-accent-hover" strokeWidth={2} />
              <span className="font-mono text-[9px] font-medium text-fg/90">{t.name}</span>
            </div>
            {t.fields.map((fl) => (
              <div key={fl.name} className="flex h-4 items-center gap-1 px-2 font-mono text-[8.5px]">
                {fl.key ? (
                  <KeyRound className="h-2 w-2 shrink-0 text-accent-2-soft" strokeWidth={2} />
                ) : (
                  <span className="w-2 shrink-0" />
                )}
                <span className={fl.link ? 'text-fg/90' : 'text-fg-muted'}>{fl.name}</span>
                <span className="ml-auto text-fg-muted/50">{fl.type}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}
