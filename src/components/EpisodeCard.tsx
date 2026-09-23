import Link from "next/link";
import type { Episode } from "@/data/episodes";
import { formatDate } from "@/lib/utils";
import Badge from "./Badge";

const gradients = [
  "from-green/40 via-navy-2 to-navy",
  "from-navy-3 via-navy-2 to-navy",
  "from-green-2/30 via-navy-2 to-navy",
];

export default function EpisodeCard({ episode, index = 0 }: { episode: Episode; index?: number }) {
  const gradient = gradients[index % gradients.length];
  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className={`relative flex aspect-video items-center justify-center bg-gradient-to-br ${gradient} p-4`}>
        <span className="absolute left-3 top-3 rounded-full bg-navy/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
          EP {episode.episodeNumber}
        </span>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-navy shadow-md transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 translate-x-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <Badge tone="green">{episode.topic}</Badge>
        </div>
        <h3 className="text-sm font-bold leading-snug text-navy group-hover:text-green-ink">{episode.title}</h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-foreground/60">{episode.summary}</p>
        <div className="mt-auto flex items-center gap-2 pt-2 text-[11px] font-medium text-foreground/60">
          <span>{formatDate(episode.date)}</span>
          <span>•</span>
          <span>{episode.duration}</span>
        </div>
      </div>
    </Link>
  );
}
