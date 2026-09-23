import type { Metadata } from "next";
import { requireAdminSession } from "@/lib/adminAuth";
import AdminNav from "@/components/admin/AdminNav";
import AdminFoundationStub from "@/components/admin/AdminFoundationStub";

export const metadata: Metadata = { title: "News — Admin", robots: { index: false, follow: false } };

export default async function AdminNewsPage() {
  await requireAdminSession();
  return (
    <div className="min-h-screen bg-navy/[0.03]">
      <AdminNav />
      <AdminFoundationStub
        title="News"
        schemaSummary="NewsArticle model: slug, title, summary, content, featured image, draft/published status, publish date."
      />
    </div>
  );
}
