# 本週作業繳交內容｜AI Fieldnotes

**繳交標題：**【學校簡稱】【學號】【系級簡稱】【姓名】 AI Fieldnotes — 生成式 AI 概念學習網站

## 1. 專案簡介

這次我製作的是「AI Fieldnotes — 生成式 AI 概念學習網站」，目標是把比較抽象的 AI 知識整理成容易閱讀、可以持續擴充的互動學習卡。網站目前收錄 Transformer、大型語言模型、擴散模型、GAN、RAG 與提示詞設計六個主題。使用者可以依分類瀏覽或搜尋關鍵字，並使用收藏、學習路線與每篇文章附帶的四選一測驗進行自學。

這次的重點不只是完成單一網頁，而是把內容與版型分離。所有學習資料集中存放於 `data/topics.js`，首頁及文章頁面都會根據資料自動生成，讓後續新增內容更有效率。

## 2. GitHub Repository 連結

【完成上傳後，把這行換成真實連結】

`https://github.com/你的GitHub帳號/ai-fieldnotes`

## 3. 網頁連結

【GitHub Pages 啟用且確認可開啟後，把這行換成真實連結】

`https://你的GitHub帳號.github.io/ai-fieldnotes/`

## 4. AGENTS.md

已建立專案根目錄的 `AGENTS.md`，規範專案目標、檔案結構、視覺設計、分類、資料格式、命名方式、AI 新增內容的標準流程及驗收方式。老師可在 Repository 根目錄查看完整檔案。

【可額外附上 `https://github.com/你的GitHub帳號/ai-fieldnotes/blob/main/AGENTS.md`】

## 5. 規則如何協助 AI 繼續新增頁面或內容？

未來如果想增加「AI Agent」或「VAE」等主題，我只需要請 AI 先閱讀 `AGENTS.md`，再依照規定新增一筆完整的概念資料，內容必須有摘要、生活比喻、三個運作步驟、實際應用、常見誤解、英文術語與測驗。由於網站已建立共用的卡片與文章模板，新資料可以自動顯示在首頁，也能被搜尋、分類與收藏，不必重寫 HTML。AI 完成後還需要執行 `node tests/validate-content.mjs` 檢查欄位、slug 和測驗格式，降低之後擴充時破壞既有功能的風險。

---

## 送出前檢查

- [ ] Repo 設定為 Public，且已完整上傳檔案（不是只上傳 ZIP）
- [ ] GitHub Repository 連結可開啟
- [ ] GitHub Pages 網站連結可正常顯示首頁
- [ ] `AGENTS.md` 在 Repository 根目錄可直接查看
- [ ] 網站可進入任一文章、搜尋、篩選及完成測驗
- [ ] 繳交標題包含實際學校、學號、系級與姓名
- [ ] GitHub/網頁兩個網址已取代占位文字
