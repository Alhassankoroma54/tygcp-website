import type { Metadata } from "next";
import { requireAdminSession } from "@/lib/adminAuth";
import AdminNav from "@/components/admin/AdminNav";
import AdminFoundationStub from "@/components/admin/AdminFoundationStub";

export const metadata: Metadata = { title: "Events — Admin", robots: { index: false, follow: false } };

export default async function AdminEventsPage() {
  await requireAdminSession();
  return (
    <div className="min-h-screen bg-navy/[0.03]">
      <AdminNav />
      <AdminFoundationStub
        title="Events"
        schemaSummary="Event model: slug, title, description, location, start/end date, cover image, draft/published/cancelled status. Upcoming/past is derived from startsAt, not a stored category. RsvpSubmission now has an optional eventId — new RSVPs can be linked to a real Event once a future batch wires the public RSVP flow to it; existing RSVP rows and the live /api/rsvp endpoint are unchanged this batch."
      />
    </div>
  );
}
