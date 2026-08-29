export type Resource = {
  title: string;
  type: "Report" | "Transcript" | "Civic Guide" | "Policy Brief";
  description: string;
  date: string;
  // Placeholder — link to the actual file once uploaded to the CMS/storage.
  href: string;
};

export const resources: Resource[] = [
  {
    title: "TYGCP Project Proposal (Full Programme Document)",
    type: "Report",
    description: "The full 12-month programme proposal, including goals, results framework and budget.",
    date: "2026-08-01",
    href: "#",
  },
  {
    title: "Episode 23 Transcript — Budgeting for Change",
    type: "Transcript",
    description: "Full transcript of the episode on public finance and citizen participation in the budget cycle.",
    date: "2026-05-06",
    href: "#",
  },
  {
    title: "Your Rights at a Public Hearing (Civic Guide)",
    type: "Civic Guide",
    description: "A short, plain-language guide to attending and participating in local government meetings.",
    date: "2026-03-01",
    href: "#",
  },
  {
    title: "How the National Budget Works (Policy Brief)",
    type: "Policy Brief",
    description: "A one-page brief summarising the national budget cycle and citizen engagement points.",
    date: "2026-05-06",
    href: "#",
  },
];

export const editorialPolicySummary = [
  "All factual claims should be checked against credible sources where practical.",
  "Guests should be identified accurately by name and institutional role.",
  "Paid or sponsored content should be clearly identified.",
  "Personal attacks, hate speech and incitement will not be promoted.",
  "Participants should have an opportunity to understand the nature of recording and publication.",
  "Sensitive topics will receive additional editorial and safeguarding review.",
];

export const safeguardingMeasures = [
  "A safeguarding and code-of-conduct policy is in place for all recorded participation.",
  "A complaints and feedback mechanism is available to any participant or member of the public.",
  "Appropriate consent / release forms are obtained for recorded participants.",
  "Online comments are moderated to remove abusive or harmful content.",
  "Safeguarding concerns are escalated through designated procedures.",
  "Additional safeguards apply for any participants under 18.",
];

export const privacyPrinciples = [
  "The website collects only the information needed for engagement, registration or contact.",
  "Forms will clearly state how submitted information will be used before collection.",
  "Personal information is not sold or shared with third parties for marketing purposes.",
  "Participants may request that their submitted information be corrected or removed by contacting the project team.",
];
