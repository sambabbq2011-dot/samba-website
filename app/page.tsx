import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/metadata";
import { assetPath } from "@/lib/paths";
import { imageUrls } from "@/lib/site";

export const metadata: Metadata = createMetadata(
  "行動巴西窯烤外燴",
  "Samba 窯烤把現場炭火料理帶到企業活動、婚禮派對與私人聚會，讓每一場相聚都有香氣、有節奏、有記憶。",
  "/"
);

const services = [
  ["01", "企業活動", "尾牙、家庭日、品牌發表與團隊聚會，依規模安排餐點與現場動線。"],
  ["02", "婚禮派對", "從戶外證婚到 After Party，用現烤香氣創造自然熱鬧的宴客氣氛。"],
  ["03", "私人聚會", "生日、露營、社區活動與好友派對，把備料與烤檯交給專業團隊。"]
];

export default function HomePage() {
  return (
    <>
      <section
        className="home-hero"
        style={{ backgroundImage: `url("${imageUrls.hero}")` }}
      >
        <div className="home-hero__overlay" />
        <div className="container home-hero__content">
          <p className="hero-kicker">MOBILE BRAZILIAN CHURRASCO · SINCE 2011</p>
          <h1>
            把熱情
            <br />
            <em>烤進每次相聚</em>
          </h1>
          <p className="hero-copy">
            Samba 帶著炭火與烤檯走進你的活動，
            <br />
            讓料理成為現場最有溫度的風景。
          </p>
          <div className="hero-actions">
            <Link href="/booking" className="button button--orange">
              詢問檔期與報價
            </Link>
            <Link href="/cases" className="button button--outline">
              看活動案例
            </Link>
          </div>
        </div>
        <div className="hero-scroll">SCROLL TO TASTE <span>↓</span></div>
      </section>

      <section className="intro section">
        <div className="container split-grid">
          <div>
            <SectionHeading
              eyebrow="THE SAMBA WAY"
              title="不是把餐送到現場， 是把一場火熱的體驗帶過去。"
            />
          </div>
          <div className="intro-copy">
            <p>
              2011 年，我們從一群喜歡戶外、炭火與分享的人開始。如今 Samba
              帶著行動烤檯走遍台灣，在賓客眼前現切、現烤、現場服務。
            </p>
            <Link href="/about" className="arrow-link">
              認識 Samba <span>→</span>
            </Link>
          </div>
        </div>
        <div className="container image-pair">
          <div
            className="image-card image-card--large image-card--video"
            style={{
              backgroundImage: `url("${assetPath("/images/home-samba-buffet.jpg")}")`
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={assetPath("/images/home-samba-buffet.jpg")}
              aria-label="Samba 外燴活動現場影片"
            >
              <source
                src={assetPath("/videos/home-samba-catering.mp4")}
                type="video/mp4"
              />
              <img
                src={assetPath("/images/home-samba-buffet.jpg")}
                alt="Samba 戶外外燴餐點"
              />
            </video>
          </div>
          <div className="image-card image-card--small">
            <Image
              src={assetPath("/images/home-samba-buffet.jpg")}
              alt="Samba 戶外外燴餐點"
              fill
              sizes="(max-width: 800px) 100vw, 35vw"
            />
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <SectionHeading
            eyebrow="WHAT WE DO"
            title={"每一種聚會，\n都有適合它的火候。"}
            description="我們依活動性質、人數、場地與預算，協助規劃菜色與服務方式。"
          />
          <div className="service-list">
            {services.map(([number, title, description]) => (
              <article key={number} className="service-row">
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link href="/cases" aria-label={`查看${title}活動案例`}>
                  ↗
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="container">
          <p>“</p>
          <blockquote>
            好吃是基本，
            <br />
            火邊的笑聲才是 Samba。
          </blockquote>
          <span>FIRE · FLAVOR · FIESTA</span>
        </div>
      </section>

      <CTA href="/booking#form" />
    </>
  );
}
