export type EventRegistrationData = {
  flowType: "活動報名";
  eventName: string;
  eventDate: string;
  bankLastFive: string;
  checkInName: string;
  phone: string;
  contactPreference: string;
  lineDisplayName: string;
  adultCount: string;
  childCount: string;
  dietaryDetails: string;
  note: string;
  website: string;
};

type EventRegistrationSubmission = EventRegistrationData & {
  submissionId: string;
  submittedAt: string;
  sourceUrl: string;
};

export type EventRegistrationSubmitResult = {
  success: boolean;
  message?: string;
};

export async function submitEventRegistration(
  data: EventRegistrationData
): Promise<EventRegistrationSubmitResult> {
  const webAppUrl = process.env.NEXT_PUBLIC_BOOKING_WEB_APP_URL?.trim();

  if (!webAppUrl) {
    return {
      success: false,
      message: "報名服務尚未完成設定，請改用 LINE 與我們聯繫。"
    };
  }

  const submission: EventRegistrationSubmission = {
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
      message: "目前無法送出報名表單，請稍後再試，或改用 LINE 與我們聯繫。"
    };
  }
}
