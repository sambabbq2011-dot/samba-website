"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span>✓</span>
        <h2>資料已整理完成</h2>
        <p>
          此示範版尚未串接正式收件服務。部署前請在這裡接上 Email、LINE 或表單 API。
        </p>
        <button className="text-button" onClick={() => setSubmitted(false)}>
          返回表單
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          您的稱呼
          <input name="name" required placeholder="王小姐" />
        </label>
        <label>
          聯絡電話
          <input name="phone" type="tel" required placeholder="09xx-xxx-xxx" />
        </label>
      </div>
      <div className="form-row">
        <label>
          活動日期
          <input name="date" type="date" />
        </label>
        <label>
          預計人數
          <input name="guests" type="number" min="1" placeholder="例如：80" />
        </label>
      </div>
      <label>
        活動地點
        <input name="location" placeholder="縣市／場地名稱" />
      </label>
      <label>
        想告訴我們的事
        <textarea
          name="message"
          rows={5}
          placeholder="活動形式、預算、餐飲偏好或其他需求"
        />
      </label>
      <button className="button button--dark" type="submit">
        送出活動需求
      </button>
      <p className="form-note">送出即表示同意我們為本次活動聯絡使用上述資料。</p>
    </form>
  );
}
