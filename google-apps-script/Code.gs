const SHEET_HEADERS = [
  "submissionId",
  "伺服器收件時間",
  "前端送出時間",
  "表單類型",
  "活動日期",
  "日期區間",
  "活動地區",
  "活動地點",
  "預估人數",
  "大人人數",
  "小孩人數",
  "預算方向",
  "活動類型",
  "活動場地",
  "車輛停靠與卸貨",
  "飲食需求",
  "補充需求",
  "稱呼",
  "手機號碼",
  "聯絡偏好",
  "LINE 顯示名稱",
  "得知管道",
  "已了解預約規則",
  "來源頁面",
  "LINE 推播狀態",
  "報名活動名稱",
  "匯款帳號後五碼"
];

const FAILED_SUBMISSION_HEADERS = [
  "伺服器收件時間",
  "錯誤訊息",
  "表單類型",
  "submissionId",
  "來源頁面",
  "原始資料"
];

/**
 * 接收 Samba 官網表單 POST。
 * Web App 必須部署為「執行身分：我」、「誰可以存取：所有人」。
 */
function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return textResponse_("OK");
  }

  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (error) {
    console.error("POST body 不是有效的 JSON：", error);
    return jsonResponse_({
      success: false,
      message: "POST body 不是有效的 JSON"
    });
  }

  // LINE webhook 與官網表單共用同一個 Web App URL。
  // webhook 具有 events 陣列，必須在官網表單驗證之前先處理。
  if (Array.isArray(payload.events)) {
    console.log("LINE_WEBHOOK_BODY = " + e.postData.contents);

    payload.events.forEach((event) => {
      if (
        event &&
        event.source &&
        event.source.type === "group" &&
        event.source.groupId
      ) {
        console.log("LINE_GROUP_ID = " + event.source.groupId);
      }
    });

    return textResponse_("OK");
  }

  if (payload.website) {
    return jsonResponse_({ success: true });
  }

  try {
    validatePayload_(payload);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      const sheet = getBookingSheet_(payload);
      ensureHeaderRow_(sheet);

      if (isDuplicateSubmission_(sheet, payload.submissionId)) {
        return jsonResponse_({ success: true, duplicate: true });
      }

      let lineStatus = "尚未推播";
      try {
        sendLinePush_(buildLineMessage_(payload));
        lineStatus = "推播成功";
      } catch (lineError) {
        lineStatus = `推播失敗：${lineError.message}`;
        console.error(lineError);
      }

      appendBookingRow_(sheet, payload, lineStatus);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse_({ success: true });
  } catch (error) {
    console.error(error);
    backupFailedSubmission_(payload, error, e.postData.contents);
    return jsonResponse_({
      success: false,
      message: error.message
    });
  }
}

function parseRequestBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return null;
  }

  return JSON.parse(e.postData.contents);
}

function validatePayload_(payload) {
  if (!getRawFormType_(payload)) {
    throw new Error("缺少必要欄位：flowType");
  }

  if (!String(payload.submissionId || "").trim()) {
    throw new Error("缺少必要欄位：submissionId");
  }

  const formCategory = getFormCategory_(payload);

  if (formCategory === "registration") {
    validateRegistrationPayload_(payload);
    return;
  }

  [
    "eventType",
    "budgetPerPerson",
    "contactName",
    "phone",
    "contactPreference"
  ].forEach((field) => {
    if (!String(payload[field] || "").trim()) {
      throw new Error(`缺少必要欄位：${field}`);
    }
  });

  if (String(payload.contactName || "").length > 10) {
    throw new Error("稱呼不可超過 10 個字。");
  }

  if (String(payload.phone || "").length > 10) {
    throw new Error("電話不可超過 10 個字。");
  }

  if (String(payload.additionalNeeds || "").length > 150) {
    throw new Error("補充需求不可超過 150 個字。");
  }

  if (!payload.activityDate && !payload.estimatedDateRange) {
    throw new Error("活動日期或日期區間至少需要填寫一項。");
  }

  if (payload.activityDate) {
    const today = Utilities.formatDate(
      new Date(),
      "Asia/Taipei",
      "yyyy-MM-dd"
    );

    if (String(payload.activityDate) < today) {
      throw new Error("活動日期不可早於今天。");
    }
  }

  if (formCategory === "booking") {
    if (!payload.activityAddress) {
      throw new Error("完整預約需要填寫活動地點。");
    }
    if (payload.adults === null || payload.adults === undefined) {
      throw new Error("完整預約需要填寫大人人數。");
    }
    if (payload.children === null || payload.children === undefined) {
      throw new Error("完整預約需要填寫小孩人數。");
    }
    if (!payload.acceptedTerms) {
      throw new Error("請先確認預約方式與取消規則。");
    }
  } else if (
    formCategory !== "registration" &&
    (!payload.activityRegion || !payload.guestRange)
  ) {
    throw new Error("簡易諮詢需要填寫活動地區與預估人數。");
  }
}

function validateRegistrationPayload_(payload) {
  [
    "eventName",
    "eventDate",
    "bankLastFive",
    "checkInName",
    "phone",
    "contactPreference",
    "adultCount"
  ].forEach((field) => {
    if (!String(payload[field] || "").trim()) {
      throw new Error(`活動報名缺少必要欄位：${field}`);
    }
  });

  if (!/^\d{5}$/.test(String(payload.bankLastFive || ""))) {
    throw new Error("匯款帳號後五碼需為 5 位數字。");
  }

  if (String(payload.checkInName || "").length > 10) {
    throw new Error("稱呼不可超過 10 個字。");
  }

  if (String(payload.phone || "").length > 10) {
    throw new Error("電話不可超過 10 個字。");
  }

  if (String(payload.dietaryDetails || "").length > 500) {
    throw new Error("特殊飲食內容不可超過 500 個字。");
  }
}

function getBookingSheet_(payload) {
  const spreadsheetId = getRequiredProperty_("SPREADSHEET_ID");
  const sheetName = resolveSheetName_(payload);
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  return spreadsheet.getSheetByName(sheetName) ||
    spreadsheet.insertSheet(sheetName);
}

function resolveSheetName_(payload) {
  const rawType = getRawFormType_(payload);
  const formCategory = getFormCategory_(payload);

  if (formCategory === "inquiry") {
    return getRequiredProperty_("SHEET_NAME_INQUIRY");
  }

  if (formCategory === "booking") {
    return getRequiredProperty_("SHEET_NAME_BOOKING");
  }

  if (formCategory === "registration") {
    return getRequiredProperty_("SHEET_NAME_EVENT");
  }

  const fallbackSheetName =
    getRequiredProperty_("SHEET_NAME_INQUIRY");
  console.log(
    `未知表單類型「${rawType || "空白"}」，預設寫入「${fallbackSheetName}」。`
  );
  return fallbackSheetName;
}

function getRawFormType_(payload) {
  return String(
    payload.formType ||
    payload.flowType ||
    payload["表單類型"] ||
    ""
  ).trim();
}

function getFormCategory_(payload) {
  const normalizedType = getRawFormType_(payload).toLowerCase();
  const typeGroups = {
    inquiry: [
      "inquiry",
      "諮詢（簡易詢問）",
      "諮詢(簡易詢問)",
      "初步詢問"
    ],
    booking: [
      "booking",
      "預約（仔細詢問）",
      "預約(仔細詢問)",
      "完整預約"
    ],
    registration: [
      "registration",
      "event-registration",
      "活動報名",
      "最新活動報名"
    ]
  };

  const matchedCategory = Object.keys(typeGroups).find((category) =>
    typeGroups[category].some(
      (type) => type.toLowerCase() === normalizedType
    )
  );

  return matchedCategory || "unknown";
}

function getFormDisplayName_(payload) {
  const formCategory = getFormCategory_(payload);

  if (formCategory === "booking") return "預約（仔細詢問）";
  if (formCategory === "registration") return "活動報名";
  return "諮詢（簡易詢問）";
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SHEET_HEADERS);
    sheet.setFrozenRows(1);
    return;
  }

  sheet.getRange(1, 1, 1, SHEET_HEADERS.length).setValues([SHEET_HEADERS]);
  sheet.setFrozenRows(1);
}

function isDuplicateSubmission_(sheet, submissionId) {
  if (sheet.getLastRow() < 2) return false;

  return Boolean(
    sheet
      .getRange(2, 1, sheet.getLastRow() - 1, 1)
      .createTextFinder(String(submissionId))
      .matchEntireCell(true)
      .findNext()
  );
}

function appendBookingRow_(sheet, payload, lineStatus) {
  sheet.appendRow([
    safeCell_(payload.submissionId),
    new Date(),
    safeCell_(payload.submittedAt),
    getFormDisplayName_(payload),
    safeCell_(payload.activityDate || payload.eventDate),
    safeCell_(payload.estimatedDateRange),
    safeCell_(payload.activityRegion),
    safeCell_(payload.activityAddress),
    safeCell_(payload.guestRange || buildRegistrationGuestText_(payload)),
    numberOrBlank_(payload.adults !== undefined ? payload.adults : payload.adultCount),
    numberOrBlank_(payload.children !== undefined ? payload.children : payload.childCount),
    safeCell_(payload.budgetPerPerson),
    safeCell_(payload.eventType || payload.eventName),
    safeCell_(payload.venueType),
    safeCell_(payload.unloadingAccess),
    safeCell_(payload.dietaryDetails),
    safeCell_(payload.additionalNeeds),
    safeCell_(payload.contactName || payload.checkInName),
    safeCell_(payload.phone),
    safeCell_(payload.contactPreference),
    safeCell_(payload.lineDisplayName),
    safeCell_(payload.referralSource),
    payload.acceptedTerms ? "是" : "否",
    safeCell_(payload.sourceUrl),
    safeCell_(lineStatus),
    safeCell_(payload.eventName),
    safeCell_(payload.bankLastFive)
  ]);
}

function buildLineMessage_(payload) {
  const type = getFormDisplayName_(payload);
  const formCategory = getFormCategory_(payload);
  const date = payload.activityDate || payload.estimatedDateRange || payload.eventDate || "未提供";
  const location = payload.activityAddress || payload.activityRegion || "未提供";
  const guests = formCategory === "booking"
    ? `大人 ${payload.adults} 位／小孩 ${payload.children} 位`
    : formCategory === "registration"
      ? buildRegistrationGuestText_(payload)
    : payload.guestRange;
  const contactName = payload.contactName || payload.checkInName || "未提供";
  const eventType = payload.eventType || payload.eventName || "未提供";

  if (formCategory === "registration") {
    return [
      "🔥 Samba 收到活動報名",
      `姓名：${contactName}`,
      `電話：${payload.phone}`,
      payload.lineDisplayName ? `LINE 名稱：${payload.lineDisplayName}` : "",
      `人數：${guests || "未提供"}`,
      `活動：${eventType}`,
      payload.bankLastFive ? `匯款後五碼：${payload.bankLastFive}` : "",
      payload.dietaryDetails ? `飲食：${payload.dietaryDetails}` : ""
    ].filter(Boolean).join("\n").slice(0, 4900);
  }

  if (formCategory === "inquiry") {
    return [
      "🔥 Samba 收到諮詢",
      `姓名：${contactName}`,
      `電話：${payload.phone}`,
      payload.lineDisplayName ? `LINE 名稱：${payload.lineDisplayName}` : "",
      `日期：${date}`,
      `地區：${payload.activityRegion || "未提供"}`,
      `人數：${guests || "未提供"}`,
      payload.budgetPerPerson ? `預算：${payload.budgetPerPerson}` : "",
      payload.eventType ? `活動：${payload.eventType}` : "",
      payload.additionalNeeds ? `補充：${payload.additionalNeeds}` : ""
    ].filter(Boolean).join("\n").slice(0, 4900);
  }

  if (formCategory === "booking") {
    return [
      "🔥 Samba 收到完整預約",
      `姓名：${contactName}`,
      `電話：${payload.phone}`,
      payload.lineDisplayName ? `LINE 名稱：${payload.lineDisplayName}` : "",
      `日期：${date}`,
      `地點：${location}`,
      `人數：${guests || "未提供"}`,
      payload.budgetPerPerson ? `預算：${payload.budgetPerPerson}` : "",
      payload.eventType ? `活動：${payload.eventType}` : "",
      payload.venueType ? `場地：${payload.venueType}` : "",
      payload.dietaryDetails ? `飲食：${payload.dietaryDetails}` : "",
      payload.additionalNeeds ? `補充：${payload.additionalNeeds}` : ""
    ].filter(Boolean).join("\n").slice(0, 4900);
  }

  return [
    "🔥 Samba 官網收到新需求",
    `類型：${type}`,
    `稱呼：${contactName}`,
    `電話：${payload.phone}`,
    `聯絡：${payload.contactPreference}`,
    payload.lineDisplayName ? `LINE 名稱：${payload.lineDisplayName}` : "",
    `日期：${date}`,
    formCategory === "registration" ? "" : `地點：${location}`,
    `人數：${guests || "未提供"}`,
    payload.budgetPerPerson ? `預算：${payload.budgetPerPerson}` : "",
    `活動：${eventType}`,
    payload.bankLastFive ? `匯款後五碼：${payload.bankLastFive}` : "",
    payload.venueType ? `場地：${payload.venueType}` : "",
    payload.dietaryDetails ? `飲食：${payload.dietaryDetails}` : "",
    payload.additionalNeeds ? `補充：${payload.additionalNeeds}` : "",
    `編號：${payload.submissionId}`
  ].filter(Boolean).join("\n").slice(0, 4900);
}

function buildRegistrationGuestText_(payload) {
  if (getFormCategory_(payload) !== "registration") return "";

  return `大人 ${payload.adultCount || 0} 位／小孩 ${payload.childCount || 0} 位`;
}

function backupFailedSubmission_(payload, error, rawBody) {
  try {
    const spreadsheetId = getRequiredProperty_("SPREADSHEET_ID");
    const sheetName =
      getOptionalProperty_("SHEET_NAME_FAILED") || "錯誤紀錄";
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(sheetName) ||
      spreadsheet.insertSheet(sheetName);

    ensureFailedSubmissionHeaderRow_(sheet);
    sheet.appendRow([
      new Date(),
      safeCell_(error && error.message ? error.message : String(error)),
      safeCell_(payload ? getRawFormType_(payload) : ""),
      safeCell_(payload ? payload.submissionId : ""),
      safeCell_(payload ? payload.sourceUrl : ""),
      safeCell_(rawBody || JSON.stringify(payload || {}))
    ]);
  } catch (backupError) {
    console.error("備份失敗表單資料時發生錯誤：", backupError);
  }
}

function ensureFailedSubmissionHeaderRow_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(FAILED_SUBMISSION_HEADERS);
    sheet.setFrozenRows(1);
    return;
  }

  sheet
    .getRange(1, 1, 1, FAILED_SUBMISSION_HEADERS.length)
    .setValues([FAILED_SUBMISSION_HEADERS]);
  sheet.setFrozenRows(1);
}

/**
 * 使用 LINE Messaging API Push Message。
 * Token 與 Group ID 僅從 Script Properties 讀取。
 */
function sendLinePush_(message) {
  const channelAccessToken =
    getRequiredProperty_("LINE_CHANNEL_ACCESS_TOKEN");
  const groupId = getRequiredProperty_("LINE_GROUP_ID");
  const response = UrlFetchApp.fetch(
    "https://api.line.me/v2/bot/message/push",
    {
      method: "post",
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${channelAccessToken}`
      },
      payload: JSON.stringify({
        to: groupId,
        messages: [
          {
            type: "text",
            text: message
          }
        ]
      }),
      muteHttpExceptions: true
    }
  );

  const statusCode = response.getResponseCode();
  if (statusCode < 200 || statusCode >= 300) {
    throw new Error(
      `LINE API ${statusCode}：${response.getContentText()}`
    );
  }
}

/**
 * 在 Apps Script 編輯器中手動執行，用來測試 LINE 管理群組推播。
 */
function testLinePush() {
  sendLinePush_(
    `🔥 Samba LINE 推播測試成功\n時間：${Utilities.formatDate(
      new Date(),
      "Asia/Taipei",
      "yyyy/MM/dd HH:mm:ss"
    )}`
  );
}

function getRequiredProperty_(name) {
  const value = PropertiesService
    .getScriptProperties()
    .getProperty(name);

  if (!value) {
    throw new Error(`尚未設定 Script Property：${name}`);
  }

  return value;
}

function getOptionalProperty_(name) {
  return PropertiesService
    .getScriptProperties()
    .getProperty(name);
}

function numberOrBlank_(value) {
  if (value === null || value === undefined || value === "") return "";

  const number = Number(value);
  return Number.isNaN(number) ? safeCell_(value) : number;
}

function safeCell_(value) {
  const text = String(value === null || value === undefined ? "" : value)
    .slice(0, 5000);

  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function jsonResponse_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}

function textResponse_(text) {
  return ContentService
    .createTextOutput(text)
    .setMimeType(ContentService.MimeType.TEXT);
}
