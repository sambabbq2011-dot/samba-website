import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/metadata";
import { imageUrls } from "@/lib/site";

export const metadata: Metadata = createMetadata(
  "常見問題",
  "了解 Samba 窯烤外燴的預約時間、服務地區、人數、場地需求、雨天備案與素食安排。",
  "/faq"
);

const faqs: Array<[string, ReactNode]> = [
  ["建議多久前預約？", "熱門週末與節慶建議儘早詢問。一般活動最好至少提前 4 至 8 週，實際仍以檔期為準。"],
  ["服務範圍在哪裡？", "主要服務範圍在苗栗以北至宜蘭皆可到府服務，若超出服務範圍，將酌收車馬費。"],
  [
    "最低需要幾位才能預約？",
    <>
      <p>
        我們的最低消費為 NT$20,000（未稅），因此最低預約人數會依所選方案而有所不同。
      </p>
      <p>參考如下：</p>
      <ul>
        <li>500 元／人方案：40 位起</li>
        <li>600 元／人方案：34 位起</li>
        <li>700 元／人方案：29 位起</li>
        <li>800 元／人方案：25 位起</li>
        <li>1000 元／人方案：20 位起</li>
        <li>1200 元／人方案：17 位起</li>
      </ul>
      <p>
        若未達上述人數，仍可預約，我們將以最低消費金額計算，並依實際消費金額升級菜色內容。
      </p>
      <p>
        如有特殊需求、客製菜單或活動規劃，也歡迎與我們聯繫討論。
      </p>
    </>
  ],
  ["場地需要提供什麼？", "通常需要合適的作業空間、進撤場動線，並視方案確認水源、電力與遮蔽。團隊會在活動前逐項確認。"],
  ["下雨怎麼辦？", "戶外活動建議準備雨備場地或帳篷。若天候可能影響安全，會與主辦方討論調整方式。"],
  ["可以安排素食或特殊飲食嗎？", "可以事先告知素食、過敏原與宗教飲食需求。我們會說明可提供的品項與避免交叉接觸的程度。"],
  ["費用包含哪些項目？", "報價內容包含食材、廚師、服務人員、烤檯設備、基本餐具與交通。"],
  ["活動後會協助整理嗎？", "團隊會整理自身工作區與設備。場地全面清潔、垃圾清運或額外撤場需求，可於活動前討論。"]
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FREQUENTLY ASKED"
        title="開烤以前，你可能想先知道這些。"
        description="若這裡沒有回答你的問題，直接告訴我們活動需求，會得到更精確的建議。"
        image={imageUrls.fire}
      />
      <section className="section">
        <div className="container faq-layout">
          <SectionHeading eyebrow="GOOD TO KNOW" title="常見問題" />
          <div className="accordion-list">
            {faqs.map(([question, answer], index) => (
              <details key={question} className="faq-item" open={index === 0}>
                <summary>
                  <span>{question}</span>
                  <i>＋</i>
                </summary>
                <div className="faq-answer">
                  {typeof answer === "string" ? <p>{answer}</p> : answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
