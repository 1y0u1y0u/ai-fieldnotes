# AGENTS.md — AI Fieldnotes 開發與內容擴充規範

> **這是 AI 協作者的第一份必讀文件。** 本規範的目的是讓不同的 AI 在不同時間開發本專案時，仍能產生一致、可維護且可驗證的頁面與內容。修改任何程式或教材前，請先閱讀本文件。

## 1. 專案定位與目標

- **專案名稱：** AI Fieldnotes（AI 概念學習卡）。
- **使用者：** 對生成式 AI 有興趣、但不一定有機器學習背景的大學生與自學者。
- **核心目的：** 以簡短、可靠、可互動的繁體中文筆記，介紹 AI 核心概念、生成模型、實務應用與使用技巧。
- **與單次 Vibe Coding 不同之處：** 網站使用統一資料結構及共用模板；日後新增一篇文章只需依規範擴充資料，無須從零重寫 HTML/CSS/JS。
- **成功標準：** 新增內容後，首頁能自動出現新卡片，分類、搜尋、詳情頁及測驗均能運作，既有內容不受影響。

## 2. 技術與部署約束（不得擅自改動）

- 使用原生 **HTML5、CSS3、JavaScript（ES2020+）**，不使用 React、Vue、npm 前端框架、CDN、付費 API 或後端。
- 網站是純靜態網站，可由 **GitHub Pages** 直接託管。
- **所有資源 URL 一律使用相對路徑**，例如 `assets/styles.css`、`topic.html?slug=rag`，禁止使用以 `/` 起始的網站根路徑，避免在 GitHub Pages 專案子目錄出錯。
- 網站不可依賴外部網路資源才能正常瀏覽；圖片及 icon 盡量使用本地 SVG / CSS / Unicode。
- 不要把密碼、Token、個資、內部資料放進儲存庫。
- `data/topics.js` 是 **single source of truth（唯一內容來源）**；首頁卡片與教學頁面的內容由 JavaScript 自動生成，禁止把同一份資料重複貼進 HTML。
- 現有頁面為繁體中文，專有名詞保留英文，解說以準確易懂為主。

## 3. 目錄結構與檔案職責

```text
ai-fieldnotes/
├── AGENTS.md                 # AI 開發規範：更動前必讀
├── README.md                 # 專案介紹、使用與部署步驟
├── SUBMISSION.md             # 課堂作業繳交文字範本
├── .nojekyll                 # GitHub Pages 靜態網站設定
├── index.html                # 首頁：搜尋、分類、收藏、學習路線
├── topic.html                # 教學共用頁面：讀取 ?slug=參數
├── about.html                # 專案規則與擴充方式介紹
├── data/
│   └── topics.js             # 全部教學內容與測驗資料
├── assets/
│   ├── styles.css            # 全站設計系統與響應式樣式
│   ├── shared.js             # 共用分類、路徑、收藏與 DOM 工具
│   ├── app.js                # 首頁動態卡片、篩選與搜尋
│   └── topic.js              # 教學頁面生成與答題互動
├── images/
│   ├── favicon.svg           # 本地網站圖示
│   ├── preview-desktop.jpg   # 桌機版首頁展示截圖
│   └── preview-mobile.jpg    # 手機版首頁展示截圖
└── tests/
    └── validate-content.mjs # Node.js 資料完整性與基本結構測試
```

**責任分界：** 新增「概念」通常只改 `data/topics.js`；修改全站配色改 `assets/styles.css`；新增獨立功能頁面才建立新 HTML。避免把不相關的修改混在同一個工作中。

## 4. 資料模型（新增主題必須遵守）

每篇內容是一個物件，加入 `window.AI_FIELDNOTES_TOPICS` 陣列的尾端。不得刪除既有必要欄位、改變型別或重複 slug。

| 欄位 | 型別 | 規則 |
| --- | --- | --- |
| `slug` | string | 唯一識別碼，只能用小寫英文字母、數字與 `-`，例 `ai-agent`；發布後不可隨意更改，以免舊連結失效 |
| `title` | string | 繁體中文或慣用中英文名稱；簡潔明確 |
| `english` | string | 正式英文術語及可選縮寫 |
| `category` | string | **只能**是 `core`、`generation`、`application`、`practice` 其中之一 |
| `level` | string | **只能**是 `入門` 或 `進階` |
| `minutes` | number | 預估閱讀分鐘數，正整數 |
| `icon` | string | 簡短的文字或符號，不使用外部圖庫 |
| `summary` | string | 1～2 句概念介紹，出現在首頁卡片 |
| `oneLiner` | string | 一句可以直接記住的關鍵概念 |
| `analogy` | string | 生活化比喻，不能因此犧牲科學準確性 |
| `mechanics` | array | **剛好 3 筆** `{ title, body }`，說明運作流程 |
| `examples` | array | **至少 2 筆** `{ title, body }`，必須具體且合理 |
| `misconceptions` | array | **至少 2 筆** `{ myth, fact }`，區分錯誤觀念與正確理解 |
| `glossary` | array | **至少 3 筆** `{ term, definition }`，英文術語加中文解釋 |
| `quiz` | object | `{ question, options, correctIndex, explanation }`；`options` 剛好 4 個字串，`correctIndex` 為 0～3 的整數 |

### 分類字典

- `core`：核心原理；如 Transformer、LLM、Embedding。
- `generation`：生成模型；如 Diffusion、GAN、VAE。
- `application`：實務應用；如 RAG、AI Agent、AI 搜尋。
- `practice`：使用技巧；如 Prompt Engineering、模型評估、AI 安全使用。

**內容品質要求：**

1. 介紹順序採 **一句話理解 → 生活比喻 → 三步運作 → 兩個應用 → 常見誤解 → 英文名詞 → 測驗**，不省略欄位。
2. 每段盡量 40～90 字；專有名詞首次出現時附英文，後續保持用字一致。
3. 不得捏造數據、論文、實驗結果或新模型能力；無法驗證的重要內容，先標示待查證，不應以確定語氣發布。
4. 比喻應幫助理解但不可與原理混淆，例如不能將 LLM 描述成「永遠能驗證事實」的系統。
5. 測驗只能有一個最佳答案，題目與詳解必須對應本文，避免陷阱式措辭。
6. 不要直接貼上他人受著作權保護的大段文章或原始圖片；應使用原創解說。

## 5. 新增一篇 AI 概念：標準作業流程（SOP）

**情境：** 使用者要求「新增 AI Agent 介紹」。請依序執行：

1. **讀規則。** 先開啟本檔 `AGENTS.md`，接著閱讀 `data/topics.js` 的現有一筆內容與 `tests/validate-content.mjs`。
2. **選分類。** AI Agent 通常屬 `application`。選唯一 `slug: 'ai-agent'`，搜尋現有 slug 確認沒有重複。
3. **寫入資料。** 在 `data/topics.js` 的陣列尾端新增一個完整物件。至少三步運作、兩個案例、兩項誤解、三個英文名詞及四選一測驗；**不修改其他概念物件**。
4. **核對概念。** 確保主題原理正確，必要時查證可靠來源。不要將尚未確認的內容當成事實。
5. **執行驗證。** 在專案根目錄執行 `node tests/validate-content.mjs`；全部通過才能交付。
6. **人工瀏覽驗收。** 開啟本機網站，確認新增卡片、分類、關鍵字搜尋、`topic.html?slug=ai-agent`、測驗答案與手機版排版正常。
7. **檢查舊功能。** 現有主題的連結、收藏功能、搜尋、測驗不能因新增內容而失效。
8. **報告變更。** 回覆新增的 `slug`、分類、修改的檔案及測試結果。若部署於 GitHub Pages，提交到 `main` 即可更新頁面。

### 完成定義（Definition of Done）

- [ ] 新 slug 唯一且符合命名規則
- [ ] 必要資料欄位齊全、類別合法、內容無重大事實錯誤
- [ ] `node tests/validate-content.mjs` 通過
- [ ] 首頁、搜尋、分類、收藏、教學頁與四選一測驗正常
- [ ] 手機寬度下沒有超出畫面的內容或無法操作的按鈕
- [ ] 沒有外部 API 金鑰，路徑相對於 GitHub Pages 專案根目錄
- [ ] 不相關的既有內容沒有被改動

## 6. 新增「獨立網頁」的規則

如果使用者明確需要新增不同性質的頁面，例如 `resources.html`：

1. 使用小寫英文與連字號命名，如 `resources.html`，不可使用空格或中文字當檔名。
2. 沿用現有 `<header>`、`<footer>`、`meta`、`viewport`、`skip-link`、`assets/styles.css` 與 `data/topics.js` / `assets/shared.js` 的載入模式。
3. 使用語意化的 `<main>`、`<section>`、`<h1>`～`<h3>`；每頁僅一個 `<h1>`，標題層級不跳級。
4. 修改導覽列時，需同步更新 `index.html`、`topic.html`、`about.html` 以及新增的頁面，保持全站一致。
5. 延續第 7 節視覺風格；共用樣式優先寫進 `assets/styles.css`，不在每一頁複製大量內嵌 CSS。
6. 所有資源、圖片、頁面連結都使用相對路徑；每個互動必須支援滑鼠和鍵盤。
7. 新頁面必須具有明確用途，不能只為增加頁數而複製既有內容。

## 7. 網站視覺與體驗規格

**設計風格：** 簡潔、編輯式筆記、自然留白，兼具學習工具的親和力與資訊專業感。

| CSS Token | 色彩 | 用途 |
| --- | --- | --- |
| `--paper` | `#f7f6f2` | 全站米白底色 |
| `--ink` | `#242e35` | 深色文字、按鈕、深色區塊 |
| `--lime` | `#d7ed64` | 焦點、重點、主要 CTA |
| `--line` | `#dfe1db` | 分隔線與卡片邊框 |
| `--muted` | `#667078` | 次要文字 |

- 字型：以系統字型為主，繁體中文優先 `Noto Sans TC`、`Microsoft JhengHei`；不強制下載字體。
- 全站使用一致的 12～14px 內文字、明確的標題階層、適當行距及不過密的排版。
- 卡片依分類使用柔和背景區分，但**不可只靠顏色**傳達資訊，需保留分類文字。
- 尺寸至少測試桌機 **1440px**、平板 **768px**、手機 **390px**。
- 互動：滑鼠 hover、可見的鍵盤 focus、表單 label、測驗答題回饋；支援 `prefers-reduced-motion`。
- 新增動畫須輕量，避免閃爍與大量自動播放；不要讓動畫阻礙閱讀。

## 8. JavaScript、資料安全與維護規範

- 內容動態渲染**優先用 `document.createElement` 和 `textContent`**；不要把主題文字直接插入 `innerHTML`，降低不必要的 HTML 注入風險。
- 現有收藏功能存放在 `localStorage` 的 `ai-fieldnotes-saved`；修改時保留相容性，並考慮禁止儲存的瀏覽器情境。
- 主題頁以 `topic.html?slug=...` 讀取資料；找不到 slug 時應顯示友善的錯誤頁，不能整頁空白。
- 需要加入新的 `category` 或改變 schema 時，**須同步修改** `assets/shared.js`、相關頁面/樣式、`tests/validate-content.mjs` 與本文件；一般新增文章不得修改 schema。
- 修改功能時採最小變更原則，避免破壞現有網址、類別與資料。
- 不宣稱已在 GitHub Pages 上線，除非真實部署並確認公開網址可訪問。

## 9. 指令與測試

在專案根目錄執行：

```bash
# 驗證全部內容欄位與網站基本結構；需要 Node.js 18+
node tests/validate-content.mjs

# 本機啟動網站；需要 Python 3
python -m http.server 8000
```

在瀏覽器打開 `http://localhost:8000`，重點檢查：

1. 首頁 6 張概念卡（新增文章後數量自動增加）。
2. 搜尋 `Transformer` 應只出現相符主題；類別按鈕與「只看收藏」可正常使用。
3. 點開 `topic.html?slug=rag`，原理、案例、名詞與測驗完整顯示。
4. 測驗不選答案時會提醒；選錯會顯示正確選項與原因；選對有正向回饋。
5. `about.html` 可開啟，`AGENTS.md` 檔案存在；手機導覽與卡片不溢出。

## 10. AI 可直接使用的擴充指令模板

> 請先閱讀專案根目錄的 `AGENTS.md`。根據規範在 AI Fieldnotes 新增一篇「[填寫主題]」的繁體中文教學文章，分類為「[core / generation / application / practice]」。保留既有網站結構與其他內容，只修改必要檔案。文章需包含簡短介紹、一句話理解、生活比喻、三個運作步驟、兩個真實案例、兩個常見誤解、三個英文名詞與附詳解的四選一測驗。完成後執行 `node tests/validate-content.mjs`，並說明新增網址、修改檔案與測試結果。

**本文件是專案規則的權威來源。** 若使用者的新指示與本文件衝突，應說明衝突點、提出必要修改範圍，在合理確認後再調整規範與實作，不能默默違反既有架構。
