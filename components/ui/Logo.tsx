import Image from 'next/image';

type LogoProps = {
  /** Height of the flame mark in px; the wordmark scales with it. */
  size?: number;
  className?: string;
  priority?: boolean;
};

/**
 * Brand lockup: the flame mark (from the supplied logo) plus the wordmark set in HTML so it stays
 * sharp and readable at nav size. Brand colours are fixed: the logo does not change with the theme.
 * The full raster lockup lives at /brand/kling-logo.png for places that need a single image.
 */
export function Logo({ size = 36, className = '', priority = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center ${className}`} style={{ gap: size * 0.28 }}>
      <Image
        src="/brand/kling-mark.png"
        alt=""
        width={113}
        height={192}
        priority={priority}
        style={{ height: size, width: 'auto' }}
      />
      <span className="flex flex-col justify-center leading-none" style={{ gap: size * 0.08 }}>
        <span
          className="bg-clip-text font-display font-semibold uppercase text-transparent"
          style={{
            fontSize: size * 0.56,
            letterSpacing: '0.04em',
            backgroundImage: 'linear-gradient(180deg, #F8DC9A 0%, #E2AE5A 48%, #B7802F 100%)',
          }}
        >
          Kling
        </span>
        <span
          className="font-sans font-medium"
          style={{ fontSize: size * 0.26, letterSpacing: '0.06em', color: '#F0872E' }}
        >
          Digital Assets
        </span>
      </span>
      <span className="sr-only">Kling Digital Assets</span>
    </span>
  );
}
