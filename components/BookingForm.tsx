"use client";

import { FormEvent, useState } from "react";
import {
  BookingFormData,
  submitBookingForm
} from "@/lib/booking";

const eventTypes = [
  "公司聚餐",
  "尾牙／春酒",
  "家庭聚會",
  "生日派對",
  "社區活動",
  "學校活動",
  "婚禮",
  "其他"
];

const budgets = [
  "500",
  "600",
  "700",
  "800",
  "900",
  "1000",
  "1100",
  "1200",
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

export function BookingForm() {
  const [dateUndecided, setDateUndecided] = useState(false);
  const [specialRequirement, setSpecialRequirement] = useState("無");
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
      activityAddress: value(formData, "activityAddress"),
      adults: Number(value(formData, "adults")),
      children: Number(value(formData, "children")),
      eventType: value(formData, "eventType"),
      budgetPerPerson: value(formData, "budgetPerPerson"),
      specialRequirement: value(formData, "specialRequirement"),
      vegetarianGuests:
        specialRequirement === "素食"
          ? Number(value(formData, "vegetarianGuests"))
          : null,
      venueType: value(formData, "venueType"),
      unloadingAccess: value(formData, "unloadingAccess"),
      contactName: value(formData, "contactName"),
      phone: value(formData, "phone"),
      contactPreference: value(formData, "contactPreference"),
      lineDisplayName:
        contactPreference === "我已加入 LINE 官方帳號"
          ? value(formData, "lineDisplayName")
          : "",
      referralSource: value(formData, "referralSource"),
      acceptedTerms: formData.get("acceptedTerms") === "yes"
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
        <h2>已收到您的預約需求，我們會盡快與您聯繫。</h2>
        <p>工作人員將依您提供的活動資訊，協助確認檔期與後續方案。</p>
        <button
          className="button button--dark"
          type="button"
          onClick={() => setSubmitted(false)}
        >
          填寫另一筆需求
        </button>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleBookingSubmit}>
      <div className="booking-section">
        <div className="booking-section__heading">
          <span>01</span>
          <div>
            <p className="eyebrow">EVENT DETAILS</p>
            <h2>活動資訊</h2>
          </div>
        </div>

        <label className="booking-check booking-check--standalone">
          <input
            type="checkbox"
            checked={dateUndecided}
            onChange={(event) => setDateUndecided(event.target.checked)}
          />
          <span>活動日期尚未確定</span>
        </label>

        <div className="booking-fields booking-fields--two">
          {!dateUndecided ? (
            <label className="booking-field">
              <span>活動日期 <b>*</b></span>
              <input name="activityDate" type="date" required />
            </label>
          ) : (
            <label className="booking-field">
              <span>預計日期區間 <b>*</b></span>
              <input
                name="estimatedDateRange"
                required
                placeholder="例如：7/16～7/18"
              />
            </label>
          )}
          <label className="booking-field">
            <span>活動地址 <b>*</b></span>
            <input
              name="activityAddress"
              required
              placeholder="請填寫縣市、區域與完整地址"
            />
          </label>
          <label className="booking-field">
            <span>預估人數（大人）<b>*</b></span>
            <input name="adults" type="number" min="1" required />
          </label>
          <label className="booking-field">
            <span>預估人數（小孩，可填 0）<b>*</b></span>
            <input name="children" type="number" min="0" required />
          </label>
          <label className="booking-field">
            <span>活動類型</span>
            <select name="eventType" defaultValue="">
              <option value="">請選擇</option>
              {eventTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="booking-field">
            <span>活動場地</span>
            <select name="venueType" defaultValue="">
              <option value="">請選擇</option>
              <option>室內</option>
              <option>室外</option>
              <option>半室內（有屋頂，四周部分或完全開放）</option>
              <option>其他</option>
            </select>
          </label>
        </div>

        <fieldset className="booking-choice">
          <legend>工作人員車輛是否可停靠卸貨？ <b>*</b></legend>
          <div className="booking-options">
            {["可停車", "可臨停卸貨", "無法停靠，需步行搬運", "其他"].map(
              (item) => (
                <label className="booking-radio" key={item}>
                  <input
                    type="radio"
                    name="unloadingAccess"
                    value={item}
                    required
                  />
                  <span>{item}</span>
                </label>
              )
            )}
          </div>
        </fieldset>
      </div>

      <div className="booking-section">
        <div className="booking-section__heading">
          <span>02</span>
          <div>
            <p className="eyebrow">MENU REQUEST</p>
            <h2>菜單與飲食需求</h2>
          </div>
        </div>

        <div className="booking-fields booking-fields--two">
          <label className="booking-field">
            <span>希望預算（每人）<b>*</b></span>
            <select name="budgetPerPerson" required defaultValue="">
              <option value="" disabled>請選擇</option>
              {budgets.map((item) => (
                <option key={item} value={item}>
                  {item === "其他" ? item : `NT$ ${item}`}
                </option>
              ))}
            </select>
          </label>
          <label className="booking-field">
            <span>特殊需求 <b>*</b></span>
            <select
              name="specialRequirement"
              required
              value={specialRequirement}
              onChange={(event) => setSpecialRequirement(event.target.value)}
            >
              <option>無</option>
              <option>食物過敏</option>
              <option>素食</option>
              <option>其他</option>
            </select>
          </label>
          {specialRequirement === "素食" && (
            <label className="booking-field booking-field--conditional">
              <span>素食人數 <b>*</b></span>
              <input
                name="vegetarianGuests"
                type="number"
                min="1"
                required
                placeholder="請填寫需要素食的位數"
              />
            </label>
          )}
        </div>
      </div>

      <div className="booking-section">
        <div className="booking-section__heading">
          <span>03</span>
          <div>
            <p className="eyebrow">CONTACT DETAILS</p>
            <h2>聯絡資料</h2>
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
              placeholder="若無法透過 LINE 聯繫，將使用此電話"
            />
          </label>
        </div>

        <fieldset className="booking-choice">
          <legend>聯絡方式 <b>*</b></legend>
          <div className="booking-options">
            {["我已加入 LINE 官方帳號", "我希望使用電話聯繫即可"].map(
              (item) => (
                <label className="booking-radio" key={item}>
                  <input
                    type="radio"
                    name="contactPreference"
                    value={item}
                    required
                    checked={contactPreference === item}
                    onChange={(event) =>
                      setContactPreference(event.target.value)
                    }
                  />
                  <span>{item}</span>
                </label>
              )
            )}
          </div>
        </fieldset>

        {contactPreference === "我已加入 LINE 官方帳號" && (
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
          <span>04</span>
          <div>
            <p className="eyebrow">BOOKING POLICY</p>
            <h2>預約須知</h2>
          </div>
        </div>

        <div className="booking-notice">
          <ul>
            <li>40 位大人以下，最低消費為 NT$20,000；人數不足時將依最低消費升級餐點內容。</li>
            <li>送出表單僅代表提出需求，不代表預約成功；雙方確認內容並完成 30% 訂金後才算正式預約。</li>
            <li>菜單可能依季節食材或供應狀況調整，將以同等品質食材替換。</li>
          </ul>
          <h3>取消與退款</h3>
          <ul>
            <li>活動日前 30 天（含）以前取消：全額退還已付款項。</li>
            <li>活動日前 15～29 天取消：退還已付款項的 50%。</li>
            <li>活動日前 7～14 天取消：訂金不退，可討論延期一次。</li>
            <li>活動日前 6 天內取消：恕不退款。</li>
          </ul>
          <p>颱風或天災等不可抗力因素，雙方可協商延期；若無法延期，再另行協商退款方式。</p>
        </div>

        <label className="booking-check booking-check--terms">
          <input
            type="checkbox"
            name="acceptedTerms"
            value="yes"
            required
          />
          <span>我已閱讀並了解以上預約及取消說明 <b>*</b></span>
        </label>

        <label className="booking-field">
          <span>您是如何得知我們？ <b>*</b></span>
          <select name="referralSource" required defaultValue="">
            <option value="" disabled>請選擇</option>
            {referralSources.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="booking-submit">
        <p><b>*</b> 為必填欄位。送出後工作人員將依聯絡資料回覆。</p>
        <button
          className="button button--dark"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "送出中…" : "送出預約需求"}
        </button>
      </div>
    </form>
  );
}
