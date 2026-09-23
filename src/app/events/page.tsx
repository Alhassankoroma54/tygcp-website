import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import Badge from "@/components/Badge";
import RsvpForm from "@/components/forms/RsvpForm";
import { getUpcomingEvents, getPastEvents } from "@/data/events";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events & Dialogues",
  description:
    "Youth dialogues, Jubilee-style forums and live recordings — with registration and recaps.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events & Dialogues",
    description:
      "Youth dialogues, Jubilee-style forums and live recordings — with registration and recaps.",
    type: "website",
    url: "/events",
  },
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <div>
      <PageHero
        eyebrow="Get in the room"
        title="Events & Dialogues"
        description="Youth dialogues, Jubilee-style forums and live recordings — with registration and recaps."
      />
      <Container className="py-16 sm:py-20">
        <h2 className="text-lg font-bold text-navy">Upcoming</h2>
        <div className="mt-6 space-y-6">
          {upcoming.map((e) => (
            <div key={e.slug} className="grid gap-6 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm lg:grid-cols-[1fr_320px]">
              <div>
                <Badge tone="green">{e.type}</Badge>
                <h3 className="mt-3 text-lg font-extrabold text-navy">{e.title}</h3>
                <p className="mt-2 text-sm text-foreground/60">
                  {formatDate(e.date)} • {e.time} • {e.venue}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{e.description}</p>
              </div>
              {e.registrationOpen && (
                <div className="rounded-xl bg-navy/[0.03] p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wide text-navy/60">Register to attend</p>
                  <RsvpForm eventTitle={e.title} eventSlug={e.slug} />
                </div>
              )}
            </div>
          ))}
          {upcoming.length === 0 && (
            <p className="text-sm text-foreground/60">No upcoming events scheduled right now — check back soon.</p>
          )}
        </div>

        {past.length > 0 && (
          <>
            <h2 className="mt-16 text-lg font-bold text-navy">Past Events</h2>
            <div className="mt-6 space-y-4">
              {past.map((e) => (
                <div key={e.slug} className="rounded-2xl border border-navy/10 bg-white/60 p-5">
                  <Badge tone="outline">{e.type}</Badge>
                  <h3 className="mt-2 text-sm font-bold text-navy">{e.title}</h3>
                  <p className="text-xs text-foreground/60">{formatDate(e.date)} • {e.venue}</p>
                  {e.recap && <p className="mt-2 text-sm text-foreground/60">{e.recap}</p>}
                </div>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
