import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { PageHero } from "@/components/PageHero";
import { imageUrls, siteConfig, siteUrl } from "@/lib/site";

const title = "詢問檔期與初步報價｜Samba 窯烤外燴";
const description =
  "填寫活動日期、地區、人數與預算方向，Samba 窯烤外燴將協助確認檔期，並建議合適的外燴方案。";
const canonical = siteUrl("/booking");

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
        eyebrow="QUICK INQUIRY"
        title="詢問檔期與初步報價"
        description="填寫約 60 秒。先提供日期、地區、人數與預算方向，我們會協助確認檔期，並建議合適的外燴方案。"
        image={imageUrls.hero}
      />
      <section id="form" className="section booking-page">
        <div className="container booking-page__intro">
          <p className="eyebrow">START PLANNING</p>
          <h2>先簡單告訴我們活動方向</h2>
          <p>不需要一次準備完整資料；先確認檔期與預算方向，其他細節都可以後續再討論。</p>
        </div>
        <div className="container">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
