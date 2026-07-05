# IZCC 2026 四校聯合暑訓 — 招生網站

## 專案結構

這個專案有兩個**各自獨立開發**的部份，透過 iframe 嵌入整合：

```
.
├── index.html                        # 🌐 主網站（純靜態 HTML + CSS + JS，內含開頭動畫的 iframe overlay）
├── assets/                           #   圖片、CSS、JS、vendor 套件
├── btn.css
├── build.sh                          # 一鍵 Build + 部署
├── open-animation/                   # 🎬 開頭動畫（React 19 + Vite，獨立專案）
│   ├── src/                          #   動畫原始碼（React + framer-motion）
│   ├── scripts/postbuild.mjs         #   Build 後自動處理 file:// 相容性
│   ├── dist/                         #   Build 產出
│   ├── package.json                  #   pnpm build / pnpm deploy
│   └── vite.config.ts
└── animation/                        # Build 後的動畫被複製到這裡（執行 build.sh 後產生）
```

## 分開開發的原因

開頭動畫使用 **React 19 + framer-motion (motion/react)** 實作，包含複雜的 SVG 徽章動畫、相位轉換（scatter → merging → fused）、粒子特效等。主網站則是純靜態頁面（Bootstrap 5 樣式），兩者技術棧不同。

為了**不讓 React 的 build 工具鏈污染主站的純靜態結構**，動畫獨立成一個 Vite 專案，build 完之後以 `<iframe>` 嵌入主站：

```html
<div id="intro-overlay">
  <iframe src="animation/" ...></iframe>
</div>
```

這樣做的好處：
- 動畫的 CSS（Tailwind）與主站的 CSS（Bootstrap）**完全隔離**，不會互相干擾
- 可以在不動主站的情況下獨立修改動畫
- 動畫使用 framer-motion 的複雜動畫能力，主站保持輕量

## 動畫播放流程

```
使用者打開網站
       │
       ▼
┌─────────────────────┐
│  iframe overlay     │  動畫三階段（~4 秒）：
│  開頭動畫播放         │   scatter  →  merging  →  fused
│                     │   四徽章飛入   聚合旋轉    IZCC Logo 出現
└─────────┬───────────┘
          │ 播放完畢（停留 2 秒）
          │
          ▼
  postMessage({ type: 'intro-complete' })
          │
          ▼
  parent 頁收到訊息 → overlay opacity 漸出 → DOM 移除
          │
          ▼
          主站內容露出
```

- 動畫一次性播放，總長約 **6 秒**
- **14 秒 fallback**：如果動畫因任何原因卡住，overlay 會自動關閉
- 動畫自身也有 **12 秒 fallback timeout**

## 開始開發

### 前置需求

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/)（專案使用 pnpm，非 npm）

### 安裝相依套件

```bash
# 開頭動畫
cd open-animation
pnpm install
```

主網站無相依套件，直接以瀏覽器開啟即可。

### 開發動畫

```bash
cd open-animation
pnpm dev          # 啟動 dev server（localhost:3000）
```

### Build + 部署

```bash
# 方式一：從根目錄一鍵完成
./build.sh

# 方式二：從動畫目錄
cd open-animation
pnpm build        # 只 build（產出在 dist/）
pnpm deploy       # build + 自動複製到 ../animation/
```

執行後動畫的 build 產物會自動部署到 `animation/`，開啟 `index.html` 即可看到完整效果。

## 在瀏覽器直接開啟（file:// protocol）

這個網站是純靜態網站，可以在瀏覽器直接開啓 `index.html` 預覽，**不需要 HTTP server**。

但 `file://` 與 ES Module 不相容，因此 Build 時會自動：

1. 將 Vite 設為 **IIFE 格式**（非 `type="module"`）
2. 加上 `<script defer>` 確保 DOM 解析完才執行 React
3. 移除 `<link crossorigin>` 避免 CORS 錯誤

這些都在 `scripts/postbuild.mjs` 中自動處理，每次 `pnpm build` 後會自動執行。

> **注意**：`file://` 下 iframe 與 parent 的 `postMessage` 仍然可以運作（使用 `'*'` targetOrigin），但瀏覽器 DevTools 會顯示安全性警告，這是正常現象，不影響功能。

## 如果無法開啟（CORS / 安全性限制）

若遇到瀏覽器安全性限制導致動畫無法載入，可以用簡單的 HTTP server 開啟：

```bash
# Python 內建 server
python3 -m http.server 8080
# 開啟 http://localhost:8080
```

## 主題色

全站主題色採用 **星光黃** 色票系列：

| 用途 | 色碼 |
|------|------|
| 主色 | `#F5C542` |
| Hover / 淺色 | `#F8D776` |
| Pressed / 深色 | `#D4A830` |
| 淡底色 | `#FFF8E1` |
| 按鈕邊框 | `#FFD700` |

## 技術棧

| 部份 | 技術 |
|------|------|
| 主網站 | 純靜態 HTML5, CSS3, JavaScript, Bootstrap 5, AOS, Swiper, GLightbox |
| 開頭動畫 | React 19, TypeScript, Vite 6, Tailwind CSS 4, motion/react (framer-motion v12) |
| 圖示字型 | Boxicons, Bootstrap Icons |
