import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { assetPath } from "@/lib/paths";

export const metadata: Metadata = createMetadata(
  "event",
  "Samba 橋下烤肉活動每月限定報名場，不用揪滿一整團，也能體驗現場窯烤。",
  "/event"
);

const eventInfo = [
  { label: "日期", value: "2026/8/22（六）" },
  { label: "報名截止時間", value: "2026/8/21（五）" },
  { label: "活動時間", value: "18:00～20:00" },
  { label: "活動地點", value: "台北市河濱公園" }
];

const prices = [
  { label: "成人", value: "NT$500 / 位" },
  { label: "6～12 歲兒童", value: "NT$250 / 位" },
  { label: "6 歲以下", value: "免費" }
];

const eventMenu = [
  {
    title: "窯烤主菜",
    items: [
      "檸檬雞翅腿",
      "Chimichurrie 潛艦堡",
      "鹽烤豬臀",
      "鹽烤梅花豬",
      "鹽烤梅花牛",
      "士林大香腸",
      "火焰火腿"
    ]
  },
  { title: "主食", items: ["義大利麵"] },
  { title: "沙拉與配菜", items: ["凱薩生菜沙拉", "莎莎醬", "時蔬"] },
  { title: "甜點", items: ["烤鳳梨"] },
  { title: "飲料", items: ["水果醋"] }
];

const refundRules = [
  "8/19（含）以前取消：全額退款",
  "8/20～8/21 取消：退還 50% 活動費用",
  "8/22 活動當天取消或未到場：恕不退款"
];

const weatherNotes = [
  "如因颱風等不可抗力因素，主辦單位宣布取消活動，將全額退款。",
  "本活動場地位於橋下，設有遮雨空間，一般下雨天照常舉辦，恕不因雨天因素受理退款。"
];

export default function BridgeBbqPage() {
  return (
    <main>
      <section className="section bridge-event-page">
        <div className="container">
          <div className="bridge-event-heading">
            <p className="eyebrow">MONTHLY BBQ EVENT</p>
            <h1>
              橋下烤肉活動｜
              <span className="mobile-line-break">八月限定報名場</span>
            </h1>
            <p>
              不用揪滿一整團，也能一起體驗 Samba 現場窯烤。Samba 將不定期推出戶外窯烤活動，名額有限，採事先報名制。
            </p>
          </div>

          <article className="bridge-event-card" aria-labelledby="bridge-bbq-title">
            <div className="bridge-event-card__header">
              <p className="eyebrow">2026 AUGUST</p>
              <h2 id="bridge-bbq-title">BBQ 仲夏火烤音樂派對｜8/22（六）</h2>
              <p>
                名額有限，完成付款後即保留席位，
                <span className="mobile-line-break">額滿即停止報名。</span>
              </p>
            </div>

            <div className="bridge-event-card__body">
              <div className="bridge-event-info-grid">
                {eventInfo.map((item) => (
                  <div className="bridge-event-info" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>

              <section className="bridge-event-block">
                <div className="bridge-event-price-grid">
                  {prices.map((price) => (
                    <div className="bridge-event-price" key={price.label}>
                      <span>{price.label}</span>
                      <strong>{price.value}</strong>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bridge-event-block bridge-event-highlight">
                <h3>報名與付款方式</h3>
                <p>本活動採預先付款報名制，完成付款後即保留名額。</p>
                <div className="bridge-event-highlight__action-row">
                  <div>
                    <p>報名流程：填寫報名表單 → 匯款活動費用 → 工作人員確認 → 報名完成</p>
                    <p>付款完成後，我們會透過官方 LINE 與您確認報名資訊，請放心。</p>
                  </div>
                  <Link href="/event/register" className="bridge-event-register-tab">
                    馬上報名
                  </Link>
                </div>
              </section>

              <section className="bridge-event-block">
                <h3>當日菜單</h3>
                <p className="bridge-event-block__intro">
                  當日會準備一道固定菜單以外的研發中品項，依當日備料與現場烤製安排提供，歡迎大家一起嚐鮮。
                </p>
                <div className="bridge-event-menu-grid">
                  {eventMenu.map((group) => (
                    <div className="bridge-event-menu-group" key={group.title}>
                      <h4>{group.title}</h4>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bridge-event-block">
                <h3>活動內容</h3>
                <p>
                  Samba 團隊會在現場準備窯烤餐點、餐具及烤製服務，不需要自己備料，也不用動手烤，抵達現場就能輕鬆享用熱騰騰的窯烤料理。
                </p>
                <p>
                  這次除了巴西窯烤，我們也邀請駐唱歌手「洪番薯」老師及團隊帶來現場演唱。
                  伴著音樂享用美食，和朋友、家人一起度過輕鬆又熱鬧的夏夜。
                </p>
                <p>
                  現場也開放互動點歌，當熟悉的旋律響起，歡迎大家跟著一起唱，把橋下變成熱鬧的夏夜音樂現場！
                </p>
                <p>
                  活動場地為戶外橋下空間，歡迎自備
                  <span className="bridge-event-inline-highlight">野餐墊</span>
                  或
                  <span className="bridge-event-inline-highlight">休閒椅</span>
                  ，也建議攜帶
                  <span className="bridge-event-inline-highlight">防蚊用品</span>
                  ，讓用餐過程更加舒適。
                </p>
              </section>

              <div className="bridge-event-links">
                <a
                  href="https://maps.app.goo.gl/M4QXfogZqajzr9pZ6"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Map 連結
                </a>
                <span className="bridge-event-map-label">彩虹河濱公園少棒場</span>
                <p>
                  <strong>停車資訊：</strong>
                  依河濱公園周邊停車格與現場公告為主。
                </p>
              </div>

              <section className="bridge-event-block">
                <h3>詳細集合點</h3>
                <p className="bridge-event-block__intro">
                  可以先導航到「彩虹河濱公園少棒場」，抵達後旁邊會看到一座橋，我們的集合地點就在橋底下。可以參考以下圖片，會比較好找。
                </p>
                <img
                  className="bridge-event-meeting-image"
                  src={assetPath("/images/event-bridge-meeting-point.png")}
                  alt="橋下烤肉活動詳細集合點"
                />
              </section>

              <section className="bridge-event-block">
                <h3>路線導航影片</h3>
                <p className="bridge-event-block__intro">
                  Google 導航到這個地點可能會有一點誤差，建議大家出發前先看一下路線影片，先有個方向概念，現場會比較好找，也比較不容易走錯。
                </p>
                <div className="bridge-event-video-frame">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    src={assetPath("/videos/samba-route-guide.mp4")}
                  >
                    您的瀏覽器不支援影片播放。
                  </video>
                </div>
              </section>

              <section className="bridge-event-block">
                <h3>取消與退款說明</h3>
                <p className="bridge-event-block__intro">
                  若報名後臨時無法參加，可依以下規則辦理取消：
                </p>
                <ul>
                  {refundRules.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
                <p className="bridge-event-block__note">
                  因活動需提前準備食材、人力與座位，敬請於期限內提前告知。
                  若需取消，請透過官方 LINE 聯繫我們，工作人員確認後會協助辦理退款。
                </p>
              </section>

              <section className="bridge-event-block">
                <h3>天候說明</h3>
                <ul>
                  {weatherNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </section>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
