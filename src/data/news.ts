export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  category: "Announcement" | "Partnership" | "Programme" | "Media";
  summary: string;
  body: string[];
};

export const newsPosts: NewsPost[] = [
  {
    slug: "youth-dialogue-on-governance-reform",
    title: "Youth Dialogue on Governance Reform",
    date: "2026-05-14",
    category: "Programme",
    summary:
      "Over 80 young people from Freetown and Bo joined our first quarterly dialogue session on proposed governance reforms.",
    body: [
      "The Youth Governance Circle convened its first quarterly dialogue session this month, bringing together more than 80 young people from Freetown and Bo to discuss proposed governance reforms.",
      "Participants worked in small groups facilitated by members of the Youth Advisory Panel, before presenting consolidated questions to a panel of governance experts. The session generated over 60 questions, several of which will feature in upcoming episodes.",
    ],
  },
  {
    slug: "yigsil-partners-with-five-universities",
    title: "YIGSIL Partners with 5 Universities",
    date: "2026-05-02",
    category: "Partnership",
    summary:
      "New partnerships with five universities will expand research support and campus-based youth participation.",
    body: [
      "YIGSIL has signed partnership agreements with five universities and colleges to support research, student participation and campus recording of episodes.",
      "The partnerships will help widen the pipeline of youth voices featured on the podcast and create structured opportunities for student researchers to contribute briefing notes to the editorial team.",
    ],
  },
  {
    slug: "new-episode-series-road-to-2028",
    title: "New Episode Series: Road to 2028",
    date: "2026-04-18",
    category: "Announcement",
    summary:
      "A new signature series examining civic participation and electoral readiness ahead of the next election cycle.",
    body: [
      "The Youth Governance Circle is launching a new signature series, Road to 2028, examining civic participation, voter education and electoral readiness as Sierra Leone approaches its next electoral cycle.",
      "The series will maintain the project's strict non-partisan editorial standards, focusing on process, participation and accountability rather than candidates or parties.",
    ],
  },
  {
    slug: "studio-and-digital-infrastructure-operational",
    title: "Studio and Digital Infrastructure Now Operational",
    date: "2026-03-02",
    category: "Programme",
    summary: "Core production infrastructure is in place ahead of the official public launch.",
    body: [
      "With studio setup and digital infrastructure now operational, the project team has begun recording ahead of the official public launch.",
      "This milestone marks the completion of Phase 1 of the implementation plan, covering recruitment, governance protocols, and technical readiness.",
    ],
  },
];

export function getNewsBySlug(slug: string) {
  return newsPosts.find((n) => n.slug === slug);
}

export function getLatestNews(count = 3) {
  return [...newsPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
