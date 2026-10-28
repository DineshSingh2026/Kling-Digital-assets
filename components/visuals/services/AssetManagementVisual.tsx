import {
  ArrowDownUp,
  ChevronDown,
  Database,
  FileSpreadsheet,
  FileText,
  Film,
  Folder,
  FolderOpen,
  ImageIcon,
  Lock,
  Music,
  Search,
  type LucideIcon,
} from 'lucide-react';
import { glass, VisualFrame } from './VisualFrame';

type Tag = 'Data' | 'Documents' | 'Multimedia';

const tagStyle: Record<Tag, string> = {
  Data: 'border-accent-2/25 bg-accent-2/10 text-accent-2-soft',
  Documents: 'border-accent/30 bg-accent/10 text-accent-soft',
  Multimedia: 'border-accent-3/30 bg-accent-3/10 text-accent-3-soft',
};

const iconStyle: Record<Tag, string> = {
  Data: 'text-accent-2-soft',
  Documents: 'text-accent-soft',
  Multimedia: 'text-accent-3-soft',
};

const files: { name: string; tag: Tag; Icon: LucideIcon; wideOnly?: boolean }[] = [
  { name: 'records.db', tag: 'Data', Icon: Database },
  { name: 'contract.pdf', tag: 'Documents', Icon: FileText },
  { name: 'hero_shot.png', tag: 'Multimedia', Icon: ImageIcon },
  { name: 'metrics.csv', tag: 'Data', Icon: FileSpreadsheet, wideOnly: true },
  { name: 'launch.mp4', tag: 'Multimedia', Icon: Film },
  { name: 'policy.docx', tag: 'Documents', Icon: FileText },
  { name: 'theme.wav', tag: 'Multimedia', Icon: Music },
  { name: 'ledger.db', tag: 'Data', Icon: Database, wideOnly: true },
];

const folders: { label: Tag; dot: string }[] = [
  { label: 'Data', dot: 'bg-accent-2' },
  { label: 'Documents', dot: 'bg-accent' },
  { label: 'Multimedia', dot: 'bg-accent-3' },
];

/** Asset library: search + sort bar, folder tree, tagged file tiles and a "Secured" badge. */
export function AssetManagementVisual() {
  return (
    <VisualFrame>
      <div className={`absolute inset-x-4 -bottom-4 top-4 flex flex-col overflow-hidden ${glass}`}>
        {/* Toolbar */}
        <div className="flex h-9 shrink-0 items-center gap-2 border-b border-white/[0.06] px-3">
          <div className="flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2 text-[10px] text-fg-muted transition-colors duration-300 group-hover:border-accent/30">
            <Search className="h-3 w-3 shrink-0" strokeWidth={1.75} />
            <span className="truncate">Search assets</span>
            <span className="ml-auto h-2.5 w-px bg-accent-hover svc-blink" />
          </div>
          <div className="svc-wide h-6 shrink-0 items-center gap-1 rounded-md border border-white/[0.08] px-2 text-[10px] text-fg-muted">
            <ArrowDownUp className="h-3 w-3" strokeWidth={1.75} />
            Name
          </div>
          {/* room for the floating Secured badge */}
          <span className="w-[76px] shrink-0" />
        </div>

        <div className="flex min-h-0 flex-1">
          {/* Folder tree */}
          <div className="svc-wide w-[128px] shrink-0 flex-col gap-1 border-r border-white/[0.06] p-2.5 text-[10px]">
            <div className="flex items-center gap-1.5 text-fg/90">
              <ChevronDown className="h-3 w-3 text-fg-muted" strokeWidth={1.75} />
              <FolderOpen className="h-3.5 w-3.5 text-accent-hover" strokeWidth={1.75} />
              Library
            </div>
            {folders.map((f, i) => (
              <div
                key={f.label}
                className={`ml-2 flex items-center gap-1.5 rounded-md px-1.5 py-1 transition-colors duration-300 ${
                  i === 2 ? 'bg-white/[0.04] text-fg/90 group-hover:bg-accent/10' : 'text-fg-muted'
                }`}
              >
                <Folder className="h-3 w-3 shrink-0" strokeWidth={1.75} />
                <span className="truncate">{f.label}</span>
                <span className={`ml-auto h-1.5 w-1.5 shrink-0 rounded-full ${f.dot}`} />
              </div>
            ))}
            <div className="ml-3 mt-1 space-y-1.5 px-1.5">
              <div className="h-1 w-14 rounded-full bg-white/[0.06]" />
              <div className="h-1 w-10 rounded-full bg-white/[0.06]" />
            </div>
          </div>

          {/* File grid */}
          <div className="svc-cols grid min-w-0 flex-1 content-start gap-2 p-2.5">
            {files.map(({ name, tag, Icon, wideOnly }, i) => (
              <div
                key={name}
                className={`${wideOnly ? 'svc-wide-grid' : ''} min-w-0 rounded-lg border p-2 transition-[transform,border-color,background-color] duration-300 group-hover:-translate-y-0.5 ${
                  i === 2
                    ? 'border-accent/30 bg-accent/[0.07] group-hover:border-accent/60'
                    : 'border-white/[0.07] bg-white/[0.025]'
                }`}
                style={{ transitionDelay: `${i * 25}ms` }}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.05]">
                  <Icon className={`h-3 w-3 ${iconStyle[tag]}`} strokeWidth={1.75} />
                </span>
                <p className="mt-1.5 truncate font-mono text-[9px] leading-tight text-fg/85">{name}</p>
                <span
                  className={`mt-1.5 inline-block max-w-full truncate rounded border px-1.5 py-px align-top text-[8.5px] font-medium leading-tight ${tagStyle[tag]}`}
                >
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secured badge */}
      <div className="absolute right-[26px] top-[22px] flex items-center gap-1.5 rounded-full border border-white/10 bg-surface/95 py-1 pl-1.5 pr-2.5 text-[10px] font-medium text-fg shadow-[0_8px_24px_-6px_rgba(0,0,0,0.8)] transition-[transform,box-shadow,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-[0_8px_28px_-6px_rgb(var(--accent)/0.55)]">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent/20">
          <Lock className="h-2.5 w-2.5 text-accent-hover" strokeWidth={2} />
        </span>
        Secured
        <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] shadow-[0_0_6px_#34D399]" />
      </div>
    </VisualFrame>
  );
}
