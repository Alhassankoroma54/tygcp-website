import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import NewsCard from "@/components/NewsCard";
import { newsPosts } from "@/data/news";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  const sorted = [...newsPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <div>
      <PageHero
        eyebrow="Latest updates"
        title="News"
        description="Project announcements, partnership news, event updates and programme milestones."
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </div>
  );
}
