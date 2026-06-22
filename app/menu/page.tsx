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
    grill: [
      "檸檬雞翅腿",
      "Chimichurrie 潛艦堡",
      "鹽烤豬臀",
      "鹽烤梅花豬",
      "鹽烤梅花牛",
      "S 香腸",
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
    grill: [
      "檸檬雞翅腿",
      "Chimichurrie 潛艦堡",
      "鹽烤豬臀",
      "鹽烤梅花豬",
      "鹽烤梅花牛",
      "脆皮三層",
      "火焰火腿",
      "厚切深海魷魚"
    ],
    staple: ["義大利麵"],
    sides: ["凱薩生菜沙拉", "莎莎醬", "時蔬"],
    dessert: ["烤鳳梨"],
    drink: ["水果醋"]
  },
  {
    price: "700",
    minimumGuests: 29,
    grill: [
      "檸檬雞翅腿",
      "Chimichurrie 潛艦堡",
      "鹽烤豬臀",
      "鹽烤梅花豬",
      "鹽烤梅花牛",
      "豬肋排",
      "火焰火腿",
      "深海魷魚",
      "天使蝦"
    ],
    staple: ["義大利麵"],
    sides: ["凱薩生菜沙拉", "莎莎醬", "時蔬"],
    dessert: ["烤鳳梨"],
    drink: ["水果醋"]
  },
  {
    price: "800",
    minimumGuests: 25,
    grill: [
      "檸檬雞翅腿",
      "Chimichurrie 潛艦堡",
      "鹽烤豬臀",
      "鹽烤梅花豬",
      "鹽烤梅花牛",
      "牛肋條",
      "火焰火腿",
      "深海魷魚",
      "大白蝦",
      "裹鹽烤鮮魚"
    ],
    staple: ["義大利麵"],
    sides: ["凱薩生菜沙拉", "莎莎醬", "時蔬"],
    dessert: ["烤鳳梨"],
    drink: ["水果醋"]
  },
  {
    price: "1000",
    minimumGuests: 20,
    grill: [
      "檸檬雞翅腿",
      "Chimichurrie 潛艦堡",
      "鹽烤豬臀",
      "鹽烤梅花豬",
      "火焰火腿",
      "脆皮三層",
      "鹽烤梅花牛",
      "翼板牛",
      "牛肋條",
      "深海魷魚",
      "原味烤蝦",
      "蔥蒜白帶魚卷",
      "裹鹽烤鮮魚"
    ],
    staple: ["義大利麵"],
    sides: ["凱薩生菜沙拉", "莎莎醬", "時蔬"],
    dessert: ["烤鳳梨"],
    drink: ["水果醋"]
  },
  {
    price: "1200",
    minimumGuests: 17,
    grill: [
      "莘香葉雞翅",
      "Chimichurrie 潛艦堡",
      "鹽烤梅花豬",
      "火焰火腿",
      "豬肋排",
      "鹽烤梅花牛",
      "帶骨牛肋排",
      "戰斧牛排",
      "蔥蒜白帶魚卷",
      "厚切深海魷魚",
      "烤蝦",
      "裹鹽烤鮮魚"
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
            description="Samba 窯烤外燴依活動性質、預算及人數提供客製化搭配，以下為常見方案參考內容，實際菜色可依需求調整。"
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
              </article>
            ))}
          </div>
          <div className="menu-custom-note">
            <p>依活動性質、預算及人數提供客製化搭配。</p>
            <p>若有特殊需求、客製菜單或其他預算規劃，歡迎與我們聯繫討論。</p>
            <Link href="/contact" className="button button--dark">
              聯絡我們討論
            </Link>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
