"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { trackMetaPixelCustomEvent } from "@/components/MetaPixel";
import { navigation } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrollTopRequest, setScrollTopRequest] = useState(0);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!scrollTopRequest || open) {
      return;
    }

    const timer = window.setTimeout(() => {
      const scrollingElement =
        document.scrollingElement || document.documentElement;
      const pageTop = document.getElementById("page-top");

      scrollingElement.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
      pageTop?.scrollIntoView({ block: "start" });
    }, 360);

    return () => window.clearTimeout(timer);
  }, [open, scrollTopRequest]);

  function handleNavigationClick(
    event: MouseEvent<HTMLAnchorElement>,
    isActive: boolean,
    href: string,
    label: string
  ) {
    const shouldLetBrowserHandleClick =
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey;

    trackMetaPixelCustomEvent("NavigationClick", {
      nav_label: label,
      nav_href: href,
      from_path: pathname,
      is_current_page: isActive
    });

    setOpen(false);

    if (shouldLetBrowserHandleClick) {
      return;
    }

    event.preventDefault();

    const isSamePage = pathname === href;

    if (isActive && isSamePage) {
      if (href === "/booking") {
        window.history.pushState(window.history.state, "", "/booking");
        window.dispatchEvent(new PopStateEvent("popstate"));
      }

      setScrollTopRequest(Date.now());
      return;
    }

    window.setTimeout(() => {
      router.push(href);
    }, 180);
  }

  return (
    <>
    <span id="page-top" className="page-top-anchor" aria-hidden="true" />
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Samba 窯烤首頁">
          <BrandMark variant="header" />
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "關閉選單" : "開啟選單"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="main-nav" className={`main-nav ${open ? "is-open" : ""}`}>
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) =>
                  handleNavigationClick(event, active, item.href, item.label)
                }
                className={[
                  active ? "is-active" : "",
                  item.featured ? "nav-cta" : ""
                ].filter(Boolean).join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
    </>
  );
}
