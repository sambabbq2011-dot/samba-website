import type { Metadata } from "next";
import { EventRegistrationForm } from "@/components/EventRegistrationForm";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "活動報名",
  "填寫 Samba BBQ 夏日烤肉派對報名資料，提供匯款後五碼、報到名字、手機與參加人數。",
  "/event/register"
);

export default function EventRegisterPage() {
  return (
    <main>
      <section className="section booking-page event-registration-page">
        <div className="container booking-page__intro">
          <p className="eyebrow">EVENT REGISTRATION</p>
          <h1>BBQ 夏日烤肉派對報名表</h1>
          <p className="event-registration-intro-copy">
            請先填寫報名資料，再完成活動費用匯款。工作人員確認後，會透過官方 LINE 或者電話與您回覆報名狀態。
          </p>
        </div>

        <div className="container">
          <EventRegistrationForm />
        </div>
      </section>
    </main>
  );
}
