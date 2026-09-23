import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Badge from "@/components/Badge";
import { newsPosts, getNewsBySlug } from "@/data/news";
import { formatDate } from "@/lib/utils";
import { site } from "@/data/site";

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
  if (!post) return { title: "News" };
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      url: `${site.url}/news/${post.slug}`,
    },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getNewsBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.date,
    description: post.summary,
    url: `${site.url}/news/${post.slug}`,
    articleSection: post.category,
    publisher: { "@type": "Organization", name: site.org },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <section className="bg-hero-radial bg-grain">
        <Container className="py-14 sm:py-16">
          <Link href="/news" className="text-xs font-bold uppercase tracking-wide text-green-light">
            ← All news
          </Link>
          <Badge tone="greenOnDark" className="mt-4">{post.category}</Badge>
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
