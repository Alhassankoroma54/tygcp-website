import type { Metadata } from "next";
import { requireAdminSession } from "@/lib/adminAuth";
import AdminNav from "@/components/admin/AdminNav";
import AdminFoundationStub from "@/components/admin/AdminFoundationStub";

export const metadata: Metadata = { title: "Episodes — Admin", robots: { index: false, follow: false } };

export default async function AdminEpisodesPage() {
  await requireAdminSession();
  return (
    <div className="min-h-screen bg-navy/[0.03]">
      <AdminNav />
      <AdminFoundationStub
        title="Episodes"
        schemaSummary="Episode model: slug, title, summary, episode number, guest name/title, duration, cover image, audio/video/platform URLs, transcript, draft/published/scheduled status, publish date."
      />
    </div>
  );
}
