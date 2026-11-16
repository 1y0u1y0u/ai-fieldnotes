'use strict';
(function () {
  const { categories, element, topicUrl, getSaved, updateSavedButtons } = window.Fieldnotes;
  const topics = window.AI_FIELDNOTES_TOPICS;
  const grid = document.getElementById('topicGrid');
  const empty = document.getElementById('emptyState');
  const search = document.getElementById('topicSearch');
  const resultCount = document.getElementById('resultCount');
  const savedOnly = document.getElementById('savedOnly');
  const clearSearch = document.getElementById('clearSearch');
  if (!grid || !Array.isArray(topics)) return;
  let activeCategory = 'all';

  function createCard(topic, index) {
    const card = element('article', `topic-card card--${topic.category}`);
    card.style.setProperty('--stagger', `${Math.min(index, 9) * 55}ms`);
    const top = element('div', 'topic-card-top');
    top.append(element('span', 'topic-category', categories[topic.category].name));
    const save = element('button', 'save-btn');
    save.type = 'button';
    save.dataset.saveSlug = topic.slug;
    top.append(save);
    const art = element('div', 'topic-art');
    art.setAttribute('aria-hidden', 'true');
    art.append(element('span', 'topic-art-symbol', topic.icon));
    const h3 = element('h3', 'topic-title');
    const link = element('a', '', topic.title);
    link.href = topicUrl(topic.slug);
    h3.append(link);
    const english = element('p', 'topic-english', topic.english);
    const summary = element('p', 'topic-summary', topic.summary);
    const bottom = element('div', 'topic-card-bottom');
    bottom.append(element('span', 'meta', `◷ ${topic.minutes} 分鐘`));
    bottom.append(element('span', 'meta', topic.level));
    const view = element('a', 'card-arrow', '↗');
    view.href = topicUrl(topic.slug);
    view.setAttribute('aria-label', `閱讀 ${topic.title}`);
    bottom.append(view);
    card.append(top, art, h3, english, summary, bottom);
    return card;
  }

  function render() {
    const query = search.value.trim().toLocaleLowerCase('zh-TW');
    const bookmarks = new Set(getSaved());
    const filtered = topics.filter(topic => {
      const matchCategory = activeCategory === 'all' || topic.category === activeCategory;
      const matchSaved = !savedOnly.checked || bookmarks.has(topic.slug);
      const fields = [topic.title, topic.english, topic.summary, topic.oneLiner, categories[topic.category].name].join(' ').toLocaleLowerCase('zh-TW');
      return matchCategory && matchSaved && fields.includes(query);
    });
    grid.replaceChildren(...filtered.map(createCard));
    empty.hidden = filtered.length !== 0;
    resultCount.textContent = `共找到 ${filtered.length} 個概念`;
    clearSearch.hidden = search.value.length === 0;
    document.querySelectorAll('[data-category]').forEach(tab => {
      const selected = tab.dataset.category === activeCategory;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-pressed', String(selected));
    });
    updateSavedButtons();
  }

  document.querySelectorAll('[data-category]').forEach(button => {
    button.addEventListener('click', () => { activeCategory = button.dataset.category; render(); });
  });
  document.querySelectorAll('[data-search-suggestion]').forEach(link => {
    link.addEventListener('click', () => { search.value = link.dataset.searchSuggestion; render(); });
  });
  search.addEventListener('input', render);
  savedOnly.addEventListener('change', render);
  clearSearch.addEventListener('click', () => { search.value = ''; search.focus(); render(); });
  document.getElementById('resetFilters').addEventListener('click', () => {
    search.value = ''; savedOnly.checked = false; activeCategory = 'all'; render();
  });
  document.addEventListener('fieldnotes:saved', render);
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault(); search.focus();
    }
    if (event.key === 'Escape' && document.activeElement === search) search.blur();
  });
  document.getElementById('conceptCount').textContent = topics.length;
  document.getElementById('categoryCount').textContent = Object.keys(categories).length;
  render();
})();
