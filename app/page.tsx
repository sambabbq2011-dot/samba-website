import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/metadata";
import { assetPath } from "@/lib/paths";
import { imageUrls } from "@/lib/site";

export const metadata: Metadata = createMetadata(
  "Samba 窯烤外燴",
  "到府巴西窯烤、代烤外燴｜企業活動・婚禮・私人派對。全台到府服務可洽詢｜常態服務苗栗以北至宜蘭｜最低 NT$20,000 起。",
  "/"
);

const lineOfficialUrl = "https://lin.ee/tQCuaq7";

const services = [
  ["01", "到府巴西窯烤外燴", "行動烤檯、食材與料理團隊到場，現烤現切呈現巴西窯烤香氣。"],
  ["02", "企業活動外燴", "品牌活動、家庭日與團隊聚會，依規模安排餐點與現場動線。"],
  ["03", "尾牙春酒外燴", "歲末尾牙、春酒餐會與部門聚餐，讓宴會保有熱鬧現烤感。"],
  ["04", "戶外婚禮外燴", "從戶外證婚到婚宴派對，用現烤料理創造自然溫暖的宴客氣氛。"],
  ["05", "私人派對外燴", "生日、露營、社區活動與好友派對，把備料與烤檯交給專業團隊。"]
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
            Samba 窯烤外燴
          </h1>
          <p className="hero-copy">
            到府巴西窯烤、代烤外燴｜企業活動・婚禮・私人派對
            <br />
            全台到府服務可洽詢｜常態服務苗栗以北至宜蘭｜最低 NT$20,000 起
          </p>
          <div className="hero-actions">
            <Link href="/booking" className="button button--orange">
              方案詢問
            </Link>
            <Link href="/menu" className="button button--outline">
              菜單方案
            </Link>
            <Link href="/cases" className="button button--outline">
              活動案例
            </Link>
            <a href={lineOfficialUrl} className="button button--outline">
              LINE官方諮詢
            </a>
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
