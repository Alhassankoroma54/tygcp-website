export const site = {
  name: "The Youth Governance Circle Podcast",
  shortName: "TYGCP",
  org: "Youth in Governance Advocacy Organisation SL (YIGSIL)",
  tagline: "Youth Voices. Better Governance. Stronger Sierra Leone.",
  description:
    "A national youth civic engagement, governance communication and accountability podcast, connecting young Sierra Leoneans with policymakers, institutions and each other.",
  // Configurable per deployment: set NEXT_PUBLIC_SITE_URL in the environment
  // (e.g. your Vercel production URL) so metadata, the sitemap, structured
  // data and canonical links all point at the real deployed domain instead
  // of this placeholder. Must not include a trailing slash.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tygcp.org",
  email: "yigsil38@gmail.com",
  phones: ["+232 34 930 669", "+232 74 612 977"],
  address: "67 Hill Cot Road, Wilberforce, Freetown, Sierra Leone",
  /**
   * Left blank intentionally — no TYGCP/YIGSIL social or podcast-host
   * accounts have been created/verified yet, and this project does not
   * invent account handles. Every UI that reads from `social` (Header,
   * Footer, the homepage hero) checks for a non-empty string and hides
   * that link entirely when unset, rather than pointing to a guessed URL —
   * so the honest state right now is simply "no social links shown."
   * Fill in real, verified URLs here once accounts exist; no other file
   * needs to change.
   */
  social: {
    youtube: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    twitter: "",
    linkedin: "",
    whatsapp: "",
    spotify: "",
    applePodcasts: "",
  },
};

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Episodes", href: "/episodes" },
  { label: "About", href: "/about" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Resources", href: "/resources" },
  { label: "News", href: "/news" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export const exploreNav: NavLink[] = [
  { label: "Governance Topics", href: "/governance-topics" },
  { label: "Policy Made Simple", href: "/policy-made-simple" },
  { label: "Youth Voices", href: "/youth-voices" },
  { label: "District Voices", href: "/district-voices" },
  { label: "Ask the Minister", href: "/ask-the-minister" },
  { label: "Fact or Fiction", href: "/fact-or-fiction" },
  { label: "Young Changemakers", href: "/young-changemakers" },
  { label: "Impact", href: "/impact" },
  { label: "Partners & Sponsors", href: "/partners" },
  { label: "Policies", href: "/policies" },
];

export const footerNav = {
  explore: exploreNav,
  organisation: [
    { label: "About", href: "/about" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Partners & Sponsors", href: "/partners" },
    { label: "Resources", href: "/resources" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ],
};
