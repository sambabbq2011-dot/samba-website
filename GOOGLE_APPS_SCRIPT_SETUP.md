# Samba 預約表單：Google Sheets + LINE Messaging API

網站不嵌入 Google Form。前端會把目前表單資料 POST 到 Google Apps
Script Web App，再由 Apps Script 寫入 Google Sheet 並推播到 LINE 群組。

## 1. 建立 Google Sheet

1. 建立一份新的 Google Sheet。
2. 從網址複製 Spreadsheet ID：
   `https://docs.google.com/spreadsheets/d/這一段就是ID/edit`
3. 不需要手動建立標題列，Apps Script 第一次收件時會自動建立。

## 2. 建立 Apps Script

1. 開啟 <https://script.google.com/>，建立新專案。
2. 將 `google-apps-script/Code.gs` 完整貼到 `Code.gs`。
3. 在專案設定中勾選「在編輯器中顯示 appsscript.json」，再用
   `google-apps-script/appsscript.json` 取代其內容。

## 3. 設定 Script Properties

在 Apps Script 左側「專案設定」→「指令碼屬性」新增：

| 屬性 | 內容 |
| --- | --- |
| `SPREADSHEET_ID` | Google Sheet ID |
| `SHEET_NAME_INQUIRY` | `初步詢問` |
| `SHEET_NAME_BOOKING` | `完整預約` |
| `SHEET_NAME_EVENT` | `報名場次` |
| `LINE_CHANNEL_ACCESS_TOKEN` | LINE Messaging API Channel Access Token |
| `LINE_GROUP_ID` | 接收通知的 LINE 管理群組 ID |

不要把這些值貼進網站程式碼、`.env.example` 或 GitHub。

## 4. 準備 LINE Messaging API

1. 在 LINE Developers 建立 Messaging API channel。
2. 發行 Channel Access Token，填入 Script Property
   `LINE_CHANNEL_ACCESS_TOKEN`。
3. 允許官方帳號加入群組，並將官方帳號加入管理群組。
4. 從 LINE webhook 事件的 `source.groupId` 取得群組 ID，填入
   `LINE_GROUP_ID`。
5. 在 Apps Script 編輯器選擇 `testLinePush` 並執行。
6. 第一次執行需完成 Google 授權；群組收到測試訊息才算設定完成。

注意：取得 `groupId` 必須透過能驗證 `x-line-signature` 的 LINE webhook。
Apps Script Web App 不適合拿來當正式 LINE webhook 驗證端。

## 5. 部署 Apps Script Web App

1. Apps Script 右上角「部署」→「新增部署作業」。
2. 類型選「網頁應用程式」。
3. 執行身分選「我」。
4. 誰可以存取選「所有人」。
5. 部署並完成授權。
6. 複製以 `/exec` 結尾的 Web App URL；不要使用 `/dev` URL。

每次修改 Apps Script 後，需要建立新版本並更新 Web App 部署。

## 6. 本機設定

在網站根目錄建立 `.env.local`：

```env
NEXT_PUBLIC_BOOKING_WEB_APP_URL=https://script.google.com/macros/s/你的部署ID/exec
```

重新啟動本機網站後測試表單。

Web App URL 不是密鑰，瀏覽器送出表單時一定看得到；LINE Token、Group ID
與 Sheet ID 才是必須保存在 Apps Script Properties 的敏感資料。

## 7. GitHub Pages 設定

GitHub Repository：

1. `Settings`
2. `Secrets and variables`
3. `Actions`
4. `Variables`
5. 建立 Repository variable：

```text
Name: BOOKING_WEB_APP_URL
Value: https://script.google.com/macros/s/你的部署ID/exec
```

部署流程會把它提供給
`NEXT_PUBLIC_BOOKING_WEB_APP_URL`，再產生 GitHub Pages 靜態網站。

## 8. 測試順序

1. 先執行 Apps Script 的 `testLinePush()`。
2. 確認 LINE 管理群組收到測試訊息。
3. 在官網填一筆測試詢問。
4. 確認網站顯示成功訊息。
5. 確認 Google Sheet 新增一列。
6. 確認 LINE 群組收到完整預約摘要。

## GitHub Pages 的跨網域限制

前端使用 `text/plain` 與 `no-cors`，確保瀏覽器只送出一次，且不觸發
CORS 預檢。因為 `no-cors` 回應是 opaque，前端無法讀取 Apps Script
回傳的 JSON；Apps Script 的執行紀錄、Google Sheet 與 LINE 推播才是
後端處理成功的最終依據。
