# 臨時 LINE Group ID Webhook

這個 Cloudflare Worker 只用來接收 LINE webhook 並從 logs 取得
`event.source.groupId`，不會修改 Samba 官網或 Google Apps Script。

## 最簡單的部署方式：Cloudflare 網頁介面

1. 登入 Cloudflare Dashboard。
2. 開啟 **Workers & Pages**。
3. 選擇 **Create application → Create Worker**。
4. Worker 名稱可填 `samba-line-group-id`。
5. 將 `worker.js` 的全部內容貼入編輯器並部署。
6. 複製 Cloudflare 提供的 `https://...workers.dev` 網址。

## 建議開啟 LINE 簽章驗證

1. 在 LINE Developers 的 Messaging API channel 找到
   **Basic settings → Channel secret**。
2. 回到 Cloudflare Worker：
   **Settings → Variables and Secrets → Add**。
3. 名稱填 `LINE_CHANNEL_SECRET`，值填 Channel secret。
4. 類型選 **Secret**，儲存並重新部署。

不要把 Channel secret 寫進 `worker.js` 或提交到 Git。

## 取得 LINE_GROUP_ID

1. 到 LINE Developers 的 Messaging API 設定。
2. 將 Webhook URL 暫時改為 Worker 的 `workers.dev` 網址。
3. 按 **Verify**，應顯示成功。
4. 開啟 **Use webhook**。
5. 確認 LINE 官方帳號機器人已加入目標群組。
6. 到 Cloudflare Worker 的 **Logs / Observability → Live logs**。
7. 在該 LINE 群組傳送「測試」。
8. Logs 會出現：

   `LINE_GROUP_ID = Cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

9. 將該值存入 Apps Script 的 Script Properties：
   `LINE_GROUP_ID`。
10. 取得後依需求關閉 LINE Developers 的 **Use webhook**，並將臨時
    Worker 停用或刪除。

LINE 的 Verify 請求通常只有空的 `events` 陣列，因此 Verify 成功但不會顯示
groupId；必須由群組內真正傳送一則訊息，才會收到包含 groupId 的事件。

## 使用 Wrangler 部署（選用）

在此資料夾執行：

```text
npx wrangler login
npx wrangler deploy
npx wrangler secret put LINE_CHANNEL_SECRET
```

設定 secret 後若產生新版本，請再次部署。
