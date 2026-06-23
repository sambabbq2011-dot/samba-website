import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/lib/site";

const brandTitle = "Samba 窯烤外燴";

export function createMetadata(
  title: string,
  description: string,
  path = "/"
): Metadata {
  const url = siteUrl(path);
  const fullTitle = `${brandTitle}｜${title}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "zh_TW",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description
    }
  };
}
