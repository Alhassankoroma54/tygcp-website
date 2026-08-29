import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Badge from "@/components/Badge";
import { newsPosts, getNewsBySlug } from "@/data/news";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return newsPosts.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  return { title: post ? post.title : "News" };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) notFound();

  return (
    <div>
      <section className="bg-hero-radial bg-grain">
        <Container className="py-14 sm:py-16">
          <Link href="/news" className="text-xs font-bold uppercase tracking-wide text-green-light">
            ← All news
          </Link>
          <Badge tone="green" className="mt-4">{post.category}</Badge>
          <h1 className="mt-3 max-w-2xl text-balance text-3xl font-extrabold text-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-white/60">{formatDate(post.date)}</p>
        </Container>
      </section>
      <Container className="max-w-2xl py-14 sm:py-16">
        {post.body.map((p, i) => (
          <p key={i} className="mt-4 text-sm leading-relaxed text-foreground/75 first:mt-0">
            {p}
          </p>
        ))}
      </Container>
    </div>
  );
}
