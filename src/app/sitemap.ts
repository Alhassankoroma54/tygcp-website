import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { episodes } from "@/data/episodes";
import { newsPosts } from "@/data/news";

const staticRoutes = [
  "",
  "/about",
  "/episodes",
  "/get-involved",
  "/resources",
  "/news",
  "/events",
  "/contact",
  "/governance-topics",
  "/policy-made-simple",
  "/youth-voices",
  "/district-voices",
  "/ask-the-minister",
  "/fact-or-fiction",
  "/young-changemakers",
  "/impact",
  "/partners",
  "/policies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const episodeEntries: MetadataRoute.Sitemap = episodes.map((e) => ({
    url: `${base}/episodes/${e.slug}`,
    lastModified: e.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const newsEntries: MetadataRoute.Sitemap = newsPosts.map((n) => ({
    url: `${base}/news/${n.slug}`,
    lastModified: n.date,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...episodeEntries, ...newsEntries];
}
