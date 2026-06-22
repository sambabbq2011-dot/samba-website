export type BookingFormData = {
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
};

export type BookingSubmitResult = {
  success: boolean;
};

/**
 * 預約表單的單一送出入口。
 * 目前只回傳成功；未來串接 Google Sheets、Email 或 API 時，
 * 請在這個 function 中加入實際傳送邏輯。
 */
export async function submitBookingForm(
  _data: BookingFormData
): Promise<BookingSubmitResult> {
  return { success: true };
}
