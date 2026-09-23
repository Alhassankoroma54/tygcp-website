/**
 * ILLUSTRATIVE EXAMPLE CONTENT — these events (including the past event's
 * attendance figure in `recap`) are placeholders demonstrating the events
 * system, not a record of events that have actually happened or been
 * scheduled. Replace with real dates, venues and confirmed attendance
 * before launch.
 */
export type EventItem = {
  slug: string;
  title: string;
  type: "Youth Dialogue" | "Jubilee-Style Forum" | "Recording" | "Summit";
  date: string;
  time: string;
  venue: string;
  description: string;
  registrationOpen: boolean;
  recap?: string;
};

export const events: EventItem[] = [
  {
    slug: "jubilee-forum-youth-employment",
    title: "Jubilee-Style Youth Forum: Youth Employment & the Jobs Pipeline",
    type: "Jubilee-Style Forum",
    date: "2026-09-19",
    time: "10:00 AM",
    venue: "YIGSIL Studio, Wilberforce, Freetown",
    description:
      "Fifteen young people from different backgrounds question a public official directly on youth employment policy. Open to registered youth ages 18-35.",
    // Date has passed — registration correctly closed. See src/data/events.ts
    // header comment: these are illustrative sample dates, not a real
    // schedule; replace with real upcoming events before launch.
    registrationOpen: false,
  },
  {
    slug: "district-dialogue-bo",
    title: "District Dialogue: Local Governance in Bo",
    type: "Youth Dialogue",
    date: "2026-09-05",
    time: "2:00 PM",
    venue: "Bo Community Centre",
    description:
      "A community-level dialogue session on ward development planning, participatory budgeting and local accountability, with mobile recording for the podcast archive.",
    // Date has passed — registration correctly closed. See above.
    registrationOpen: false,
  },
  {
    slug: "live-recording-policy-made-simple",
    title: "Live Recording: Policy Made Simple — National Budget Special",
    type: "Recording",
    date: "2026-08-15",
    time: "4:00 PM",
    venue: "YIGSIL Studio, Wilberforce, Freetown",
    description: "A live studio audience recording breaking down the national budget process in plain language.",
    registrationOpen: false,
    recap:
      "Over 40 young people attended this live recording, contributing questions that shaped the follow-up episode 'Budgeting for Change'.",
  },
];

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function getUpcomingEvents() {
  const now = Date.now();
  return events
    .filter((e) => new Date(e.date).getTime() >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getPastEvents() {
  const now = Date.now();
  return events
    .filter((e) => new Date(e.date).getTime() < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
