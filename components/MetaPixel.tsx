"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { metaPixelId } from "@/lib/metaPixel";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function trackMetaPixelEvent(
  eventName: string,
  parameters?: Record<string, unknown>
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  if (parameters) {
    window.fbq("track", eventName, parameters);
    return;
  }

  window.fbq("track", eventName);
}

export function MetaPixel() {
  const pathname = usePathname();
  const hasSkippedInitialPageView = useRef(false);

  useEffect(() => {
    if (!hasSkippedInitialPageView.current) {
      hasSkippedInitialPageView.current = true;
      return;
    }

    trackMetaPixelEvent("PageView");
  }, [pathname]);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
