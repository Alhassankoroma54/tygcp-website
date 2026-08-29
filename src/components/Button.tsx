import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "outlineLight" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-green text-white hover:bg-green-2 shadow-sm shadow-green/20",
  outline:
    "border border-navy/20 text-navy hover:bg-navy/5",
  outlineLight:
    "border border-white/30 text-white hover:bg-white/10",
  ghost: "text-navy hover:text-green",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
  icon,
  type,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap",
    variants[variant],
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
    <button type={type ?? "button"} onClick={onClick} className={classes}>
      {children}
      {icon}
    </button>
  );
}
