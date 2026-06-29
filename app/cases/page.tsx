import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import {
  caseCategories,
  caseItems,
  eventVideos,
  facebookVideoEmbed,
} from "@/lib/cases";
import { createMetadata } from "@/lib/metadata";
import { assetPath } from "@/lib/paths";

export const metadata: Metadata = createMetadata(
  "活動案例",
  "查看 Samba 窯烤於企業活動、戶外婚禮、節慶派對、社區活動與私人戶外聚會的行動外燴案例。",
  "/cases"
);

export default function CasesPage() {
  return (
    <>
      <PageHero
        eyebrow="EVENT STORIES"
        title="依活動類型，找到最接近你的現場。"
        description="從企業團體、婚禮派對到節慶與戶外聚會，先看分類，再深入精選案例。"
        image={assetPath("/images/cases-hero-background.png")}
      />
      <nav className="case-quick-nav" aria-label="案例分類快速選單">
        <div className="container case-quick-nav__inner">
          <span>案例分類</span>
          <div className="case-quick-nav__links">
            {caseCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/cases/${category.slug}`}
                className="case-quick-nav__link"
              >
                {category.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <section className="section cases-overview-section">
        <div className="container">
          <SectionHeading
            eyebrow="BROWSE BY SCENE"
            title="先用活動類型篩選案例。"
            description="分類頁會收納同類型活動，不需要每一場都拆成單篇，也能讓搜尋主題更清楚。"
          />
          <div className="case-category-grid">
            {caseCategories.map((category) => {
              const firstCase = caseItems.find((item) =>
                category.caseIds.includes(item.id)
              );

              return (
                <Link
                  key={category.slug}
                  href={`/cases/${category.slug}`}
                  className="case-category-card"
                >
                  {firstCase && (
                    <span className="case-category-card__image">
                      <Image
                        src={firstCase.photos[0].src}
                        alt={firstCase.photos[0].alt}
                        fill
                        sizes="(max-width: 800px) 100vw, 33vw"
                      />
                    </span>
                  )}
                  <span className="eyebrow">{category.eyebrow}</span>
                  <strong>{category.title}</strong>
                  <span>{category.description}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <div className="no-wrap-section-title no-wrap-section-copy">
            <SectionHeading
              eyebrow="LIVE FROM SAMBA"
              title="從影片，看見現場的火與熱情。"
              description="以下內容來自 Samba 窯烤官方 Facebook，記錄活動中的料理、互動與歡樂時刻。"
            />
          </div>
          <div className="case-videos-grid">
            {eventVideos.map((video) => (
              <article key={video.url} className="case-video-card">
                <div className="case-video-card__player">
                  <iframe
                    src={facebookVideoEmbed(video.url)}
                    title={video.title}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="case-video-card__content">
                  <p className="eyebrow">{video.category}</p>
                  <h2>{video.title}</h2>
                  <p>{video.description}</p>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                    className="arrow-link"
                  >
                    在 Facebook 觀看 <span>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
