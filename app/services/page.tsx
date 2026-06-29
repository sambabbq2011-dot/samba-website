import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/metadata";
import { assetPath } from "@/lib/paths";

export const metadata: Metadata = createMetadata(
  "服務項目",
  "Samba 窯烤提供到府巴西窯烤外燴、企業活動外燴、尾牙春酒外燴、戶外婚禮外燴與私人派對外燴規劃。",
  "/services"
);

const items = [
  {
    number: "01",
    title: "到府巴西窯烤外燴",
    en: "ON-SITE CHURRASCO",
    text: "把行動烤檯、食材與料理團隊帶到活動現場，現烤現切，讓賓客直接感受巴西窯烤的香氣與熱度。",
    tags: ["到府服務", "現場窯烤", "代烤外燴", "行動烤檯"]
  },
  {
    number: "02",
    title: "企業活動外燴",
    en: "CORPORATE EVENTS",
    text: "適合品牌活動、家庭日、開幕活動與團隊聚會。依賓客人數與活動流程規劃供餐節奏，兼顧效率與現場感。",
    tags: ["品牌活動", "家庭日", "開幕活動", "團隊聚會"]
  },
  {
    number: "03",
    title: "尾牙春酒外燴",
    en: "YEAR-END & SPRING BANQUETS",
    text: "適合尾牙、春酒、歲末聚餐與部門餐會。依人數與場地規劃餐檯與動線，讓宴會也能保有熱鬧現烤感。",
    tags: ["尾牙餐會", "春酒活動", "歲末聚餐", "部門餐會"]
  },
  {
    number: "04",
    title: "戶外婚禮外燴",
    en: "OUTDOOR WEDDINGS",
    text: "為花園婚禮、戶外證婚與婚宴派對安排餐檯、烤檯與供餐節奏，讓婚禮晚宴自然、溫暖又有記憶點。",
    tags: ["花園婚禮", "戶外證婚", "婚宴派對", "After Party"]
  },
  {
    number: "05",
    title: "私人派對外燴",
    en: "PRIVATE PARTIES",
    text: "生日派對、家庭聚會、露營與好友派對，都能依預算和偏好調整菜色。你負責邀請，我們負責把氣氛烤熱。",
    tags: ["生日派對", "家庭聚會", "露營活動", "好友聚餐"]
  }
];

const steps = [
  {
    number: "01",
    icon: "bi-clipboard-check",
    title: "填寫表單",
    text: "日期、地點、預計人數、活動類型"
  },
  {
    number: "02",
    icon: "bi-chat-dots",
    title: "討論方案",
    text: "菜色、預算、需求"
  },
  {
    number: "03",
    icon: "bi-geo-alt",
    title: "場地確認",
    text: "對齊進撤場、動線、水電與安全需求。"
  },
  {
    number: "04",
    icon: "bi-fire",
    title: "現場開烤",
    text: "團隊進場準備，依活動流程熱情供餐。"
  }
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR SERVICES"
        title="把專業烤檯，帶進你的活動現場。"
        description="從數十人的私人派對到大型企業活動，依需求規劃菜色、設備、人力與供餐節奏。"
        image={assetPath("/images/cases-hero-background.png")}
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="SERVE WITH FIRE"
            title={"不套公式，\n從活動本身開始規劃。"}
            description="以下是常見合作形式，實際內容會依場地與需求調整。"
          />
          <div className="detail-list">
            {items.map((item) => (
              <article key={item.number} className="detail-card">
                <div className="detail-card__number">{item.number}</div>
                <div>
                  <p className="eyebrow">{item.en}</p>
                  <h2>{item.title}</h2>
                </div>
                <div>
                  <p>{item.text}</p>
                  <div className="tag-list">
                    {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--sand">
        <div className="container">
          <SectionHeading eyebrow="HOW IT WORKS" title="從詢問到開烤，四個步驟。" align="center" mobileBreakAfterComma />
          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.number} className="step-card">
                <div className="step-card__header">
                  <span className="step-card__icon" aria-hidden="true">
                    <i className={`bi ${step.icon}`} />
                  </span>
                  <span className="step-card__number">{step.number}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA href="/booking#form" />
    </>
  );
}
