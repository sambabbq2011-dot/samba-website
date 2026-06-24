import type { Metadata } from "next";
import Image from "next/image";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { createMetadata } from "@/lib/metadata";
import { imageUrls } from "@/lib/site";

export const metadata: Metadata = createMetadata(
  "關於我們",
  "認識 Samba 窯烤從 2011 年開始的故事，以及我們如何用行動巴西窯烤為全台活動創造熱情體驗。",
  "/about"
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT SAMBA"
        title="一團火，烤進每場相聚。"
        description="我們相信，最好的料理不只被吃掉，也會留在一群人的共同記憶裡。"
        image={imageUrls.fire}
      />
      <section className="section">
        <div className="container split-grid split-grid--center">
          <div>
            <SectionHeading
              eyebrow="SINCE 2011"
              title={"一群愛烤肉的人，\n決定把熱情帶上路。"}
            />
          </div>
          <div className="prose">
            <p>
              Samba 窯烤創立於 2011
              年，從戶外行動巴西窯烤出發。沒有固定餐廳的邊界，我們把設備、食材與團隊帶到活動現場，讓賓客看見炭火、聞到香氣，也參與料理完成的每一刻。
            </p>
            <p>
              多年來，我們服務企業、婚禮、私人派對與各式大型活動。場地會變、賓客會變，但對食材、節奏與待客的堅持不變。
            </p>
          </div>
        </div>
      </section>
      <section className="section section--dark">
        <div className="container values-grid">
          {[
            ["01", "真火真味", "用炭火與時間，帶出食材直接而迷人的風味。"],
            ["02", "現場有感", "料理不躲在後場，火焰、香氣與現切都成為活動的一部分。"],
            ["03", "熱情款待", "從前期溝通到最後收整，用俐落而有人味的方式完成服務。"],
            ["04", "彈性到位", "依場地、人數與活動流程調整，不讓制式方案綁住一場好聚會。"]
          ].map(([number, title, text]) => (
            <article key={number} className="value-card">
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container media-feature">
          <div className="media-feature__image">
            <Image src={imageUrls.team} alt="Samba 窯烤料理團隊" fill sizes="(max-width: 900px) 100vw, 55vw" />
          </div>
          <div>
            <p className="eyebrow">OUR PROMISE</p>
            <h2>
              把複雜留給我們，
              <br className="mobile-comma-break" />
              把相聚留給你。
            </h2>
            <p>
              我們會在活動前確認場地、電力、水源、進撤場時間與賓客需求。當天你只需要好好招呼重要的人，其他的交給 Samba。
            </p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
