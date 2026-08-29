import Link from "next/link";
import type { NewsPost } from "@/data/news";
import { formatDate } from "@/lib/utils";

export default function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex flex-col gap-2 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
    >
      <span className="text-[11px] font-bold uppercase tracking-wide text-green">{post.category}</span>
      <h3 className="text-sm font-bold leading-snug text-navy group-hover:text-green">{post.title}</h3>
      <p className="line-clamp-2 text-xs leading-relaxed text-foreground/60">{post.summary}</p>
      <span className="mt-1 text-[11px] font-medium text-foreground/40">{formatDate(post.date)}</span>
    </Link>
  );
}
