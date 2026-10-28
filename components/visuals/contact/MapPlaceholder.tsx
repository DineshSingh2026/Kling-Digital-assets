/**
 * Stylised dark map shown while the Google Maps iframe is not mounted / still loading.
 * Abstract streets, blocks and a ring road around a pulsing accent pin — pure SVG, no data.
 */

const KEYFRAMES = `
@keyframes kda-map-ping { 0% { transform: scale(.4); opacity: .8; } 100% { transform: scale(2.6); opacity: 0; } }
@keyframes kda-map-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
@keyframes kda-map-dash { to { stroke-dashoffset: -60; } }
`;

const blocks: [number, number, number, number][] = [
  [60, 40, 70, 46], [150, 34, 54, 58], [222, 46, 80, 40], [420, 30, 66, 52], [506, 44, 84, 42],
  [40, 128, 62, 70], [124, 140, 76, 50], [440, 120, 58, 64], [520, 132, 70, 48],
  [70, 262, 84, 52], [176, 276, 56, 66], [400, 270, 74, 50], [494, 262, 60, 70], [572, 300, 48, 54],
  [90, 340, 64, 40], [250, 330, 58, 46], [350, 342, 70, 38],
];

const minorX = Array.from({ length: 18 }, (_, i) => i * 40 - 20);
const minorY = Array.from({ length: 12 }, (_, i) => i * 40 - 20);

export function MapPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      <style>{KEYFRAMES}</style>
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className="h-full w-full" fill="none">
        <defs>
          <radialGradient id="kda-map-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.28" />
            <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="kda-map-vignette" cx="50%" cy="50%" r="70%">
            <stop offset="55%" stopColor="rgb(var(--bg))" stopOpacity="0" />
            <stop offset="100%" stopColor="rgb(var(--bg))" stopOpacity="0.85" />
          </radialGradient>
          <linearGradient id="kda-map-hwy" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(var(--accent-hover))" stopOpacity="0.05" />
            <stop offset="50%" stopColor="rgb(var(--accent-hover))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(var(--accent-3))" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <rect width="640" height="400" fill="rgb(var(--surface))" />

        {/* Minor street grid, slightly rotated */}
        <g transform="rotate(-14 320 200)" stroke="white" strokeOpacity="0.035">
          {minorX.map((x) => (
            <line key={`x${x}`} x1={x} y1="-120" x2={x} y2="520" />
          ))}
          {minorY.map((y) => (
            <line key={`y${y}`} x1="-120" y1={y} x2="760" y2={y} />
          ))}
        </g>

        {/* Blocks */}
        <g fill="white" fillOpacity="0.025" stroke="white" strokeOpacity="0.04">
          {blocks.map(([x, y, w, h]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="4" />
          ))}
        </g>

        {/* Major roads */}
        <g stroke="white" strokeLinecap="round">
          <path d="M -20 230 C 140 210, 230 250, 330 205 S 520 150, 660 170" strokeOpacity="0.08" strokeWidth="9" />
          <path d="M -20 230 C 140 210, 230 250, 330 205 S 520 150, 660 170" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="6 8" />
          <path d="M 250 -20 C 270 90, 300 150, 322 200 S 360 330, 380 420" strokeOpacity="0.07" strokeWidth="7" />
          <path d="M 600 -20 C 560 120, 470 230, 420 420" strokeOpacity="0.05" strokeWidth="5" />
          <path d="M 40 -20 C 90 120, 120 260, 60 420" strokeOpacity="0.04" strokeWidth="4" />
        </g>

        {/* Highway */}
        <path d="M -20 110 C 160 140, 300 90, 440 110 S 600 150, 660 120" stroke="url(#kda-map-hwy)" strokeWidth="3.5" strokeLinecap="round" />
        <path
          d="M -20 110 C 160 140, 300 90, 440 110 S 600 150, 660 120"
          stroke="rgb(var(--accent-pale))"
          strokeOpacity="0.5"
          strokeWidth="1"
          strokeDasharray="2 28"
          strokeLinecap="round"
          style={{ animation: 'kda-map-dash 3s linear infinite' }}
        />

        {/* Ring road around the district */}
        <circle cx="320" cy="200" r="64" stroke="white" strokeOpacity="0.07" strokeWidth="5" />
        <circle cx="320" cy="200" r="64" stroke="rgb(var(--accent-hover))" strokeOpacity="0.18" strokeDasharray="3 9" />

        <circle cx="320" cy="200" r="130" fill="url(#kda-map-glow)" />
        <rect width="640" height="400" fill="url(#kda-map-vignette)" />

        {/* Pin */}
        <g style={{ transformOrigin: '320px 200px', transformBox: 'view-box', animation: 'kda-map-ping 2.6s ease-out infinite' }}>
          <circle cx="320" cy="200" r="16" fill="rgb(var(--accent))" fillOpacity="0.35" />
        </g>
        <ellipse cx="320" cy="202" rx="9" ry="3" fill="black" fillOpacity="0.5" />
        <g style={{ animation: 'kda-map-bob 3s ease-in-out infinite' }}>
          <path
            d="M320 200 C 320 200, 304 184, 304 172 a16 16 0 1 1 32 0 C 336 184, 320 200, 320 200 Z"
            fill="rgb(var(--accent))"
            stroke="rgb(var(--accent-pale))"
            strokeOpacity="0.6"
          />
          <circle cx="320" cy="172" r="5.5" fill="rgb(var(--bg))" />
        </g>
      </svg>
    </div>
  );
}
