/**
 * Original hero illustration — studio microphone + headphones, a Sierra
 * Leone flag-colour accent, and a generic stylized skyline silhouette.
 *
 * Deliberately NOT a photograph. The reference design brief called for
 * "premium studio microphone / professional headphones / Sierra Leone
 * visual identity / atmospheric Freetown/city background" — this project
 * has no real photography of TYGCP's actual studio or Freetown's actual
 * skyline, and the brief explicitly says not to substitute copyrighted or
 * random web imagery. This is a from-scratch vector illustration (every
 * shape below is plain SVG primitives with this project's own brand
 * gradients — no external image, no stock asset, nothing fetched) built to
 * evoke the same composition and mood honestly. The skyline is a generic
 * silhouette, not a claim about any specific real skyline; the three-band
 * colour accent references Sierra Leone's national flag colours (green,
 * white, blue), not a reproduction of the flag itself.
 *
 * A real product photo of TYGCP's actual studio setup — or of an actual
 * recording session — would be a straightforward drop-in replacement for
 * this component once one exists (see the Phase 3 homepage-redesign report
 * for this flagged as a real-asset request).
 */
export default function HeroVisual() {
  return (
    <svg
      viewBox="0 0 480 480"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of a podcast studio microphone and headphones"
    >
      <defs>
        <radialGradient id="hv-glow" cx="50%" cy="38%" r="60%">
          <stop offset="0%" stopColor="var(--brand-green-2)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--brand-green-2)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hv-mic-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a4a63" />
          <stop offset="55%" stopColor="#1c2b45" />
          <stop offset="100%" stopColor="#0e1c33" />
        </linearGradient>
        <linearGradient id="hv-mic-rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--brand-green-light)" />
          <stop offset="100%" stopColor="var(--brand-green)" />
        </linearGradient>
        <linearGradient id="hv-headphone" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#233457" />
          <stop offset="100%" stopColor="#101f38" />
        </linearGradient>
        <linearGradient id="hv-sky" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0a1626" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0a1626" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ambient glow behind the subject */}
      <circle cx="240" cy="190" r="200" fill="url(#hv-glow)" />

      {/* Generic stylized skyline silhouette — not a depiction of a specific real place */}
      <g opacity="0.55">
        <rect x="0" y="0" width="480" height="480" fill="url(#hv-sky)" />
        {[
          [0, 400, 46, 80],
          [50, 380, 40, 100],
          [94, 410, 34, 70],
          [132, 360, 50, 120],
          [186, 395, 30, 85],
          [220, 340, 56, 140],
          [280, 388, 36, 92],
          [320, 400, 42, 80],
          [366, 365, 48, 115],
          [418, 400, 62, 80],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="#0c1930" />
        ))}
        <rect x="0" y="478" width="480" height="2" fill="var(--brand-green)" opacity="0.4" />
      </g>

      {/* Headphones, draped behind/around the microphone */}
      <g stroke="url(#hv-headphone)" strokeWidth="10" fill="none" strokeLinecap="round">
        <path d="M140 210a100 100 0 0 1 200 0" />
      </g>
      <rect x="126" y="200" width="26" height="58" rx="13" fill="url(#hv-headphone)" />
      <rect x="328" y="200" width="26" height="58" rx="13" fill="url(#hv-headphone)" />
      <rect x="130" y="210" width="18" height="40" rx="9" fill="var(--brand-navy-2)" />
      <rect x="332" y="210" width="18" height="40" rx="9" fill="var(--brand-navy-2)" />

      {/* Microphone */}
      <rect x="196" y="330" width="88" height="10" rx="5" fill="var(--brand-navy-3)" opacity="0.8" />
      <rect x="234" y="300" width="12" height="40" fill="url(#hv-mic-body)" />
      <rect x="188" y="140" width="104" height="170" rx="52" fill="url(#hv-mic-body)" stroke="url(#hv-mic-rim)" strokeWidth="3" />
      {/* Grille lines */}
      <g stroke="#0a1626" strokeWidth="4" opacity="0.55">
        <line x1="204" y1="175" x2="276" y2="175" />
        <line x1="204" y1="195" x2="276" y2="195" />
        <line x1="204" y1="215" x2="276" y2="215" />
        <line x1="204" y1="235" x2="276" y2="235" />
        <line x1="204" y1="255" x2="276" y2="255" />
      </g>
      {/* Brand ring echoing the header logo mark */}
      <circle cx="240" cy="225" r="16" fill="none" stroke="url(#hv-mic-rim)" strokeWidth="3" opacity="0.9" />
      <circle cx="240" cy="225" r="5" fill="var(--brand-green-light)" />

      {/* Sierra Leone flag-colour accent band (colour reference, not a flag reproduction) */}
      <g opacity="0.9">
        <rect x="140" y="418" width="200" height="5" rx="2.5" fill="var(--brand-green)" />
        <rect x="140" y="426" width="200" height="5" rx="2.5" fill="#f3f5f8" />
        <rect x="140" y="434" width="200" height="5" rx="2.5" fill="#2563eb" />
      </g>
    </svg>
  );
}
