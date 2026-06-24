import type { Metadata } from "next";
import Image from "next/image";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/metadata";
import { assetPath } from "@/lib/paths";

export const metadata: Metadata = createMetadata(
  "活動案例",
  "查看 Samba 窯烤於企業活動、戶外婚禮與私人派對的行動外燴案例與服務情境。",
  "/cases"
);

const weddingPhotos = [
  { src: assetPath("/images/case-yangmingshan-wedding-new-venue.jpg"), alt: "陽明山森林系花園婚禮宴會場地", featured: true },
  { src: assetPath("/images/case-yangmingshan-wedding-new-dessert-wall.jpg"), alt: "花園婚禮甜甜圈展示牆" },
  { src: assetPath("/images/case-yangmingshan-wedding-new-buffet.jpg"), alt: "森林系婚禮戶外餐點展示" },
  { src: assetPath("/images/case-yangmingshan-wedding-new-grill.jpg"), alt: "婚禮晚宴現場窯烤料理" },
  { src: assetPath("/images/case-yangmingshan-wedding-new-snacks.jpg"), alt: "花園婚禮點心餐檯" }
];

const battingCenterPhotos = [
  {
    src: assetPath("/images/case-batting-center-service.jpg"),
    alt: "Samba 團隊現場準備餐點與服務",
    featured: true
  },
  {
    src: assetPath("/images/case-batting-center-venue.jpg"),
    alt: "大魯閣打擊場活動場地與賓客"
  },
  {
    src: assetPath("/images/case-batting-center-buffet.jpg"),
    alt: "打擊場活動外燴餐檯"
  },
  {
    src: assetPath("/images/case-batting-center-dining.jpg"),
    alt: "大魯閣打擊場聚會用餐區"
  }
];

const christmasBridgePhotos = [
  {
    src: assetPath("/images/case-christmas-bridge-cover.jpg"),
    alt: "橋下聖誕烤肉派對旋轉烤全雞",
    featured: true
  },
  {
    src: assetPath("/images/case-christmas-bridge-guests.jpg"),
    alt: "橋下聖誕派對賓客享用窯烤料理"
  },
  {
    src: assetPath("/images/case-christmas-bridge-grill.jpg"),
    alt: "聖誕派對現場旋轉窯烤"
  },
  {
    src: assetPath("/images/case-christmas-bridge-fish.jpg"),
    alt: "橋下派對現場烤魚料理"
  }
];

const brazilNationalDayPhotos = [
  {
    src: assetPath("/images/case-brazil-national-day-cover.jpg"),
    alt: "巴西國慶日活動現場",
    featured: true
  },
  {
    src: assetPath("/images/case-brazil-national-day-venue.jpg"),
    alt: "巴西國慶日戶外活動場地"
  },
  {
    src: assetPath("/images/case-brazil-national-day-grill.jpg"),
    alt: "巴西國慶日現場窯烤料理"
  },
  {
    src: assetPath("/images/case-brazil-national-day-guests.jpg"),
    alt: "巴西國慶日賓客聚會"
  },
  {
    src: assetPath("/images/case-brazil-national-day-service.jpg"),
    alt: "Samba 巴西國慶日外燴服務"
  }
];

const ruifangCommunityPhotos = [
  {
    src: assetPath("/images/case-ruifang-community-cover.jpg"),
    alt: "瑞芳里民活動現場",
    featured: true
  },
  {
    src: assetPath("/images/case-ruifang-community-event.jpg"),
    alt: "瑞芳里民戶外聚會"
  },
  {
    src: assetPath("/images/case-ruifang-community-grill.jpg"),
    alt: "瑞芳里民活動窯烤料理"
  },
  {
    src: assetPath("/images/case-ruifang-community-poster.png"),
    alt: "瑞芳里民活動紀錄"
  }
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

const caseQuickLinks = [
  { href: "#brazil-national-day", label: "巴西國慶" },
  { href: "#batting-center-event", label: "企業團體" },
  { href: "#christmas-party", label: "聖誕派對" },
  { href: "#community-event", label: "社區活動" },
  { href: "#pet-friendly-event", label: "毛孩聚會" },
  { href: "#garden-wedding", label: "婚禮派對" },
  { href: "#live-from-samba", label: "活動影片" }
];

export default function CasesPage() {
  return (
    <>
      <PageHero
        eyebrow="EVENT STORIES"
        title="每一場火，都照亮不同的故事。"
        description="從場地條件到賓客組成，每個案例都有自己的節奏，也因此值得被好好規劃。"
        image={assetPath("/images/cases-hero-background.png")}
      />
      <nav className="case-quick-nav" aria-label="案例快速選單">
        <div className="container case-quick-nav__inner">
          <span>案例快速選單</span>
          <div className="case-quick-nav__links">
            {caseQuickLinks.map((link) => (
              <a key={link.href} href={link.href} className="case-quick-nav__link">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
      <section id="brazil-national-day" className="section pet-party-section case-anchor-section">
        <div className="container">
          <div className="no-wrap-section-title">
            <SectionHeading
              eyebrow="BRAZIL NATIONAL DAY"
              title="巴西國慶日"
              description="以現場窯烤料理與熱情服務，一起感受充滿巴西風情的節慶聚會。"
            />
          </div>
          <div className="pet-party-gallery">
            {brazilNationalDayPhotos.map((photo) => (
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
      <section id="batting-center-event" className="section pet-party-section case-anchor-section">
        <div className="container">
          <div className="no-wrap-section-title no-wrap-section-copy">
            <SectionHeading
              eyebrow="BATTING CENTER EVENT"
              title="大魯閣打擊場活動外燴｜Samba 窯烤現場服務"
              description="打擊場聚會也能享用現烤窯烤料理，Samba 團隊到場準備餐點與服務。"
            />
          </div>
          <div className="pet-party-gallery">
            {battingCenterPhotos.map((photo) => (
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
      <section id="christmas-party" className="section section--sand case-anchor-section">
        <div className="container">
          <div className="no-wrap-section-title">
            <SectionHeading
              eyebrow="CHRISTMAS PARTY"
              title="橋下聖誕烤肉派對"
              description="橋下空間化身熱鬧聚會現場，旋轉窯烤與現烤料理陪大家一起過聖誕。"
            />
          </div>
          <div className="pet-party-gallery">
            {christmasBridgePhotos.map((photo) => (
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
      <section id="community-event" className="section section--sand case-anchor-section">
        <div className="container">
          <div className="no-wrap-section-title">
            <SectionHeading
              eyebrow="COMMUNITY EVENT"
              title="瑞芳里民活動"
              description="把現烤香氣帶進里民聚會，讓大家在輕鬆熱鬧的氣氛中共享餐點。"
            />
          </div>
          <div className="pet-party-gallery">
            {ruifangCommunityPhotos.map((photo) => (
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
      <section id="pet-friendly-event" className="section case-anchor-section">
        <div className="container">
          <div className="no-wrap-section-title">
            <SectionHeading
              eyebrow="PET FRIENDLY EVENT"
              title="毛孩聚會｜50隻毛孩的戶外窯烤派對"
              description="毛孩自在奔跑，主人輕鬆相聚；現場窯烤讓戶外派對多一份香氣與熱鬧。"
            />
          </div>
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
      <section id="garden-wedding" className="section section--sand case-anchor-section">
        <div className="container">
          <div className="no-wrap-section-title no-wrap-section-copy">
            <SectionHeading
              eyebrow="GARDEN WEDDING"
              title="陽明山花園婚禮｜森林系戶外婚禮"
              description="綠意環繞的花園長桌，搭配現場窯烤與精緻餐點，讓婚禮晚宴自然、溫暖又充滿香氣。"
            />
          </div>
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
      <section id="live-from-samba" className="section section--sand case-anchor-section">
        <div className="container">
          <div className="no-wrap-section-title no-wrap-section-copy">
            <SectionHeading
              eyebrow="LIVE FROM SAMBA"
              title="從影片，看見現場的火與熱情。"
              description="以下內容來自 Samba 窯烤官方 Facebook，記錄不同活動中的料理、互動與歡樂時刻。"
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
