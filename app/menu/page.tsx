import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/metadata";
import { imageUrls } from "@/lib/site";

export const metadata: Metadata = createMetadata(
  "菜單方案",
  "瀏覽 Samba 窯烤經典、派對與豪華海陸外燴方案。實際菜色與報價依季節、人數、場地及活動需求調整。",
  "/menu"
);

const plans = [
  {
    price: "500",
    minimumGuests: 40,
    previewTitle: "經典入門款",
    highlights: [],
    grill: [
      "檸檬雞翅腿",
      "Chimichurrie 潛艦堡",
      "鹽烤豬臀",
      "鹽烤梅花豬",
      "鹽烤梅花牛",
      "士林大香腸",
      "火焰火腿"
    ],
    staple: ["義大利麵"],
    sides: ["凱薩生菜沙拉", "莎莎醬", "時蔬"],
    dessert: ["烤鳳梨"],
    drink: ["水果醋"]
  },
  {
    price: "600",
    minimumGuests: 34,
    previewTitle: "升級亮點",
    highlights: ["阿根廷深海魷魚", "脆皮三層"],
    grill: [
      "檸檬雞翅腿",
      "Chimichurrie 潛艦堡",
      "鹽烤豬臀",
      "鹽烤梅花豬",
      "鹽烤梅花牛",
      "火焰火腿",
      "阿根廷深海魷魚",
      "脆皮三層"
    ],
    staple: ["義大利麵"],
    sides: ["凱薩生菜沙拉", "莎莎醬", "時蔬"],
    dessert: ["烤鳳梨"],
    drink: ["水果醋"]
  },
  {
    price: "700",
    minimumGuests: 29,
    previewTitle: "升級亮點",
    highlights: ["豬肋排", "大白蝦"],
    grill: [
      "檸檬雞翅腿",
      "Chimichurrie 潛艦堡",
      "鹽烤豬臀",
      "鹽烤梅花豬",
      "鹽烤梅花牛",
      "火焰火腿",
      "阿根廷深海魷魚",
      "豬肋排",
      "大白蝦"
    ],
    staple: ["義大利麵"],
    sides: ["凱薩生菜沙拉", "莎莎醬", "時蔬"],
    dessert: ["烤鳳梨"],
    drink: ["水果醋"]
  },
  {
    price: "800",
    minimumGuests: 25,
    previewTitle: "升級亮點",
    highlights: ["裹鹽烤鮮魚", "牛肋條"],
    grill: [
      "檸檬雞翅腿",
      "Chimichurrie 潛艦堡",
      "鹽烤豬臀",
      "鹽烤梅花豬",
      "鹽烤梅花牛",
      "火焰火腿",
      "阿根廷深海魷魚",
      "大白蝦",
      "裹鹽烤鮮魚",
      "牛肋條"
    ],
    staple: ["義大利麵"],
    sides: ["凱薩生菜沙拉", "莎莎醬", "時蔬"],
    dessert: ["烤鳳梨"],
    drink: ["水果醋"]
  },
  {
    price: "1000",
    minimumGuests: 20,
    previewTitle: "升級亮點",
    highlights: ["翼板牛", "蔥蒜白帶魚捲"],
    grill: [
      "檸檬雞翅腿",
      "Chimichurrie 潛艦堡",
      "鹽烤豬臀",
      "鹽烤梅花豬",
      "鹽烤梅花牛",
      "火焰火腿",
      "阿根廷深海魷魚",
      "脆皮三層",
      "大白蝦",
      "裹鹽烤鮮魚",
      "牛肋條",
      "蔥蒜白帶魚卷",
      "翼板牛"
    ],
    staple: ["義大利麵"],
    sides: ["凱薩生菜沙拉", "莎莎醬", "時蔬"],
    dessert: ["烤鳳梨"],
    drink: ["水果醋"]
  },
  {
    price: "1200",
    minimumGuests: 17,
    previewTitle: "升級亮點",
    highlights: ["帶骨牛肋排", "戰斧牛排"],
    grill: [
      "莘香葉雞翅",
      "Chimichurrie 潛艦堡",
      "鹽烤梅花豬",
      "鹽烤梅花牛",
      "火焰火腿",
      "阿根廷深海魷魚",
      "豬肋排",
      "大白蝦",
      "裹鹽烤鮮魚",
      "蔥蒜白帶魚卷",
      "帶骨牛肋排",
      "戰斧牛排"
    ],
    staple: ["義大利麵"],
    sides: ["凱薩生菜沙拉", "莎莎醬", "時蔬"],
    dessert: ["烤鳳梨"],
    drink: ["水果醋"]
  }
];

const categories = [
  { key: "grill", label: "窯烤主菜" },
  { key: "staple", label: "主食" },
  { key: "sides", label: "沙拉與配菜" },
  { key: "dessert", label: "甜點" },
  { key: "drink", label: "飲料" }
] as const;

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="MENU & PACKAGES"
        title="讓菜單配合聚會，而不是讓聚會遷就菜單。"
        description="以下為方案方向。食材會依季節與供應調整，正式內容以活動需求與報價單為準。"
        image={imageUrls.meat}
      />
      <section className="section">
        <div className="container menu-page-container">
          <SectionHeading
            eyebrow="PRICE PACKAGES"
            title={"依照預算，\n快速比較方案內容。"}
            description={"Samba 窯烤外燴依活動性質、預算及人數提供客製化搭配，\n以下為常見方案參考內容，實際菜色可依需求調整。"}
            align="center"
          />
          <aside className="menu-minimum-notice">
            <strong>最低消費 NT$20,000（未稅）</strong>
            <p>
              若未達最低預約人數，仍以最低消費金額計算，並可依實際消費金額升級菜色內容。
            </p>
          </aside>
          <div className="price-plan-grid">
            {plans.map((plan) => (
              <article key={plan.price} className="price-plan-card">
                <header className="price-plan-card__header">
                  <p>每人方案</p>
                  <h2>
                    <strong>{plan.price}</strong>
                    <span>元／人</span>
                  </h2>
                  <p className="price-plan-card__minimum">
                    最低預約人數：<b>{plan.minimumGuests} 位</b>
                  </p>
                  <mark>未稅</mark>
                </header>
                <input
                  id={`menu-plan-${plan.price}`}
                  className="price-plan-card__toggle"
                  type="checkbox"
                />
                <div className="price-plan-card__preview">
                  <p>{plan.previewTitle}</p>
                  {plan.highlights.length > 0 && (
                    <ul>
                      {plan.highlights.map((dish) => (
                        <li key={dish}>{dish}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <label className="price-plan-card__expand" htmlFor={`menu-plan-${plan.price}`}>
                  展開完整菜色 <span>＋</span>
                </label>
                <div className="price-plan-card__details">
                  <div className="price-plan-card__body">
                    {categories.map((category) => (
                      <section key={category.key} className="price-plan-group">
                        <h3>{category.label}</h3>
                        <ul>
                          {plan[category.key].map((dish) => (
                            <li key={dish}>{dish}</li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                  <Link href="/booking#form" className="price-plan-card__link">
                    我要預約 <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="menu-custom-note">
            <p>依活動性質、預算及人數提供客製化搭配。</p>
            <p>若有特殊需求、客製菜單或其他預算規劃，歡迎與我們聯繫討論。</p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
