"use client";

import { useEffect, useRef, useState } from "react";
import type { ImpactStat } from "@/data/impact";
import { formatNumber } from "@/lib/utils";

const icons: Record<ImpactStat["icon"], React.ReactNode> = {
  mic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 19v3M8 22h8" strokeLinecap="round" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M3 3v18h18M7 15l4-4 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  institution: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M3 21h18M4 21V9l8-5 8 5v12M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  message: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 21l1.9-4.5A8.38 8.38 0 0 1 3.5 12 8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M9 20l-6-3V4l6 3 6-3 6 3v13l-6-3-6 3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function Counter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(value * eased));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{formatNumber(display)}</span>;
}

export default function ImpactStrip({
  stats,
  label = "12-Month Programme Targets",
  className,
}: {
  stats: ImpactStat[];
  /** Set to null to omit the caption (only if the surrounding page already labels these numbers as targets). */
  label?: string | null;
  className?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-white/60">{label}</p>
      )}
      <div className="grid grid-cols-2 divide-x divide-y divide-white/10 rounded-2xl border border-white/10 bg-navy-2/90 shadow-2xl shadow-black/40 backdrop-blur sm:grid-cols-4 sm:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 px-5 py-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-green-light">
              {icons[stat.icon]}
            </span>
            <div>
              <div className="text-2xl font-extrabold text-white sm:text-[26px]">
                <Counter value={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wide text-white/60">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
