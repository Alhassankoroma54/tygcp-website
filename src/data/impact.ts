export type ImpactStat = {
  label: string;
  value: number;
  suffix?: string;
  icon: "mic" | "users" | "chart" | "institution" | "message" | "map";
};

export const heroStats: ImpactStat[] = [
  { label: "Episodes", value: 24, suffix: "+", icon: "mic" },
  { label: "Youth Engaged", value: 600, suffix: "+", icon: "users" },
  { label: "Digital Reach", value: 50000, suffix: "+", icon: "chart" },
  { label: "Partner Institutions", value: 10, suffix: "+", icon: "institution" },
];

export type OutputIndicator = {
  level: "Output" | "Outcome" | "Impact contribution";
  indicator: string;
  target: string;
  verification: string;
};

export const resultsFramework: OutputIndicator[] = [
  { level: "Output", indicator: "Episodes produced", target: "24", verification: "Episode archive" },
  { level: "Output", indicator: "Short clips produced", target: "120+", verification: "Digital content library" },
  { level: "Output", indicator: "Youth dialogue sessions", target: "12", verification: "Attendance / report forms" },
  { level: "Output", indicator: "Youth participants", target: "600+", verification: "Registration records" },
  {
    level: "Outcome",
    indicator: "Youth governance knowledge",
    target: "≥20% improvement among sampled participants",
    verification: "Pre/post survey",
  },
  {
    level: "Outcome",
    indicator: "Youth engagement",
    target: "1,000+ questions / interactions",
    verification: "Platform analytics",
  },
  {
    level: "Outcome",
    indicator: "District representation",
    target: "At least 6 district areas represented",
    verification: "Episode records",
  },
  {
    level: "Outcome",
    indicator: "Partnerships",
    target: "10+ active partners / guests",
    verification: "MOUs / letters / records",
  },
  {
    level: "Impact contribution",
    indicator: "Youth report increased confidence to engage in decision-making",
    target: "≥60% of endline sample",
    verification: "Endline survey",
  },
];

export const targets12Month = [
  { label: "Full podcast episodes", value: "24" },
  { label: "Short-form digital clips", value: "120+" },
  { label: "Youth / community dialogue sessions", value: "12" },
  { label: "Direct youth participants", value: "600+" },
  { label: "Estimated digital reach", value: "50,000+ cumulative impressions" },
  { label: "Guests / resource persons", value: "60+" },
  { label: "Youth questions collected", value: "1,000+" },
  { label: "Policy / civic explainers", value: "24" },
  { label: "Partner institutions engaged", value: "10+" },
];

export const outcomes = [
  {
    title: "Improved understanding",
    description: "Young people demonstrate improved understanding of governance and public policy.",
  },
  {
    title: "More opportunities to engage",
    description: "Youth have increased opportunities to question, engage and dialogue with institutions.",
  },
  {
    title: "Accessible information",
    description: "Public-interest governance information is available in accessible multimedia formats.",
  },
  {
    title: "Underrepresented voices",
    description: "Underrepresented youth voices are more visible in decision-making processes.",
  },
  {
    title: "Sustainable model",
    description: "A sustainable partnership and revenue model supports continuation after Year 1.",
  },
];
