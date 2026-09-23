import { cn } from "@/lib/utils";

export default function Badge({
  children,
  tone = "green",
  className,
}: {
  children: React.ReactNode;
  tone?: "green" | "greenOnDark" | "navy" | "gold" | "outline";
  className?: string;
}) {
  const tones: Record<string, string> = {
    // AA-safe on white/light card backgrounds (the common case — see
    // globals.css for why this isn't the same green used elsewhere).
    green: "bg-green-ink/10 text-green-ink",
    // For the same badge placed on a navy/dark surface — measured with a
    // real browser (axe-core), not estimated: --brand-green alone only
    // clears ~4:1 against this translucent chip background, so this uses
    // the brighter green-light instead.
    greenOnDark: "bg-white/10 text-green-light",
    navy: "bg-navy text-white",
    // amber-700 (the light-surface pairing) measured ~2.2:1 on the dark
    // surfaces this tone is actually used on (episode/news hero badges) —
    // failed a real contrast check, so this uses brand gold on the same
    // translucent chip background as greenOnDark instead (~7:1).
    gold: "bg-white/10 text-gold",
    outline: "border border-navy/15 text-navy/70",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
