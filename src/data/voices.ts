/**
 * ILLUSTRATIVE EXAMPLE CONTENT — every name, quote, and profile in this
 * file (youth voices, district highlights, changemakers, fact-checks,
 * policy explainers) is a placeholder written to show how the layouts
 * render real content, not a record of an actual person, interview, or
 * verified claim. Replace with real testimonials/profiles — with consent
 * — and real fact-checked claims before launch. Do not treat anything
 * here as a genuine quote attributable to a real person.
 */
export type YouthVoice = {
  name: string;
  age?: number;
  location: string;
  role: string;
  quote: string;
};

export const youthVoices: YouthVoice[] = [
  {
    name: "Mariama Turay",
    age: 22,
    location: "Freetown",
    role: "University Student",
    quote:
      "I used to think the budget process was something only economists understood. After 'Budgeting for Change' I actually attended a ward planning meeting for the first time.",
  },
  {
    name: "Alusine Conteh",
    age: 27,
    location: "Makeni",
    role: "Youth Entrepreneur",
    quote:
      "The Youth Advisory Panel gave me a real channel to raise concerns about business registration delays — and someone from the ministry actually responded.",
  },
  {
    name: "Isata Bangura",
    age: 19,
    location: "Kenema",
    role: "Secondary School Leaver",
    quote:
      "Recording from Kenema meant my community's questions weren't left out of a Freetown-only conversation.",
  },
];

export type DistrictVoice = {
  district: string;
  region: string;
  highlight: string;
  episodeSlug?: string;
};

export const districtVoices: DistrictVoice[] = [
  { district: "Bo", region: "Southern Province", highlight: "Ward-level participatory budgeting and youth councillors.", episodeSlug: "youth-and-local-governance" },
  { district: "Kenema", region: "Eastern Province", highlight: "Decentralisation, service delivery gaps and local revenue.", episodeSlug: "decentralisation-and-development" },
  { district: "Makeni", region: "Northern Province", highlight: "Youth entrepreneurship and access to enterprise funds." },
  { district: "Kailahun", region: "Eastern Province", highlight: "Community resilience and youth-led climate initiatives." },
  { district: "Port Loko", region: "North West Province", highlight: "Civic education outreach through community radio." },
  { district: "Kono", region: "Eastern Province", highlight: "Local governance and extractives accountability." },
];

export type Changemaker = {
  slug: string;
  name: string;
  initiative: string;
  location: string;
  summary: string;
};

export const changemakers: Changemaker[] = [
  {
    slug: "mohamed-bangura-greenstep",
    name: "Mohamed Bangura",
    initiative: "GreenStep Sierra Leone",
    location: "Freetown",
    summary: "Grew a neighbourhood clean-up group into a climate advocacy organisation working with local councils on flood mitigation.",
  },
  {
    slug: "aminata-sesay-bo-council",
    name: "Aminata Sesay",
    initiative: "Bo Youth Council",
    location: "Bo",
    summary: "Elected youth councillor pushing for participatory budgeting and transparent ward-level spending.",
  },
  {
    slug: "ibrahim-kamara-finance-literacy",
    name: "Ibrahim Kamara",
    initiative: "Public Finance Literacy Project",
    location: "Freetown",
    summary: "Runs free public-finance literacy workshops for university students and young civil servants.",
  },
];

export type FactCheck = {
  slug: string;
  claim: string;
  verdict: "True" | "False" | "Misleading" | "Unverified";
  summary: string;
  date: string;
};

export const factChecks: FactCheck[] = [
  {
    slug: "claim-budget-allocation-youth",
    claim: "A viral post claimed youth affairs received less than 1% of the national budget this year.",
    verdict: "Misleading",
    summary:
      "The figure quoted excluded youth-related allocations distributed across other ministries. The consolidated youth-relevant allocation is higher, though still a small share of total spending.",
    date: "2026-03-11",
  },
  {
    slug: "claim-free-business-registration",
    claim: "A message circulating on WhatsApp claimed business registration is now completely free for youth-led startups.",
    verdict: "False",
    summary:
      "Registration fees remain in place; some categories of youth-led micro-enterprises may qualify for reduced fees under a separate scheme, which is not the same as free registration.",
    date: "2026-02-20",
  },
];

export type PolicyExplainer = {
  slug: string;
  title: string;
  summary: string;
  date: string;
};

export const policyExplainers: PolicyExplainer[] = [
  {
    slug: "how-the-national-budget-works",
    title: "How the National Budget Works, in Plain Language",
    summary: "A step-by-step explainer of the budget cycle: preparation, approval, execution and audit — and where citizens can engage.",
    date: "2026-05-06",
  },
  {
    slug: "understanding-decentralisation",
    title: "Understanding Decentralisation in Sierra Leone",
    summary: "What powers and funds have moved to local councils, and what oversight still sits with central government.",
    date: "2026-04-08",
  },
  {
    slug: "your-rights-at-a-public-hearing",
    title: "Your Rights at a Public Hearing or Council Meeting",
    summary: "A short civic guide to attending and participating in local government meetings as an ordinary citizen.",
    date: "2026-03-01",
  },
];
