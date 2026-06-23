"use client";

import { FormEvent, useState } from "react";
import { BookingFormData, submitBookingForm } from "@/lib/booking";

const regions = [
  "台北市",
  "新北市",
  "桃園市",
  "新竹縣市",
  "苗栗",
  "宜蘭",
  "台中以南",
  "其他地區"
];

const guestRanges = [
  "20 人以下",
  "20–40 人",
  "40–80 人",
  "80–150 人",
  "150 人以上",
  "尚未確定"
];

const budgets = [
  "NT$500／人",
  "NT$600／人",
  "NT$700／人",
  "NT$800／人",
  "NT$1000／人",
  "NT$1200／人",
  "不確定，請協助建議",
  "其他"
];

const eventTypes = [
  "公司活動",
  "家庭日",
  "私人聚會",
  "生日派對",
  "婚禮／戶外派對",
  "露營活動",
  "社區活動",
  "寵物友善聚會",
  "其他"
];

const referralSources = [
  "Facebook",
  "Instagram",
  "LINE 官方帳號",
  "親友介紹",
  "曾參加過 Samba 活動",
  "其他"
];

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "");
}

function optionalNumber(formData: FormData, key: string) {
  const fieldValue = value(formData, key);
  return fieldValue ? Number(fieldValue) : null;
}

export function BookingForm() {
  const [flowType, setFlowType] = useState<"inquiry" | "booking" | null>(null);
  const [dateUndecided, setDateUndecided] = useState(false);
  const [contactPreference, setContactPreference] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleBookingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const bookingData: BookingFormData = {
      flowType: flowType || "inquiry",
      activityDate: value(formData, "activityDate"),
      estimatedDateRange: value(formData, "estimatedDateRange"),
      activityRegion: value(formData, "activityRegion"),
      guestRange: value(formData, "guestRange"),
      eventType: value(formData, "eventType"),
      budgetPerPerson: value(formData, "budgetPerPerson"),
      contactName: value(formData, "contactName"),
      phone: value(formData, "phone"),
      contactPreference: value(formData, "contactPreference"),
      lineDisplayName: value(formData, "lineDisplayName"),
      additionalNeeds: value(formData, "additionalNeeds"),
      activityAddress: value(formData, "activityAddress"),
      adults: optionalNumber(formData, "adults"),
      children: optionalNumber(formData, "children"),
      venueType: value(formData, "venueType"),
      unloadingAccess: value(formData, "unloadingAccess"),
      dietaryDetails: value(formData, "dietaryDetails"),
      referralSource: value(formData, "referralSource"),
      acceptedTerms: formData.get("acceptedTerms") === "yes",
      website: value(formData, "website")
    };

    setSubmitError("");
    setSubmitting(true);
    const result = await submitBookingForm(bookingData);
    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      window.location.hash = "form";
    } else {
      setSubmitError(result.message || "目前無法送出表單，請稍後再試。");
    }
  }

  if (submitted) {
    return (
      <div className="booking-success" role="status" aria-live="polite">
        <span aria-hidden="true">✓</span>
        <p className="eyebrow">REQUEST RECEIVED</p>
        <h2>已收到您的詢問，Samba 將盡快與您聯繫</h2>
        <p>專人將依活動日期、地區、人數與預算方向，協助確認檔期並建議合適方案。</p>
        <button
          className="button button--dark"
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFlowType(null);
          }}
        >
          返回諮詢與預約選擇
        </button>
      </div>
    );
  }

  if (!flowType) {
    return (
      <div className="booking-flow">
        <div className="booking-flow__grid">
          <article className="booking-flow-card booking-flow-card--inquiry">
            <span className="booking-flow-card__number">01</span>
            <p className="eyebrow">QUICK INQUIRY</p>
            <h2>詢問檔期與初步報價</h2>
            <p>填寫約 60 秒。先提供基本資訊，我們會協助確認檔期與大致方案。</p>
            <ul>
              <li>適合第一次詢問</li>
              <li>只需日期、地區、人數與預算方向</li>
              <li>其他細節可後續再討論</li>
            </ul>
            <button
              className="button button--dark"
              type="button"
              onClick={() => setFlowType("inquiry")}
            >
              我要先諮詢
            </button>
          </article>

          <article className="booking-flow-card booking-flow-card--booking">
            <span className="booking-flow-card__number">02</span>
            <p className="eyebrow">DETAILED BOOKING</p>
            <h2>預約（仔細詢問）</h2>
            <p>活動資訊較明確時，可一次填寫完整資料，方便我們更快確認細節與規劃內容。</p>
            <ul>
              <li>適合日期與場地較確定的活動</li>
              <li>包含地址、人數明細與場地資訊</li>
              <li>減少後續重複補充資料</li>
            </ul>
            <button
              className="button button--orange"
              type="button"
              onClick={() => setFlowType("booking")}
            >
              我要仔細預約
            </button>
          </article>
        </div>
      </div>
    );
  }

  return (
    <form className="booking-form booking-form--quick" onSubmit={handleBookingSubmit}>
      <input
        className="booking-honeypot"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="booking-form__toolbar">
        <button
          className="booking-form__back"
          type="button"
          onClick={() => setFlowType(null)}
        >
          ← 重新選擇
        </button>
        <span>
          目前填寫：{flowType === "booking" ? "預約（仔細詢問）" : "諮詢（簡易詢問）"}
        </span>
      </div>

      <div className="booking-trust" aria-label="服務資訊">
        <span>北台灣為主，其他地區歡迎洽詢</span>
        <span>最低消費 NT$20,000 起</span>
        <span>專人確認檔期與建議方案</span>
      </div>

      <div className="booking-section">
        <div className="booking-section__heading">
          <span>01</span>
          <div>
            <p className="eyebrow">EVENT BASICS</p>
            <h2>活動基本資訊</h2>
          </div>
        </div>

        <label className="booking-check booking-check--standalone">
          <input
            type="checkbox"
            checked={dateUndecided}
            onChange={(event) => setDateUndecided(event.target.checked)}
          />
          <span>日期尚未確定</span>
        </label>

        <div className="booking-fields booking-fields--two">
          {!dateUndecided ? (
            <label className="booking-field">
              <span>活動日期 <b>*</b></span>
              <input name="activityDate" type="date" required />
            </label>
          ) : (
            <label className="booking-field booking-field--conditional">
              <span>大約日期區間 <b>*</b></span>
              <input
                name="estimatedDateRange"
                required
                placeholder="例如：7/16～7/18"
              />
            </label>
          )}

          {flowType === "booking" ? (
            <>
              <label className="booking-field booking-field--full">
                <span>活動地點 <b>*</b></span>
                <input
                  name="activityAddress"
                  required
                  placeholder="完整地址、某露營區"
                />
              </label>
              <label className="booking-field">
                <span>大人人數 <b>*</b></span>
                <input name="adults" type="number" min="1" required />
              </label>
              <label className="booking-field">
                <span>小孩人數 <b>*</b></span>
                <input name="children" type="number" min="0" required />
              </label>
            </>
          ) : (
            <>
              <label className="booking-field">
                <span>活動地區 <b>*</b></span>
                <select name="activityRegion" required defaultValue="">
                  <option value="" disabled>請選擇縣市或大約區域</option>
                  {regions.map((item) => <option key={item}>{item}</option>)}
                </select>
                <small>先填縣市或大約區域即可，完整地址可後續確認。</small>
              </label>

              <label className="booking-field">
                <span>預估人數 <b>*</b></span>
                <select name="guestRange" required defaultValue="">
                  <option value="" disabled>請選擇</option>
                  {guestRanges.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            </>
          )}

          <label className="booking-field">
            <span>預算方向 <b>*</b></span>
            <select name="budgetPerPerson" required defaultValue="">
              <option value="" disabled>請選擇</option>
              {budgets.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          <label className="booking-field booking-field--full">
            <span>活動類型 <b>*</b></span>
            <select name="eventType" required defaultValue="">
              <option value="" disabled>請選擇</option>
              {eventTypes.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>

          {flowType === "booking" && (
            <>
              <label className="booking-field">
                <span>活動場地</span>
                <select name="venueType" defaultValue="">
                  <option value="">尚未確定／稍後補充</option>
                  <option>室內</option>
                  <option>室外</option>
                  <option>半室內（有屋頂，四周部分或完全開放）</option>
                  <option>其他</option>
                </select>
              </label>
              <label className="booking-field">
                <span>車輛停靠與卸貨</span>
                <select name="unloadingAccess" defaultValue="">
                  <option value="">尚未確定／稍後補充</option>
                  <option>可停車</option>
                  <option>可臨停卸貨</option>
                  <option>無法停靠，需步行搬運</option>
                  <option>其他</option>
                </select>
              </label>
              <label className="booking-field booking-field--full">
                <span>素食、過敏原或特殊飲食</span>
                <textarea
                  name="dietaryDetails"
                  rows={4}
                  placeholder="可填寫人數、過敏食材與其他飲食限制"
                />
              </label>
              <label className="booking-field booking-field--full">
                <span>您是如何得知我們？（選填）</span>
                <select name="referralSource" defaultValue="">
                  <option value="">不填也可以</option>
                  {referralSources.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            </>
          )}
        </div>
      </div>

      <div className="booking-section">
        <div className="booking-section__heading">
          <span>02</span>
          <div>
            <p className="eyebrow">CONTACT</p>
            <h2>聯絡方式</h2>
          </div>
        </div>

        <div className="booking-fields booking-fields--two">
          <label className="booking-field">
            <span>您的稱呼 <b>*</b></span>
            <input name="contactName" required autoComplete="name" />
          </label>
          <label className="booking-field">
            <span>手機號碼 <b>*</b></span>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="若無法使用 LINE 聯繫，將使用此電話"
            />
          </label>
        </div>

        <fieldset className="booking-choice">
          <legend>希望如何聯絡？ <b>*</b></legend>
          <div className="booking-options">
            {[
              "LINE 聯繫較方便，送出後請加入官方 LINE",
              "電話聯繫較方便，請注意陌生來電"
            ].map((item) => (
              <label className="booking-radio" key={item}>
                <input
                  type="radio"
                  name="contactPreference"
                  value={item}
                  required
                  checked={contactPreference === item}
                  onChange={(event) => setContactPreference(event.target.value)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {contactPreference ===
          "LINE 聯繫較方便，送出後請加入官方 LINE" && (
          <label className="booking-field booking-field--conditional">
            <span>LINE 顯示名稱 <b>*</b></span>
            <input
              name="lineDisplayName"
              required
              placeholder="方便工作人員確認您的身分"
            />
          </label>
        )}
      </div>

      <div className="booking-section">
        <div className="booking-section__heading">
          <span>03</span>
          <div>
            <p className="eyebrow">MORE DETAILS</p>
            <h2>補充需求</h2>
          </div>
        </div>

        <label className="booking-field">
          <span>還有什麼想先告訴我們？</span>
          <textarea
            name="additionalNeeds"
            rows={5}
            placeholder="例如：素食、過敏、場地限制、希望菜色、活動流程、是否需要特別安排等"
          />
        </label>
      </div>

      {flowType === "booking" && (
        <section className="booking-policy">
          <p className="eyebrow">BOOKING NOTICE</p>
          <h2>預約前提醒</h2>
          <ul>
            <li>送出表單不代表預約完成，確認檔期與訂金後才正式保留。</li>
            <li>40 位以下以最低消費 NT$20,000 計。</li>
            <li>取消與延期規則請詳閱。</li>
          </ul>

          <details className="booking-policy__details">
            <summary>
              <span>查看完整預約與取消說明</span>
              <span aria-hidden="true">⌄</span>
            </summary>
            <div className="booking-policy__content">
              <h3>完整預約與取消說明</h3>
              <p>
                送出表單不代表預約完成。雙方確認檔期、活動內容與報價後，需完成訂金支付，才會正式保留檔期。
              </p>
              <p>取消與退款規則如下：</p>
              <ul>
                <li>活動前 30 天（含）以前取消，訂金全額退還。</li>
                <li>活動前 15～29 天取消，訂金退還 50%。</li>
                <li>活動前 7～14 天取消，訂金不退還，但可延期一次。</li>
                <li>活動前 6 天內取消，訂金不退還。</li>
              </ul>
              <p>
                若因颱風、豪雨、政府公告停班停課、場地臨時不可使用，或其他不可抗力因素導致活動無法如期舉辦，雙方可協調延期或其他處理方式。
              </p>
              <p>
                40 位以下以最低消費 NT$20,000 計，實際菜單可依人數與預算協助規劃。
              </p>
            </div>
          </details>

          <label className="booking-check booking-check--terms">
            <input
              type="checkbox"
              name="acceptedTerms"
              value="yes"
              required
            />
            <span>我已了解預約方式與取消規則 <b>*</b></span>
          </label>
        </section>
      )}

      <div className="booking-submit">
        {flowType === "booking" && (
          <p className="booking-submit__note">
            送出表單不代表預約完成，雙方確認內容並完成訂金後，才正式保留檔期。
          </p>
        )}
        <button
          className="button button--dark"
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? "送出中…"
            : flowType === "booking"
              ? "送出完整資料，請 Samba 協助確認"
              : "送出詢問，請 Samba 協助規劃"}
        </button>
      </div>
      {submitError && (
        <p className="booking-submit-error" role="alert">
          {submitError}
        </p>
      )}
    </form>
  );
}
