# Samba 窯烤官方網站

以 Next.js App Router 建立的多頁式官方網站，包含首頁、品牌介紹、服務、菜單、案例、FAQ 與聯絡頁。

## 專案結構

```text
app/                 頁面、全站版型、SEO 路由
components/          導覽列、頁尾、CTA、表單等共用元件
lib/                 網站設定與 metadata 工具
next.config.ts       Next.js 設定
.env.example         正式網址與聯絡資料範例
```

每個 `app/**/page.tsx` 都是獨立頁面與 URL。各頁的 `metadata`
透過 `lib/metadata.ts` 統一產生；全站預設值位於 `app/layout.tsx`。
搜尋引擎使用的 sitemap 與 robots 設定分別位於 `app/sitemap.ts` 與
`app/robots.ts`。

## 本機啟動

建議使用 Node.js 20.9 以上與 pnpm：

```bash
pnpm install
pnpm dev
```

開啟 http://localhost:3000。

正式建置檢查：

```bash
pnpm typecheck
pnpm build
pnpm start
```

## 環境設定

複製 `.env.example` 為 `.env.local`，填入：

- 正式網站網址
- 聯絡電話
- LINE 連結
- Instagram 與 Facebook 連結

## 部署

### Vercel

1. 將專案推送到 GitHub、GitLab 或 Bitbucket。
2. 在 Vercel 匯入 repository。
3. Framework Preset 選擇 Next.js。
4. 加入 `.env.example` 所列環境變數。
5. 部署並綁定正式網域。

### 自有主機

主機需安裝 Node.js 20.9 以上：

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

建議使用反向代理將正式網域導向 Next.js 服務，並設定程序管理與 HTTPS。

## 上線前內容

目前案例圖片為版型示意。取得舊站原始圖片後，可替換各頁 `imageUrls`，
並在正式部署前串接聯絡表單收件服務。
