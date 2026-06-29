import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { siteConfig, siteUrl } from "@/lib/site";

const title = "Samba 窯烤外燴｜活動預約";
const description =
  "依活動資訊選擇快速諮詢或完整預約，Samba 窯烤外燴將協助確認檔期、報價與合適方案。";
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
      <section id="form" className="section booking-page">
        <div className="container booking-page__intro">
          <p className="eyebrow">START PLANNING</p>
          <h1>活動預約與檔期詢問</h1>
          <p>第一次了解方案，可以先簡單詢問；活動資訊已確定，也可以一次填寫完整資料。</p>
        </div>
        <div className="container">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
