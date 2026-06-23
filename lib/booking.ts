export type BookingFormData = {
  flowType: "inquiry" | "booking";
  activityDate: string;
  estimatedDateRange: string;
  activityRegion: string;
  guestRange: string;
  eventType: string;
  budgetPerPerson: string;
  contactName: string;
  phone: string;
  contactPreference: string;
  lineDisplayName: string;
  additionalNeeds: string;
  activityAddress: string;
  adults: number | null;
  children: number | null;
  venueType: string;
  unloadingAccess: string;
  dietaryDetails: string;
  referralSource: string;
  acceptedTerms: boolean;
  website: string;
};

type BookingSubmission = BookingFormData & {
  submissionId: string;
  submittedAt: string;
  sourceUrl: string;
};

export type BookingSubmitResult = {
  success: boolean;
  message?: string;
};

/**
 * 預約表單的單一送出入口。
 * Google Apps Script Web App URL 由 NEXT_PUBLIC_BOOKING_WEB_APP_URL 提供。
 * GitHub Pages 跨網域 POST 使用 text/plain + no-cors，避免觸發預檢請求。
 */
export async function submitBookingForm(
  data: BookingFormData
): Promise<BookingSubmitResult> {
  const webAppUrl = process.env.NEXT_PUBLIC_BOOKING_WEB_APP_URL?.trim();

  if (!webAppUrl) {
    return {
      success: false,
      message: "預約服務尚未完成設定，請改用 LINE 或電話與我們聯繫。"
    };
  }

  const submission: BookingSubmission = {
    ...data,
    submissionId: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    sourceUrl: window.location.href
  };

  try {
    await fetch(webAppUrl, {
      method: "POST",
      mode: "no-cors",
      redirect: "follow",
      keepalive: true,
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(submission)
    });

    return { success: true };
  } catch {
    return {
      success: false,
      message: "目前無法送出表單，請稍後再試，或改用 LINE 與我們聯繫。"
    };
  }
}
