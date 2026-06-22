import type { MetadataRoute } from "next";
import { navigation, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return navigation.map((item) => ({
    url: siteUrl(item.href),
    lastModified: new Date(),
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.8
  }));
}
