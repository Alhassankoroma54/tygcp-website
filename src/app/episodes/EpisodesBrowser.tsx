"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import EpisodeCard from "@/components/EpisodeCard";
import type { Episode } from "@/data/episodes";

export default function EpisodesBrowser({ episodes }: { episodes: Episode[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All");

  const topics = useMemo(() => ["All", ...Array.from(new Set(episodes.map((e) => e.topic)))], [episodes]);

  const filtered = episodes
    .filter((e) => topic === "All" || e.topic === topic)
    .filter((e) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        e.title.toLowerCase().includes(q) ||
        e.guest.toLowerCase().includes(q) ||
        (e.series ?? "").toLowerCase().includes(q) ||
        (e.district ?? "").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Container className="py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search episodes, guests, series…"
          className="input sm:max-w-xs"
        />
        <select value={topic} onChange={(e) => setTopic(e.target.value)} className="input sm:max-w-xs">
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-foreground/60">No episodes match your search yet.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ep, i) => (
            <EpisodeCard key={ep.slug} episode={ep} index={i} />
          ))}
        </div>
      )}
    </Container>
  );
}
