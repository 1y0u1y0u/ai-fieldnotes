/*
 * AI Fieldnotes — single source of truth for all concept pages.
 * To add a concept, follow AGENTS.md. Never edit generated cards in HTML.
 */
window.AI_FIELDNOTES_TOPICS = [
  {
    slug: 'transformer',
    title: 'Transformer',
    english: 'Attention is all you need to start understanding',
    category: 'core',
    level: '入門',
    minutes: 5,
    icon: '✳',
    summary: '現代語言模型的重要架構，透過 Attention 找出序列中彼此相關的資訊。',
    oneLiner: '先看誰和誰有關，再決定該如何理解這段文字。',
    analogy: '像是讀一篇文章時，你不會只看眼前這個字，還會回頭參考前後文，判斷「它」指的是誰。',
    mechanics: [
      { title: '把文字轉成向量', body: '先將輸入切成 Token，再轉成能讓模型處理的數值表示，並加入位置資訊。' },
      { title: '透過 Self-Attention 建立關聯', body: '每個位置都可以依注意力權重，彙整其他位置提供的資訊，形成與上下文相關的表示。' },
      { title: '逐層更新表示', body: 'Attention 與前饋神經網路交替運作，讓模型學到更複雜的語意關係。' }
    ],
    examples: [
      { title: '機器翻譯', body: '辨認句子中的長距離語意關係，協助產生符合語境的翻譯。' },
      { title: '文字生成', body: '以先前 Token 的資訊為條件，預測後續的 Token。' }
    ],
    misconceptions: [
      { myth: 'Attention 權重等於模型真正的推理理由。', fact: '注意力權重可以提供觀察線索，但不能直接視為完整、可靠的因果解釋。' },
      { myth: 'Transformer 只能用在文字。', fact: '這個架構也被應用在影像、聲音與多模態資料。' }
    ],
    glossary: [
      { term: 'Token', definition: '模型處理輸入時使用的基本單位，不一定等於一個完整的字。' },
      { term: 'Self-Attention', definition: '序列中的各位置依相關性整合其他位置資訊的機制。' },
      { term: 'Embedding', definition: '將符號或離散資料轉成連續數值向量的表示。' }
    ],
    quiz: { question: 'Transformer 使用 Self-Attention 的主要目的為何？', options: ['固定每個 Token 的長度', '整合序列中不同位置的相關資訊', '保證模型永遠不會答錯', '只壓縮圖像檔案'], correctIndex: 1, explanation: 'Self-Attention 會根據位置間的相關性組合資訊，讓模型能利用上下文，而不是只處理孤立的 Token。' }
  },
  {
    slug: 'large-language-model',
    title: '大型語言模型',
    english: 'Large Language Model · LLM',
    category: 'core',
    level: '入門',
    minutes: 5,
    icon: 'Aa',
    summary: '從大量文字等資料學習語言規律，能根據上下文產生或處理文字的模型。',
    oneLiner: '透過預測下一段文字，學會生成看起來有條理的回答。',
    analogy: '像是練習過大量完形填空的寫作者，熟悉語言的組合方式，但寫得流暢不代表每個事實都正確。',
    mechanics: [
      { title: '預訓練', body: '透過大量訓練資料與預測任務，調整參數以學習語言模式。' },
      { title: '任務調整', body: '一些模型會再經過指令微調及偏好對齊，以更符合人類互動的需求。' },
      { title: '推論生成', body: '輸入提示後，模型根據上下文逐步產生新的 Token，直到完成輸出。' }
    ],
    examples: [
      { title: '摘要與整理', body: '把長篇文章整理成要點、表格或不同詳略程度的說明。' },
      { title: '程式輔助', body: '根據需求提出程式草稿、測試案例或除錯方向。' }
    ],
    misconceptions: [
      { myth: '回答很順就代表一定正確。', fact: '模型可能產生看似可信但不符合事實的內容，重要資訊仍應查證。' },
      { myth: '所有 LLM 都會即時上網。', fact: '能否取得網路或外部資料，取決於部署方式與是否整合工具。' }
    ],
    glossary: [
      { term: 'Parameter', definition: '在訓練中調整、用於表示模型所學模式的數值。' },
      { term: 'Inference', definition: '模型完成訓練後，使用既有參數處理新輸入的過程。' },
      { term: 'Hallucination', definition: '模型產生不準確或沒有依據內容的現象。' }
    ],
    quiz: { question: '下列哪一項最能描述 LLM 的限制？', options: ['所有回答都經過資料庫驗證', '只能處理數學式', '可能流暢地產生不正確的資訊', '完全不需要訓練資料'], correctIndex: 2, explanation: '語言流暢與事實正確是不同的判準，對關鍵事實應查閱可信資料。' }
  },
  {
    slug: 'diffusion-model',
    title: '擴散模型',
    english: 'Diffusion Model',
    category: 'generation',
    level: '進階',
    minutes: 6,
    icon: '◌',
    summary: '學習如何把雜訊逐步去除，從隨機訊號生成圖片等資料的模型。',
    oneLiner: '從混亂的雜訊開始，一步一步還原出有結構的內容。',
    analogy: '像是從一張充滿雪花雜訊的畫布出發，依照指示反覆修改，最後逐漸浮現完整圖像。',
    mechanics: [
      { title: '學習加入雜訊的過程', body: '訓練時把不同程度的雜訊加到資料中，讓模型學習如何估計與去除雜訊。' },
      { title: '從隨機雜訊開始採樣', body: '生成時通常從隨機雜訊出發，使用模型反覆進行去噪。' },
      { title: '加入條件控制', body: '可以透過文字、圖像或其他條件，引導生成結果的主題與構圖。' }
    ],
    examples: [
      { title: '文字生成圖片', body: '輸入場景描述，讓模型根據文字條件逐步生成圖像。' },
      { title: '影像編修', body: '結合遮罩或參考圖，重新生成指定區域的內容。' }
    ],
    misconceptions: [
      { myth: '擴散模型會直接從資料庫找出一張原圖。', fact: '典型的生成過程是從雜訊反覆採樣，不等同於直接搜尋圖片；仍需留意記憶訓練資料等風險。' },
      { myth: '每次輸入相同提示一定得到完全相同圖片。', fact: '隨機種子、採樣設定與模型版本等，都可能影響結果。' }
    ],
    glossary: [
      { term: 'Noise', definition: '在資料中加入的隨機擾動，生成過程通常從雜訊起步。' },
      { term: 'Denoising', definition: '估計並逐步移除雜訊的過程。' },
      { term: 'Sampling', definition: '依照模型與選定演算法產生新資料的過程。' }
    ],
    quiz: { question: '典型擴散模型在生成影像時，通常從哪個狀態開始？', options: ['一張已完成的圖片', '隨機雜訊', '完整的 HTML 網頁', '分類標籤清單'], correctIndex: 1, explanation: '典型擴散生成會從雜訊出發，透過一連串反向去噪步驟，形成新的圖像。' }
  },
  {
    slug: 'gan',
    title: '生成對抗網路',
    english: 'Generative Adversarial Network · GAN',
    category: 'generation',
    level: '進階',
    minutes: 5,
    icon: '⇄',
    summary: '讓生成器與判別器在訓練時相互競爭，以學習資料分布的生成方法。',
    oneLiner: '一個負責創作、一個負責辨識，彼此競爭並共同改進。',
    analogy: '像一位仿畫者與一位鑑定員：仿畫者努力以假亂真，鑑定員則努力分辨真假。',
    mechanics: [
      { title: '生成器提出候選資料', body: 'Generator 把隨機向量等輸入轉成看起來像真實樣本的內容。' },
      { title: '判別器檢查真假', body: 'Discriminator 嘗試區分訓練資料與生成器產生的樣本。' },
      { title: '交替更新參數', body: '兩個網路透過對抗目標交替學習，促使生成樣本接近真實資料分布。' }
    ],
    examples: [
      { title: '圖像合成', body: '生成符合訓練資料特性的臉部、物件或風格影像。' },
      { title: '影像轉換', body: '在有合適資料和架構時，學習兩種影像域之間的轉換。' }
    ],
    misconceptions: [
      { myth: '生成器與判別器在使用階段都一定需要。', fact: '一般 GAN 在生成新樣本時，主要使用訓練完成的生成器。' },
      { myth: 'GAN 訓練總是穩定。', fact: 'GAN 可能出現模式崩潰、梯度不穩等訓練問題。' }
    ],
    glossary: [
      { term: 'Generator', definition: '用來產生合成樣本的網路。' },
      { term: 'Discriminator', definition: '用來判斷樣本是真實或生成的網路。' },
      { term: 'Mode Collapse', definition: '生成器只產出少數類型樣本，無法涵蓋資料多樣性的問題。' }
    ],
    quiz: { question: 'GAN 訓練中的 Discriminator 主要負責什麼？', options: ['把英文翻成中文', '判斷樣本來自真實資料或生成器', '壓縮網頁樣式', '管理 GitHub 版本'], correctIndex: 1, explanation: '判別器負責辨識真實樣本與生成樣本，其回饋影響生成器的學習。' }
  },
  {
    slug: 'rag',
    title: '檢索增強生成',
    english: 'Retrieval-Augmented Generation · RAG',
    category: 'application',
    level: '入門',
    minutes: 6,
    icon: '⌕',
    summary: '在回答前先從外部知識來源檢索相關資訊，再讓語言模型利用檢索結果生成回覆。',
    oneLiner: '先查資料，再根據找到的證據回答。',
    analogy: '像是開卷考試：先翻閱相關講義、找到段落，再把證據整合成自己的回答。',
    mechanics: [
      { title: '整理可檢索的知識', body: '把文件分段、建立索引；可使用關鍵字檢索、向量檢索或混合方法。' },
      { title: '尋找相關內容', body: '依照使用者問題查詢索引，找出可能對回答有用的片段。' },
      { title: '用檢索結果作答', body: '把問題和檢索到的內容一起交給模型，並視需求提供來源。' }
    ],
    examples: [
      { title: '課程講義問答', body: '根據老師提供的教材回答問題，減少超出指定範圍的內容。' },
      { title: '公司內部文件搜尋', body: '根據授權的文件庫回答流程與規範問題。' }
    ],
    misconceptions: [
      { myth: '用了 RAG 就不會產生錯誤答案。', fact: '檢索可能找錯資料，模型也可能誤讀來源，因此仍需檢查引述與結論。' },
      { myth: 'RAG 一定要重新訓練整個 LLM。', fact: 'RAG 通常能以檢索系統與提示整合既有模型，不必重新訓練基礎模型。' }
    ],
    glossary: [
      { term: 'Retrieval', definition: '根據問題從資料集合中找出相關資訊。' },
      { term: 'Embedding', definition: '用向量表示文字或其他內容，協助計算語意相似度。' },
      { term: 'Chunk', definition: '為索引或檢索而切分的文件內容片段。' }
    ],
    quiz: { question: 'RAG 相較於只使用語言模型，最關鍵的額外步驟為何？', options: ['先檢索外部相關資料', '強制把模型變成 GAN', '刪除所有訓練資料', '固定使用一種字型'], correctIndex: 0, explanation: 'RAG 的核心是加入資訊檢索，把找到的資料作為生成答案的上下文。' }
  },
  {
    slug: 'prompt-engineering',
    title: '提示詞設計',
    english: 'Prompt Engineering',
    category: 'practice',
    level: '入門',
    minutes: 4,
    icon: '↗',
    summary: '清楚說明任務、背景、限制與輸出格式，並以測試與修正提升 AI 回覆的實用性。',
    oneLiner: '好的提示詞不是神奇咒語，而是一份清楚的任務規格。',
    analogy: '像是交辦工作給新同事：說明目的、提供資料、定義完成標準，成果通常更好檢查。',
    mechanics: [
      { title: '定義任務與目標', body: '先說明希望完成什麼，以及內容要給誰使用。' },
      { title: '補足上下文與限制', body: '提供必要資料、適用範圍、不可使用的資訊與語氣等約束。' },
      { title: '要求可檢驗的格式', body: '指定表格、步驟、檢查清單等輸出方式，再依實際結果迭代調整。' }
    ],
    examples: [
      { title: '讀書整理', body: '指定教材範圍、概念難度、表格欄位與自我測驗的題型。' },
      { title: '程式開發', body: '附上功能規格、既有資料結構與驗收條件，讓 AI 更容易修改而不破壞舊功能。' }
    ],
    misconceptions: [
      { myth: '提示詞越長就一定越好。', fact: '有用的是資訊完整且不矛盾；過度冗長可能模糊真正需求。' },
      { myth: '寫出完美提示就不用驗證結果。', fact: '重要任務仍應人工核對、執行測試與檢查資料來源。' }
    ],
    glossary: [
      { term: 'Context', definition: '提供模型理解任務所需的背景與參考資料。' },
      { term: 'Constraint', definition: '對結果的範圍、內容、風格或格式設定明確限制。' },
      { term: 'Iteration', definition: '根據輸出結果與評估標準持續修正提示的過程。' }
    ],
    quiz: { question: '下列哪個提示最容易得到符合需求的結果？', options: ['隨便寫一點', '幫我做得好看', '請根據附上的文章，整理三點繁體中文摘要並標示不確定資訊', '你應該知道我要什麼'], correctIndex: 2, explanation: '有任務、資料來源、語言、格式與不確定資訊處理方式，產出更容易評估。' }
  }
];
