import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "outlineLight" | "ghost";

const variants: Record<Variant, string> = {
  // bg-green-ink (not the brighter --brand-green) so the white label text
  // clears 4.5:1 — see globals.css for the measured contrast rationale.
  primary:
    "bg-green-ink text-white hover:bg-green-ink-hover shadow-sm shadow-green-ink/20",
  outline:
    "border border-navy/20 text-navy hover:bg-navy/5",
  outlineLight:
    "border border-white/30 text-white hover:bg-white/10",
  ghost: "text-navy hover:text-green-ink",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
  icon,
  type,
  onClick,
  disabled,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap",
    variants[variant],
    disabled && "cursor-not-allowed opacity-60",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={classes}>
      {children}
      {icon}
    </button>
  );
}
