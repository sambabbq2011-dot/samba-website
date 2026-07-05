"use client";

import { FormEvent, useState } from "react";
import {
  EventRegistrationData,
  submitEventRegistration
} from "@/lib/eventRegistration";

const participantCounts = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "10+（會另外聯繫您）"
];

const childCounts = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "10+（會另外聯繫您）"
];

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "");
}

export function EventRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [contactPreference, setContactPreference] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);

    const registrationData: EventRegistrationData = {
      flowType: "活動報名",
      eventName: "BBQ 夏日烤肉派對｜7/25（六）",
      eventDate: "2026/7/25（六）",
      bankLastFive: value(formData, "bankLastFive"),
      checkInName: value(formData, "checkInName"),
      phone: value(formData, "phone"),
      contactPreference: value(formData, "contactPreference"),
      lineDisplayName: value(formData, "lineDisplayName"),
      adultCount: value(formData, "adultCount"),
      childCount: value(formData, "childCount"),
      dietaryDetails: value(formData, "dietaryDetails"),
      note: value(formData, "note"),
      website: value(formData, "website")
    };

    setSubmitError("");
    setSubmitting(true);
    const result = await submitEventRegistration(registrationData);
    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      window.location.hash = "form";
    } else {
      setSubmitError(result.message || "目前無法送出報名表單，請稍後再試。");
    }
  }

  if (submitted) {
    return (
      <div className="booking-success event-registration-success" role="status" aria-live="polite">
        <span>✓</span>
        <p className="eyebrow">REGISTRATION SENT</p>
        <h2>已收到您的報名資料</h2>
        <p>我們會透過官方 LINE 與您確認報名資訊與款項，請留意訊息。</p>
        <a href="/event" className="button button--dark">
          返回活動頁
        </a>
      </div>
    );
  }

  return (
    <form id="form" className="booking-form event-registration-form" onSubmit={handleSubmit}>
      <label className="booking-honeypot" aria-hidden="true">
        請勿填寫此欄位
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="booking-trust" aria-label="活動報名資訊">
        <span>活動日期：2026/7/25（六）</span>
        <span>報名截止時間：2026/7/24（五）</span>
        <span>報名採預先付款制</span>
      </div>

      <section className="booking-section">
        <div className="booking-section__heading">
          <span>01</span>
          <div>
            <p className="eyebrow">PARTICIPANTS</p>
            <h2>參加資訊</h2>
          </div>
        </div>

        <div className="booking-fields booking-fields--two">
          <label className="booking-field">
            <span>大人人數 <b>*</b></span>
            <select name="adultCount" required defaultValue="1">
              {participantCounts.map((count) => (
                <option key={count}>{count}</option>
              ))}
            </select>
          </label>

          <label className="booking-field">
            <span>小孩人數</span>
            <select name="childCount" defaultValue="0">
              {childCounts.map((count) => (
                <option key={count}>{count}</option>
              ))}
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
        </div>
      </section>

      <section className="booking-section">
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
            <input
              type="text"
              name="checkInName"
              maxLength={10}
              autoComplete="name"
              required
            />
          </label>

          <label className="booking-field">
            <span>手機號碼 <b>*</b></span>
            <input
              type="tel"
              name="phone"
              maxLength={10}
              autoComplete="tel"
              inputMode="tel"
              placeholder="若無法使用 LINE 聯繫，將使用此電話"
              required
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
      </section>

      <section className="booking-section">
        <div className="booking-section__heading">
          <span>03</span>
          <div>
            <p className="eyebrow">PAYMENT</p>
            <h2>匯款資訊</h2>
            <p>
              銀行代碼 (822) 141540235579
              <br />
              請先完成匯款，再填寫匯款帳號後五碼。
            </p>
          </div>
        </div>

        <div className="booking-fields booking-fields--two">
          <label className="booking-field">
            <span>匯款帳號後五碼 <b>*</b></span>
            <input
              type="text"
              name="bankLastFive"
              inputMode="numeric"
              pattern="[0-9]{5}"
              maxLength={5}
              placeholder="例如：12345"
              required
            />
            <small>工作人員確認款項後，才算完成報名。</small>
          </label>
        </div>
      </section>

      <div className="booking-submit">
        <p className="booking-submit__note">
          送出後不代表報名已完成，工作人員確認款項後會透過官方 LINE 回覆。
        </p>
        <button className="button button--dark" type="submit" disabled={submitting}>
          {submitting ? "送出中..." : "送出報名資料"}
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
