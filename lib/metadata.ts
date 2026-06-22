import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export function createMetadata(
  title: string,
  description: string,
  path = "/"
): Metadata {
  const url = new URL(path, siteConfig.url).toString();

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
