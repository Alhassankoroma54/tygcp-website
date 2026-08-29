"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "./Container";
import Button from "./Button";
import { primaryNav, exploreNav, site } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/90">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-green bg-navy-2 text-green">
            <MicIcon className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] font-extrabold uppercase tracking-wide text-white">
              The Youth
            </span>
            <span className="block text-[13px] font-extrabold uppercase tracking-wide text-green">
              Governance Circle
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-widest text-white/50">
              Podcast by YIGSIL
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-semibold text-white/70 transition-colors hover:text-white",
                isActive(item.href) && "text-green hover:text-green"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              className="flex items-center gap-1 text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              Explore
              <ChevronIcon className={cn("h-3.5 w-3.5 transition-transform", moreOpen && "rotate-180")} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-3 w-72 rounded-2xl border border-navy/10 bg-white p-2 shadow-xl">
                {exploreNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-navy/80 hover:bg-navy/5 hover:text-navy"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Button href={site.social.spotify} variant="primary" icon={<PlayIcon className="h-3.5 w-3.5" />}>
            Listen Live
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-white/10 bg-navy-2 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {[...primaryNav, ...exploreNav].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-semibold text-white/75 hover:bg-white/5 hover:text-white",
                  isActive(item.href) && "bg-white/5 text-green"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button href={site.social.spotify} variant="primary" className="mt-3 w-full">
              Listen Live
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}

function MicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 19v3M8 22h8" strokeLinecap="round" />
    </svg>
  );
}
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
