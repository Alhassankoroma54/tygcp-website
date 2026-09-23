/**
 * Small colour-coded badges for the "listen on your platform" row.
 *
 * These are generic sound/play glyphs on each platform's brand colour, not
 * reproductions of Spotify/Apple/YouTube's actual logos — deliberately, to
 * avoid any trademark concern while still giving each link a distinct,
 * recognizable colour identity at a glance.
 */
function PlatformDot({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export function SpotifyGlyph() {
  return (
    <PlatformDot color="#1DB954">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-navy" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M6 10.5c4-1 8-1 12 1M6.5 14c3.3-.8 6.7-.8 10 .8M7 17.5c2.7-.6 5.3-.6 8 .6" />
      </svg>
    </PlatformDot>
  );
}

export function ApplePodcastsGlyph() {
  return (
    <PlatformDot color="#9933CC">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="currentColor">
        <circle cx="12" cy="9" r="3.2" />
        <path d="M9 21c0-4.5 1-8 3-8s3 3.5 3 8c0 .6-.4 1-1 1H10c-.6 0-1-.4-1-1z" />
      </svg>
    </PlatformDot>
  );
}

export function YouTubeGlyph() {
  return (
    <PlatformDot color="#FF0000">
      <svg viewBox="0 0 24 24" className="h-3 w-3 text-white translate-x-px" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </PlatformDot>
  );
}
