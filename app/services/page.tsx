import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/metadata";
import { imageUrls } from "@/lib/site";

export const metadata: Metadata = createMetadata(
  "服務項目",
  "Samba 窯烤提供企業活動、婚禮派對、私人聚會與大型活動的行動巴西窯烤外燴規劃。",
  "/services"
);

const items = [
  {
    number: "01",
    title: "企業活動外燴",
    en: "CORPORATE EVENTS",
    text: "適合尾牙、春酒、家庭日、品牌活動與團隊聚會。依賓客人數與活動流程規劃供餐節奏，兼顧效率與現場感。",
    tags: ["尾牙春酒", "家庭日", "品牌發表", "團隊聚會"]
  },
  {
    number: "02",
    title: "婚禮與派對",
    en: "WEDDINGS & PARTIES",
    text: "為戶外婚禮、婚前派對與 After Party 打造自在不拘束的用餐體驗，讓烤檯成為賓客自然聚集的焦點。",
    tags: ["戶外婚禮", "婚前派對", "After Party", "慶生派對"]
  },
  {
    number: "03",
    title: "私人聚會",
    en: "PRIVATE GATHERINGS",
    text: "朋友聚餐、生日、露營與社區活動，都能依預算和偏好調整。你負責邀請想見的人，我們負責把大家餵得開心。",
    tags: ["生日聚會", "朋友聚餐", "露營活動", "社區活動"]
  },
  {
    number: "04",
    title: "大型活動與市集",
    en: "FESTIVALS & MARKETS",
    text: "針對大量人流、分時供餐與特殊場地條件，配置適合的人力與設備，協助主辦單位順利完成餐飲環節。",
    tags: ["大型活動", "戶外市集", "校園活動", "運動賽事"]
  }
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR SERVICES"
        title="把專業烤檯，帶進你的活動現場。"
        description="從數十人的私人派對到大型企業活動，依需求規劃菜色、設備、人力與供餐節奏。"
        image={imageUrls.gathering}
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="SERVE WITH FIRE"
            title="不套公式，從活動本身開始規劃。"
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
          <SectionHeading eyebrow="HOW IT WORKS" title="從詢問到開烤，四個步驟。" align="center" />
          <div className="steps-grid">
            {[
              ["01", "填寫表單", "日期、地點、預計人數、活動類型"],
              ["02", "討論方案", "菜色、預算、需求"],
              ["03", "場地確認", "對齊進撤場、動線、水電與安全需求。"],
              ["04", "現場開烤", "團隊進場準備，依活動流程熱情供餐。"]
            ].map(([number, title, text]) => (
              <div key={number} className="step-card">
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA href="/booking#form" />
    </>
  );
}
