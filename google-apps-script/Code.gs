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
  "LINE 推播狀態"
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

  try {
    validatePayload_(payload);

    if (payload.website) {
      return jsonResponse_({ success: true });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      const sheet = getBookingSheet_();
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
  const requiredFields = [
    "submissionId",
    "flowType",
    "eventType",
    "budgetPerPerson",
    "contactName",
    "phone",
    "contactPreference"
  ];

  requiredFields.forEach((field) => {
    if (!String(payload[field] || "").trim()) {
      throw new Error(`缺少必要欄位：${field}`);
    }
  });

  if (!payload.activityDate && !payload.estimatedDateRange) {
    throw new Error("活動日期或日期區間至少需要填寫一項。");
  }

  if (payload.flowType === "booking") {
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
  } else if (!payload.activityRegion || !payload.guestRange) {
    throw new Error("簡易諮詢需要填寫活動地區與預估人數。");
  }
}

function getBookingSheet_() {
  const properties = PropertiesService.getScriptProperties();
  const spreadsheetId = getRequiredProperty_("SPREADSHEET_ID");
  const sheetName = properties.getProperty("SHEET_NAME") || "預約詢問";
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  return spreadsheet.getSheetByName(sheetName) ||
    spreadsheet.insertSheet(sheetName);
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SHEET_HEADERS);
    sheet.setFrozenRows(1);
  }
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
    payload.flowType === "booking" ? "預約（仔細詢問）" : "諮詢（簡易詢問）",
    safeCell_(payload.activityDate),
    safeCell_(payload.estimatedDateRange),
    safeCell_(payload.activityRegion),
    safeCell_(payload.activityAddress),
    safeCell_(payload.guestRange),
    numberOrBlank_(payload.adults),
    numberOrBlank_(payload.children),
    safeCell_(payload.budgetPerPerson),
    safeCell_(payload.eventType),
    safeCell_(payload.venueType),
    safeCell_(payload.unloadingAccess),
    safeCell_(payload.dietaryDetails),
    safeCell_(payload.additionalNeeds),
    safeCell_(payload.contactName),
    safeCell_(payload.phone),
    safeCell_(payload.contactPreference),
    safeCell_(payload.lineDisplayName),
    safeCell_(payload.referralSource),
    payload.acceptedTerms ? "是" : "否",
    safeCell_(payload.sourceUrl),
    safeCell_(lineStatus)
  ]);
}

function buildLineMessage_(payload) {
  const type = payload.flowType === "booking"
    ? "預約（仔細詢問）"
    : "諮詢（簡易詢問）";
  const date = payload.activityDate || payload.estimatedDateRange || "未提供";
  const location = payload.activityAddress || payload.activityRegion || "未提供";
  const guests = payload.flowType === "booking"
    ? `大人 ${payload.adults} 位／小孩 ${payload.children} 位`
    : payload.guestRange;

  return [
    "🔥 Samba 官網收到新需求",
    `類型：${type}`,
    `稱呼：${payload.contactName}`,
    `電話：${payload.phone}`,
    `聯絡：${payload.contactPreference}`,
    payload.lineDisplayName ? `LINE 名稱：${payload.lineDisplayName}` : "",
    `日期：${date}`,
    `地點：${location}`,
    `人數：${guests || "未提供"}`,
    `預算：${payload.budgetPerPerson}`,
    `活動：${payload.eventType}`,
    payload.venueType ? `場地：${payload.venueType}` : "",
    payload.dietaryDetails ? `飲食：${payload.dietaryDetails}` : "",
    payload.additionalNeeds ? `補充：${payload.additionalNeeds}` : "",
    `編號：${payload.submissionId}`
  ].filter(Boolean).join("\n").slice(0, 4900);
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

function numberOrBlank_(value) {
  return value === null || value === undefined || value === ""
    ? ""
    : Number(value);
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
