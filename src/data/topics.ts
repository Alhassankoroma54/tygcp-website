export type GovernanceTopic = {
  slug: string;
  title: string;
  description: string;
};

export const governanceTopics: GovernanceTopic[] = [
  { slug: "democracy-civic-participation", title: "Democracy and Civic Participation", description: "Elections, constitutionalism, civic rights and responsibilities, and structured youth participation in democratic processes." },
  { slug: "public-policy-service-delivery", title: "Public Policy and Service Delivery", description: "How policy is made, implemented and evaluated, and what it means for everyday service delivery." },
  { slug: "public-finance-accountability", title: "Public Finance and Accountability", description: "Budgets, public spending, procurement and the accountability mechanisms that oversee them." },
  { slug: "youth-employment-economic-participation", title: "Youth Employment and Economic Participation", description: "Jobs, skills training, entrepreneurship and access to economic opportunity for young people." },
  { slug: "local-governance-community-development", title: "Local Governance and Community Development", description: "Decentralisation, ward development, local councils and district-level participation." },
  { slug: "digital-citizenship-information-integrity", title: "Digital Citizenship and Information Integrity", description: "Media literacy, misinformation, disinformation and responsible digital participation." },
  { slug: "leadership-ethics", title: "Leadership and Ethics", description: "Public integrity, ethical leadership and standards in public and civic life." },
  { slug: "social-inclusion-equal-participation", title: "Social Inclusion and Equal Participation", description: "Ensuring women, persons with disabilities and underserved communities are represented in governance conversations." },
  { slug: "climate-environment-resilience", title: "Climate, Environment and Resilience", description: "Climate adaptation, environmental policy and community resilience initiatives." },
  { slug: "national-development-future", title: "National Development and the Future of Sierra Leone", description: "Long-term national development priorities and the role of young people in shaping them." },
];

export type SignatureSeries = {
  slug: string;
  title: string;
  concept: string;
};

export const signatureSeries: SignatureSeries[] = [
  { slug: "ask-the-minister", title: "Ask the Minister", concept: "Young people directly engage a responsible public official." },
  { slug: "policy-made-simple", title: "Policy Made Simple", concept: "Complex policy explained in plain language." },
  { slug: "voices-from-the-districts", title: "Voices from the Districts", concept: "Youth perspectives beyond Freetown." },
  { slug: "youth-parliament", title: "Youth Parliament", concept: "Structured debate on a public-interest question." },
  { slug: "fact-or-fiction", title: "Fact or Fiction", concept: "Evidence-based examination of common claims." },
  { slug: "young-changemakers", title: "Young Changemakers", concept: "Profiles of youth creating community impact." },
  {
    slug: "jubilee-style-youth-forum",
    title: "Jubilee-Style Youth Forum",
    concept:
      "A moderated, high-engagement forum brings together approximately 15 young people with diverse perspectives to question, challenge and engage a public official, expert or institutional representative around a focused governance issue.",
  },
];

export const episodeSegments = [
  { segment: "The Opening Bell", time: "2–3 min", purpose: "Introduce topic and why it matters" },
  { segment: "Inside the Issue", time: "12–15 min", purpose: "Explain the policy / governance issue" },
  { segment: "Youth Around the Table", time: "8–10 min", purpose: "Youth questions and experiences" },
  { segment: "Accountability Chair", time: "5 min", purpose: "Direct questions on commitments and results" },
  { segment: "Your Voice, Your Question", time: "3–5 min", purpose: "Audience questions" },
  { segment: "One Action Before We Go", time: "1–2 min", purpose: "Practical civic action" },
];
