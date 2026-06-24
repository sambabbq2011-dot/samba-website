import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/metadata";
import { assetPath } from "@/lib/paths";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata(
  "聯絡我們",
  "聯絡 Samba 窯烤規劃企業活動、婚禮派對或私人聚會外燴，提供日期、地點與人數即可開始討論。",
  "/contact"
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT US"
        title="告訴我們，你想辦一場怎樣的聚會？"
        description="提供日期、地點、人數與預算方向，我們會依資訊回覆合適的規劃建議。"
        image={assetPath("/images/cases-hero-background.png")}
      />
      <section className="section section--sand">
        <div className="container contact-layout">
          <div className="contact-info">
            <p className="eyebrow">LET&apos;S TALK</p>
            <h2>資料越完整，規劃越到位。</h2>
            <p>若日期尚未確定，也可以先描述活動形式與預計規模。</p>
            <div className="contact-methods">
              <a href="https://lin.ee/tQCuaq7" target="_blank" rel="noreferrer">
                <span>LINE</span>
                <strong>Samba 窯烤 LINE 官方帳號</strong>
              </a>
              {siteConfig.phone && (
                <a href={`tel:${siteConfig.phone}`}>
                  <span>PHONE</span>
                  <strong>{siteConfig.phone}</strong>
                </a>
              )}
              <a href={siteConfig.facebook} target="_blank" rel="noreferrer">
                <span>FACEBOOK</span>
                <strong>Samba 窯烤</strong>
              </a>
              <a href={siteConfig.instagram} target="_blank" rel="noreferrer">
                <span>INSTAGRAM</span>
                <strong>@samba__2011</strong>
              </a>
            </div>
            <a
              className="line-add-friend"
              href="https://lin.ee/tQCuaq7"
              target="_blank"
              rel="noreferrer"
              aria-label="加入 Samba 窯烤 LINE 官方帳號"
            >
              <img
                src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"
                alt="加入好友"
                height="36"
              />
            </a>
          </div>
          <div className="line-qr-card">
            <p className="eyebrow">LINE OFFICIAL ACCOUNT</p>
            <div className="line-qr-card__heading">
              <h2>掃描 QR Code</h2>
              <p className="line-qr-card__subtitle">加入官方 LINE</p>
            </div>
            <div className="line-qr-card__image">
              <Image
                src={assetPath("/images/line-official-qr.png")}
                alt="Samba 窯烤 LINE 官方帳號 QR Code"
                width={540}
                height={540}
                priority
              />
            </div>
            <Link href="/booking#form" className="button button--dark">
              預約外燴服務
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
