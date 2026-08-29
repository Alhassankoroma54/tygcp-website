export const site = {
  name: "The Youth Governance Circle Podcast",
  shortName: "TYGCP",
  org: "Youth in Governance Advocacy Organisation SL (YIGSIL)",
  tagline: "Youth Voices. Better Governance. Stronger Sierra Leone.",
  description:
    "A national youth civic engagement, governance communication and accountability podcast, connecting young Sierra Leoneans with policymakers, institutions and each other.",
  url: "https://tygcp.org",
  email: "yigsil38@gmail.com",
  phones: ["+232 34 930 669", "+232 74 612 977"],
  address: "67 Hill Cot Road, Wilberforce, Freetown, Sierra Leone",
  social: {
    youtube: "https://youtube.com/@tygcp",
    facebook: "https://facebook.com/tygcp",
    instagram: "https://instagram.com/tygcp",
    tiktok: "https://tiktok.com/@tygcp",
    twitter: "https://x.com/tygcp",
    linkedin: "https://linkedin.com/company/tygcp",
    whatsapp: "https://wa.me/23274612977",
    spotify: "https://open.spotify.com",
    applePodcasts: "https://podcasts.apple.com",
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
