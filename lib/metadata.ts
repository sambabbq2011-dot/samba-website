import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/lib/site";

export function createMetadata(
  title: string,
  description: string,
  path = "/"
): Metadata {
  const url = siteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "zh_TW",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
