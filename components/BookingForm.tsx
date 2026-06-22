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
  const [dateUndecided, setDateUndecided] = useState(false);
  const [contactPreference, setContactPreference] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleBookingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const bookingData: BookingFormData = {
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
      referralSource: value(formData, "referralSource")
    };

    setSubmitting(true);
    const result = await submitBookingForm(bookingData);
    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      window.location.hash = "form";
    }
  }

  if (submitted) {
    return (
      <div className="booking-success" role="status" aria-live="polite">
        <span aria-hidden="true">✓</span>
        <p className="eyebrow">REQUEST RECEIVED</p>
        <h2>已收到您的詢問，我們會盡快與您聯繫。</h2>
        <p>專人將依活動日期、地區、人數與預算方向，協助確認檔期並建議合適方案。</p>
        <button
          className="button button--dark"
          type="button"
          onClick={() => setSubmitted(false)}
        >
          填寫另一筆詢問
        </button>
      </div>
    );
  }

  return (
    <form className="booking-form booking-form--quick" onSubmit={handleBookingSubmit}>
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

      <details className="booking-details">
        <summary>
          <span>
            <b>我已確定活動資訊，要填寫完整資料</b>
            <small>選填，可補充地址、人數明細、場地與飲食需求</small>
          </span>
          <span aria-hidden="true">＋</span>
        </summary>
        <div className="booking-details__content">
          <div className="booking-fields booking-fields--two">
            <label className="booking-field booking-field--full">
              <span>完整活動地址</span>
              <input name="activityAddress" placeholder="縣市、區域與完整地址" />
            </label>
            <label className="booking-field">
              <span>大人人數</span>
              <input name="adults" type="number" min="0" />
            </label>
            <label className="booking-field">
              <span>小孩人數</span>
              <input name="children" type="number" min="0" />
            </label>
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
          </div>

          <div className="booking-notice booking-notice--secondary">
            <p>正式保留檔期前，專人會再與您確認完整菜單、報價、訂金，以及預約與取消方式。</p>
          </div>
        </div>
      </details>

      <div className="booking-submit">
        <div>
          <p><b>*</b> 為必填欄位。</p>
          <p className="booking-submit__note">
            送出詢問不代表預約完成。實際檔期、菜單、報價與訂金資訊，將由專人確認後回覆。
          </p>
        </div>
        <button
          className="button button--dark"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "送出中…" : "送出詢問，請 Samba 協助規劃"}
        </button>
      </div>
    </form>
  );
}
