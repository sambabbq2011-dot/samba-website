import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { PageHero } from "@/components/PageHero";
import { imageUrls, siteConfig } from "@/lib/site";

const title = "預約外燴服務｜Samba 窯烤外燴";
const description =
  "填寫 Samba 窯烤外燴預約需求，提供活動日期、地點、人數與需求，我們將協助規劃合適的外燴方案。";
const canonical = new URL("/booking", siteConfig.url).toString();

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
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

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="BOOK YOUR EVENT"
        title="預約外燴服務"
        description="告訴我們活動日期、地點、人數與餐飲需求，Samba 團隊將協助確認檔期並規劃適合的外燴方案。"
        image={imageUrls.hero}
      />
      <section id="form" className="section booking-page">
        <div className="container booking-page__intro">
          <p className="eyebrow">START PLANNING</p>
          <h2>先讓我們了解您的需求吧！</h2>
          <p>填寫約需 3～5 分鐘。送出需求不代表預約完成，實際檔期與內容將由工作人員與您確認。</p>
        </div>
        <div className="container">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
