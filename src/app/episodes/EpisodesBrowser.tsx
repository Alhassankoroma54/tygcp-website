"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import EpisodeCard from "@/components/EpisodeCard";
import type { Episode } from "@/data/episodes";

export default function EpisodesBrowser({ episodes }: { episodes: Episode[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All");
  const [series, setSeries] = useState("All");
  const [district, setDistrict] = useState("All");

  const topics = useMemo(() => ["All", ...Array.from(new Set(episodes.map((e) => e.topic)))], [episodes]);
  const allSeries = useMemo(
    () => ["All", ...Array.from(new Set(episodes.map((e) => e.series).filter((s): s is string => Boolean(s))))],
    [episodes]
  );
  const districts = useMemo(
    () => ["All", ...Array.from(new Set(episodes.map((e) => e.district).filter((d): d is string => Boolean(d))))],
    [episodes]
  );

  const filtered = episodes
    .filter((e) => topic === "All" || e.topic === topic)
    .filter((e) => series === "All" || e.series === series)
    .filter((e) => district === "All" || e.district === district)
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

  const activeFilterCount = [topic, series, district].filter((v) => v !== "All").length + (query.trim() ? 1 : 0);

  return (
    <Container className="py-14">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search episodes, guests…"
          aria-label="Search episodes"
          className="input"
        />
        <label className="sr-only" htmlFor="filter-topic">
          Filter by topic
        </label>
        <select id="filter-topic" value={topic} onChange={(e) => setTopic(e.target.value)} className="input">
          {topics.map((t) => (
            <option key={t} value={t}>
              {t === "All" ? "All topics" : t}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="filter-series">
          Filter by series
        </label>
        <select id="filter-series" value={series} onChange={(e) => setSeries(e.target.value)} className="input">
          {allSeries.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All series" : s}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="filter-district">
          Filter by district
        </label>
        <select id="filter-district" value={district} onChange={(e) => setDistrict(e.target.value)} className="input">
          {districts.map((d) => (
            <option key={d} value={d}>
              {d === "All" ? "All districts" : d}
            </option>
          ))}
        </select>
      </div>

      {activeFilterCount > 0 && (
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-foreground/60">
            {filtered.length} episode{filtered.length === 1 ? "" : "s"} match{filtered.length === 1 ? "es" : ""} your
            filters
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTopic("All");
              setSeries("All");
              setDistrict("All");
            }}
            className="text-xs font-semibold text-green-ink hover:text-green-ink-hover"
          >
            Clear filters
          </button>
        </div>
      )}

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
