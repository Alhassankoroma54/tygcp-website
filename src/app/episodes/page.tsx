import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EpisodesBrowser from "./EpisodesBrowser";
import { episodes } from "@/data/episodes";

export const metadata: Metadata = { title: "Episodes" };

export default function EpisodesPage() {
  return (
    <div>
      <PageHero
        eyebrow="The archive"
        title="All Episodes"
        description="Full episodes, searchable and filterable by topic, series and district — with summaries and transcripts."
      />
      <EpisodesBrowser episodes={episodes} />
    </div>
  );
}
