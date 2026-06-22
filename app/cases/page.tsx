import type { Metadata } from "next";
import Image from "next/image";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/metadata";
import { assetPath } from "@/lib/paths";
import { imageUrls } from "@/lib/site";

export const metadata: Metadata = createMetadata(
  "活動案例",
  "查看 Samba 窯烤於企業活動、戶外婚禮與私人派對的行動外燴案例與服務情境。",
  "/cases"
);

const cases = [
  { category: "企業活動", title: "年度家庭日", note: "戶外草地 · 大型供餐", image: assetPath("/images/case-family-day.jpg") },
  {
    category: "婚禮派對",
    title: "陽明山花園婚禮｜森林系戶外婚禮",
    note: "花園長桌 · 現場窯烤",
    image: assetPath("/images/case-yangmingshan-wedding-venue.jpg")
  },
  {
    category: "節慶派對",
    title: "聖誕節橋下烤肉派對",
    note: "橋下聚會 · 現場旋轉窯烤",
    image: assetPath("/images/case-christmas-bridge-party.png")
  },
  { category: "", title: "", note: "", image: imageUrls.hero }
];

const weddingPhotos = [
  { src: assetPath("/images/case-yangmingshan-wedding-venue.jpg"), alt: "陽明山花園婚禮宴會場地", featured: true },
  { src: assetPath("/images/case-yangmingshan-wedding-grill.jpg"), alt: "婚禮晚宴現場窯烤料理" },
  { src: assetPath("/images/case-yangmingshan-wedding-buffet.jpg"), alt: "花園婚禮戶外餐點展示" },
  { src: assetPath("/images/case-yangmingshan-wedding-table.jpg"), alt: "森林系婚禮長桌與花藝" },
  { src: assetPath("/images/case-yangmingshan-wedding-dessert.jpg"), alt: "婚禮甜點展示牆" }
];

const eventVideos = [
  {
    title: "巴西嘉年華烤肉趴",
    category: "FIESTA",
    description: "窯烤、音樂與熱情互動，一起感受 Samba 活動現場的節奏。",
    url: "https://www.facebook.com/SambaChurrasco/videos/1659504554093111/"
  }
];

const petPartyPhotos = [
  { src: assetPath("/images/pet-party-venue-mosaicked.jpg"), alt: "毛孩戶外活動場地", featured: true },
  { src: assetPath("/images/pet-party-woman-mosaicked.jpg"), alt: "參加者與薩摩耶合影" },
  { src: assetPath("/images/pet-party-christmas-samoyed.jpg"), alt: "聖誕裝扮的薩摩耶" },
  { src: assetPath("/images/pet-party-dog-friends.jpg"), alt: "薩摩耶與米格魯相聚" },
  { src: assetPath("/images/pet-party-samoyed-group.jpg"), alt: "戶外活動中的薩摩耶群" },
  { src: assetPath("/images/pet-party-venue-sign.jpg"), alt: "毛孩戶外聚會場地" }
];

function facebookVideoEmbed(url: string) {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=760`;
}

export default function CasesPage() {
  return (
    <>
      <PageHero
        eyebrow="EVENT STORIES"
        title="每一場火，都照亮不同的故事。"
        description="從場地條件到賓客組成，每個案例都有自己的節奏，也因此值得被好好規劃。"
        image={imageUrls.wedding}
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="SELECTED EVENTS"
            title="我們曾一起慶祝的時刻。"
            description="目前圖片為版型示意；可直接替換成既有活動照片並補上完整案例內容。"
          />
          <div className="cases-grid">
            {cases.map((item, index) => (
              <article key={`${item.title}-${index}`} className={index % 3 === 0 ? "case-card case-card--wide" : "case-card"}>
                <div className="case-card__image">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 800px) 100vw, 50vw" />
                </div>
                {item.category && <p className="eyebrow">{item.category}</p>}
                {item.title && <h2>{item.title}</h2>}
                {item.note && <span>{item.note}</span>}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--sand">
        <div className="container">
          <SectionHeading
            eyebrow="GARDEN WEDDING"
            title="陽明山花園婚禮｜森林系戶外婚禮"
            description="綠意環繞的花園長桌，搭配現場窯烤與精緻餐點，讓婚禮晚宴自然、溫暖又充滿香氣。"
          />
          <div className="pet-party-gallery">
            {weddingPhotos.map((photo) => (
              <figure
                key={photo.src}
                className={photo.featured ? "pet-party-photo pet-party-photo--featured" : "pet-party-photo"}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={photo.featured ? "(max-width: 800px) 100vw, 66vw" : "(max-width: 800px) 100vw, 33vw"}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="section pet-party-section">
        <div className="container">
          <SectionHeading
            eyebrow="PET FRIENDLY EVENT"
            title="毛孩聚會｜50隻毛孩的戶外窯烤派對"
            description="毛孩自在奔跑，主人輕鬆相聚；現場窯烤讓戶外派對多一份香氣與熱鬧。"
          />
          <div className="pet-party-gallery">
            {petPartyPhotos.map((photo) => (
              <figure
                key={photo.src}
                className={photo.featured ? "pet-party-photo pet-party-photo--featured" : "pet-party-photo"}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={photo.featured ? "(max-width: 800px) 100vw, 66vw" : "(max-width: 800px) 100vw, 33vw"}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--sand">
        <div className="container">
          <SectionHeading
            eyebrow="LIVE FROM SAMBA"
            title="從影片，看見現場的火與熱情。"
            description="以下內容來自 Samba 窯烤官方 Facebook，記錄不同活動中的料理、互動與歡樂時刻。"
          />
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
                  <a href={video.url} target="_blank" rel="noreferrer" className="arrow-link">
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
