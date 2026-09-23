import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /admin doesn't exist yet (tracked separately), but is disallowed
      // pre-emptively so it's never indexed once it ships; /api routes are
      // form-submission endpoints, not pages, and have nothing to index.
      disallow: ["/admin", "/api"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
