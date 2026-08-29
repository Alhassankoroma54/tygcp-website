export type Partner = {
  name: string;
  category: "Government" | "Civil Society" | "University" | "Media" | "Private Sector" | "Development Partner";
  description: string;
};

export const partnerCategories: Partner["category"][] = [
  "Government",
  "Civil Society",
  "University",
  "Media",
  "Private Sector",
  "Development Partner",
];

// Placeholder roster — replace with confirmed partner names/logos before launch.
export const partners: Partner[] = [
  { name: "Ministry of Youth Affairs", category: "Government", description: "Policy briefings and institutional collaboration." },
  { name: "Fourah Bay College", category: "University", description: "Research support and student participation." },
  { name: "Njala University", category: "University", description: "Campus recording and district research partnerships." },
  { name: "National Civic Coalition SL", category: "Civil Society", description: "Civic education content and technical expertise." },
  { name: "Freetown Community Radio Network", category: "Media", description: "Broadcast amplification across districts." },
  { name: "Local Tech & Innovation Hub", category: "Private Sector", description: "Technology and equipment support." },
];

export type SponsorshipPackage = {
  tier: string;
  contribution: string;
  benefits: string;
};

export const sponsorshipPackages: SponsorshipPackage[] = [
  {
    tier: "Strategic Partner",
    contribution: "SLE 150,000+",
    benefits: "Prominent recognition, partnership profile, selected co-branded civic campaign visibility.",
  },
  {
    tier: "Principal Sponsor",
    contribution: "SLE 100,000+",
    benefits: "Recognition across selected episodes and events.",
  },
  {
    tier: "Supporting Sponsor",
    contribution: "SLE 60,000+",
    benefits: "Recognition on agreed content and materials.",
  },
  {
    tier: "Episode Sponsor",
    contribution: "SLE 20,000+",
    benefits: "Recognition for a specific episode / series.",
  },
  {
    tier: "In-Kind Partner",
    contribution: "Equivalent value",
    benefits: "Recognition according to contribution.",
  },
];
