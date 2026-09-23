import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider",
            light ? "text-green-light" : "text-green-ink"
          )}
        >
          <span className={cn("h-1.5 w-4 rounded-full", light ? "bg-green-light" : "bg-green-ink")} />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "text-balance text-2xl font-extrabold tracking-tight sm:text-3xl",
          light ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-3 text-base leading-relaxed", light ? "text-white/70" : "text-foreground/70")}>
          {description}
        </p>
      )}
    </div>
  );
}
