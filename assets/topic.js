'use strict';
(function () {
  const { categories, element, topicUrl, updateSavedButtons } = window.Fieldnotes;
  const topics = window.AI_FIELDNOTES_TOPICS || [];
  const slug = new URLSearchParams(location.search).get('slug');
  const topic = topics.find(item => item.slug === slug);
  const root = document.getElementById('topicContent');
  if (!root) return;
  if (!topic) {
    document.title = '找不到概念｜AI Fieldnotes';
    root.append(element('h1', 'not-found-title', '這個概念還沒收錄。'));
    root.append(element('p', 'not-found-description', '你可以回到概念首頁，探索目前已有的學習卡片。'));
    const home = element('a', 'button button-primary', '返回概念首頁 ↗');
    home.href = 'index.html#explore';
    root.append(home);
    return;
  }

  document.title = `${topic.title}｜AI Fieldnotes`;
  document.querySelector('meta[name="description"]').content = topic.summary;
  function makeSection(eyebrow, title) {
    const section = element('section', 'lesson-section');
    section.append(element('p', 'eyebrow eyebrow-dark', eyebrow), element('h2', 'section-title', title));
    root.append(section);
    return section;
  }

  const breadcrumb = element('div', 'breadcrumb');
  const home = element('a', '', '概念首頁'); home.href = 'index.html#explore';
  breadcrumb.append(home, element('span', '', '/'), element('span', '', categories[topic.category].name), element('span', '', '/'), element('strong', '', topic.title));
  root.append(breadcrumb);

  const hero = element('section', `lesson-hero lesson--${topic.category}`);
  const left = element('div', 'lesson-hero-main');
  left.append(element('span', 'lesson-badge', categories[topic.category].name));
  left.append(element('h1', 'lesson-title', topic.title));
  left.append(element('p', 'lesson-english', topic.english));
  left.append(element('p', 'lesson-one-liner', topic.oneLiner));
  left.append(element('p', 'lesson-summary', topic.summary));
  const meta = element('div', 'lesson-meta');
  meta.append(element('span', '', `◷ ${topic.minutes} 分鐘閱讀`), element('span', '', `◇ ${topic.level}`));
  const save = element('button', 'save-btn save-btn-large');
  save.dataset.saveSlug = topic.slug; save.type = 'button';
  meta.append(save);
  left.append(meta);
  const aside = element('aside', 'lesson-analogy');
  aside.append(element('span', 'analogy-icon', topic.icon));
  aside.append(element('p', 'analogy-label', '💡 用生活理解它'));
  aside.append(element('p', 'analogy-text', topic.analogy));
  hero.append(left, aside); root.append(hero);

  const layout = element('div', 'lesson-layout');
  const main = element('div', 'lesson-body');
  const nav = element('aside', 'lesson-side');
  nav.append(element('p', 'side-title', '本篇目錄'));
  const anchors = [ ['how', '01 核心運作方式'], ['examples', '02 真實應用場景'], ['pitfalls', '03 常見觀念誤區'], ['glossary', '04 關鍵英文名詞'], ['quiz', '05 快速自我測驗'] ];
  anchors.forEach(([id, label]) => { const link = element('a', '', label); link.href = `#${id}`; nav.append(link); });
  layout.append(main, nav); root.append(layout);

  function sectionInside(id, eyebrow, title, lead) {
    const sec = element('section', 'lesson-section'); sec.id = id;
    sec.append(element('p', 'eyebrow eyebrow-dark', eyebrow), element('h2', 'section-title', title));
    if (lead) sec.append(element('p', 'section-lead', lead));
    main.append(sec); return sec;
  }

  const how = sectionInside('how', '01 / HOW IT WORKS', '它是怎麼運作的？', '用三個步驟理解核心機制，不需要先背誦艱深公式。');
  const steps = element('div', 'lesson-steps');
  topic.mechanics.forEach((item, index) => {
    const step = element('div', 'lesson-step');
    step.append(element('span', 'step-number', String(index + 1).padStart(2, '0')));
    const info = element('div', ''); info.append(element('h3', '', item.title), element('p', '', item.body));
    step.append(info); steps.append(step);
  }); how.append(steps);

  const examples = sectionInside('examples', '02 / IN PRACTICE', '實際可以用在哪裡？', '把概念連回日常工具與應用情境。');
  const exampleGrid = element('div', 'example-grid');
  topic.examples.forEach(item => {
    const block = element('article', 'example-item');
    block.append(element('span', 'example-star', '✳'), element('h3', '', item.title), element('p', '', item.body));
    exampleGrid.append(block);
  }); examples.append(exampleGrid);

  const pitfalls = sectionInside('pitfalls', '03 / COMMON TRAPS', '容易搞錯的地方', '會分辨錯誤觀念，才算真正理解。');
  topic.misconceptions.forEach(item => {
    const comparison = element('div', 'misconception');
    comparison.append(element('p', 'myth', `✕ 常見誤解：${item.myth}`));
    comparison.append(element('p', 'fact', `✓ 正確理解：${item.fact}`));
    pitfalls.append(comparison);
  });

  const glossary = sectionInside('glossary', '04 / KEY VOCABULARY', '關鍵英文名詞', '保留英語術語，建立可以繼續查閱的學習索引。');
  const dl = element('dl', 'glossary-list');
  topic.glossary.forEach(item => { dl.append(element('dt', '', item.term), element('dd', '', item.definition)); });
  glossary.append(dl);

  const quizSec = sectionInside('quiz', '05 / CHECK YOUR UNDERSTANDING', '一分鐘自我測驗', '選出一個答案，看看是否掌握了這篇概念。');
  const quizBox = element('div', 'quiz-box');
  quizBox.append(element('p', 'quiz-label', 'QUICK QUIZ · 單選題'), element('h3', 'quiz-question', topic.quiz.question));
  const form = element('form', 'quiz-form');
  topic.quiz.options.forEach((choice, index) => {
    const label = element('label', 'quiz-option');
    const radio = element('input'); radio.type = 'radio'; radio.name = 'answer'; radio.value = String(index);
    label.append(radio, element('span', 'choice-letter', String.fromCharCode(65 + index)), element('span', '', choice));
    form.append(label);
  });
  const submit = element('button', 'button button-primary', '確認答案'); submit.type = 'submit';
  const feedback = element('div', 'quiz-feedback'); feedback.hidden = true; feedback.setAttribute('role', 'status'); feedback.setAttribute('aria-live', 'polite');
  form.append(submit, feedback);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const checked = form.querySelector('input[name="answer"]:checked');
    if (!checked) { feedback.hidden = false; feedback.className = 'quiz-feedback quiz-feedback-warn'; feedback.textContent = '請先選擇一個答案，再確認。'; return; }
    const correct = Number(checked.value) === topic.quiz.correctIndex;
    feedback.hidden = false;
    feedback.className = `quiz-feedback ${correct ? 'quiz-feedback-good' : 'quiz-feedback-warn'}`;
    feedback.textContent = `${correct ? '✓ 答對了！' : `再複習一下，正確答案是 ${String.fromCharCode(65 + topic.quiz.correctIndex)}。`} ${topic.quiz.explanation}`;
    form.querySelectorAll('.quiz-option').forEach((label, index) => {
      label.classList.toggle('is-answer', index === topic.quiz.correctIndex);
      label.classList.toggle('is-incorrect', index === Number(checked.value) && !correct);
    });
  });
  quizBox.append(form); quizSec.append(quizBox);

  const idx = topics.indexOf(topic);
  const next = topics[(idx + 1) % topics.length];
  const nextArea = element('div', 'next-topic');
  const leftNext = element('div'); leftNext.append(element('p', '', 'KEEP LEARNING / 繼續探索'), element('h2', '', next.title));
  const nextLink = element('a', 'button button-dark', '閱讀下一篇 ↗'); nextLink.href = topicUrl(next.slug);
  nextArea.append(leftNext, nextLink); root.append(nextArea);
  updateSavedButtons();
})();
