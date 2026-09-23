/**
 * ILLUSTRATIVE EXAMPLE CONTENT — every episode below (guests, dates,
 * descriptions, tags) is a placeholder demonstrating the episode system,
 * not a record of an episode that has actually been recorded or aired.
 * No episode has a real `audioUrl` (see PodcastPlayer.tsx) because no
 * audio has been produced yet. Replace with real episodes — and only set
 * `audioUrl` once a real recording is hosted somewhere — before launch.
 */
export type Episode = {
  slug: string;
  episodeNumber: number;
  title: string;
  series?: string;
  topic: string;
  district?: string;
  guest: string;
  guestRole?: string;
  date: string; // ISO
  duration: string;
  summary: string;
  description: string;
  youtubeId?: string; // optional embed
  audioUrl?: string;
  tags: string[];
};

export const episodes: Episode[] = [
  {
    slug: "youth-and-local-governance",
    episodeNumber: 24,
    title: "Youth and Local Governance: Taking Action in Our Communities",
    series: "Voices from the Districts",
    topic: "Local Governance & Community Development",
    district: "Bo",
    guest: "Aminata Sesay",
    guestRole: "Youth Councillor, Bo City Council",
    date: "2026-05-20",
    duration: "32 min",
    summary:
      "How young councillors and community volunteers are shaping ward-level decisions and holding local government to account.",
    description:
      "Aminata Sesay joins the Circle to discuss how youth representation on local councils is changing the way ward development committees plan and spend. We unpack participatory budgeting, community monitoring and how young people outside Freetown can get a seat at the table.",
    tags: ["local governance", "districts", "participation"],
  },
  {
    slug: "budgeting-for-change",
    episodeNumber: 23,
    title: "Budgeting for Change: How Youth Can Influence Public Spending",
    series: "Policy Made Simple",
    topic: "Public Finance & Accountability",
    guest: "Ibrahim Kamara",
    guestRole: "Public Finance Analyst",
    date: "2026-05-06",
    duration: "28 min",
    summary:
      "A plain-language walkthrough of the national budget cycle and where citizens — especially young people — can push for change.",
    description:
      "Ibrahim Kamara breaks down how the national budget is prepared, approved and monitored, and where public participation windows actually exist. The episode ends with three practical actions any youth group can take before the next budget cycle.",
    tags: ["public finance", "budget", "civic education"],
  },
  {
    slug: "accountability-starts-with-us",
    episodeNumber: 22,
    title: "Accountability Starts with Us: Demanding Transparency",
    series: "Youth Around the Table",
    topic: "Democracy & Civic Participation",
    guest: "Panel of Youth Advisory Members",
    guestRole: "TYGCP Youth Advisory Panel",
    date: "2026-04-22",
    duration: "31 min",
    summary:
      "Six members of the Youth Advisory Panel discuss what accountability looks like from where they sit — campus, community and workplace.",
    description:
      "A roundtable recorded with members of the Youth Advisory Panel on what transparency and accountability mean in daily life, from student union elections to local contracts. Includes audience questions submitted through WhatsApp.",
    tags: ["accountability", "transparency", "youth panel"],
  },
  {
    slug: "decentralisation-and-development",
    episodeNumber: 21,
    title: "Decentralisation and Development: Leaving No Community Behind",
    series: "Voices from the Districts",
    topic: "Local Governance & Community Development",
    district: "Kenema",
    guest: "Fatmata Koroma",
    guestRole: "District Development Officer, Kenema",
    date: "2026-04-08",
    duration: "29 min",
    summary:
      "What decentralisation has delivered so far, and what district-level youth say is still missing.",
    description:
      "Fatmata Koroma and a panel of young entrepreneurs from Kenema discuss service delivery gaps, local revenue mobilisation, and how devolved authority can better reach underserved communities.",
    tags: ["decentralisation", "districts", "development"],
  },
  {
    slug: "ask-the-minister-youth-employment",
    episodeNumber: 20,
    title: "Ask the Minister: Youth Employment and the Jobs Pipeline",
    series: "Ask the Minister",
    topic: "Youth Employment & Economic Participation",
    guest: "Hon. Deputy Minister of Youth Affairs",
    guestRole: "Government of Sierra Leone",
    date: "2026-03-25",
    duration: "35 min",
    summary:
      "Young people put direct, unfiltered questions on jobs, skills training and youth funds to a sitting deputy minister.",
    description:
      "In our flagship Ask the Minister format, fifteen young people from different backgrounds question a Deputy Minister on employment policy, apprenticeships and access to youth enterprise funds — with follow-ups and no pre-approved questions.",
    tags: ["employment", "policy", "ask the minister"],
  },
  {
    slug: "fact-or-fiction-social-media-claims",
    episodeNumber: 19,
    title: "Fact or Fiction: Verifying Viral Governance Claims",
    series: "Fact or Fiction",
    topic: "Digital Citizenship & Information Integrity",
    guest: "Sierra Leone Fact-Check Network",
    date: "2026-03-11",
    duration: "24 min",
    summary:
      "We test five governance claims that went viral this quarter against primary sources and public records.",
    description:
      "A rapid-fire fact-checking segment where our editorial team walks through the evidence behind five widely shared claims about government spending and policy, showing the sourcing and verification process step by step.",
    tags: ["fact-checking", "misinformation", "digital literacy"],
  },
  {
    slug: "young-changemakers-climate-resilience",
    episodeNumber: 18,
    title: "Young Changemakers: Building Climate Resilience from the Ground Up",
    series: "Young Changemakers",
    topic: "Climate, Environment & Resilience",
    guest: "Mohamed Bangura",
    guestRole: "Founder, GreenStep Sierra Leone",
    date: "2026-02-25",
    duration: "27 min",
    summary:
      "A profile of a youth-led climate initiative and what it takes to turn community organising into policy influence.",
    description:
      "Mohamed Bangura shares how a small community clean-up group grew into a climate advocacy organisation working directly with local councils on flood mitigation and waste management policy.",
    tags: ["climate", "changemakers", "environment"],
  },
  {
    slug: "youth-parliament-constitutional-review",
    episodeNumber: 17,
    title: "Youth Parliament: Debating the Constitutional Review",
    series: "Youth Parliament",
    topic: "Democracy & Civic Participation",
    guest: "Youth Parliament Delegates",
    date: "2026-02-11",
    duration: "33 min",
    summary:
      "A structured youth debate on proposed constitutional reforms, moderated in the style of formal parliamentary procedure.",
    description:
      "Delegates representing different regions and viewpoints debate proposed constitutional amendments under structured parliamentary rules, closing with a summary of areas of consensus and disagreement.",
    tags: ["constitution", "debate", "democracy"],
  },
];

export function getEpisodeBySlug(slug: string) {
  return episodes.find((e) => e.slug === slug);
}

export function getLatestEpisodes(count = 4) {
  return [...episodes]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

/**
 * Chronological neighbours of an episode (by publish date), for
 * previous/next navigation on the episode detail page. "Previous" is the
 * episode released before this one, "next" is the one released after —
 * either can be null at the two ends of the archive.
 */
export function getAdjacentEpisodes(slug: string): { previous: Episode | null; next: Episode | null } {
  const sorted = [...episodes].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const idx = sorted.findIndex((e) => e.slug === slug);
  if (idx === -1) return { previous: null, next: null };
  return {
    previous: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}
