import { cn } from "@/lib/utils";

export default function Badge({
  children,
  tone = "green",
  className,
}: {
  children: React.ReactNode;
  tone?: "green" | "navy" | "gold" | "outline";
  className?: string;
}) {
  const tones: Record<string, string> = {
    green: "bg-green/10 text-green",
    navy: "bg-navy text-white",
    gold: "bg-gold/15 text-amber-700",
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
