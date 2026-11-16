'use strict';
(function () {
  const categories = Object.freeze({
    core: { name: '核心原理', short: '理解基礎', order: 0 },
    generation: { name: '生成模型', short: '認識創作', order: 1 },
    application: { name: '實務應用', short: '連結場景', order: 2 },
    practice: { name: '使用技巧', short: '動手實作', order: 3 }
  });

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined && content !== null) node.textContent = String(content);
    return node;
  }

  function topicUrl(slug) {
    return `topic.html?slug=${encodeURIComponent(slug)}`;
  }

  function updateSavedButtons() {
    const saved = getSaved();
    document.querySelectorAll('[data-save-slug]').forEach((button) => {
      const active = saved.includes(button.dataset.saveSlug);
      button.classList.toggle('is-saved', active);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', active ? '取消收藏' : '收藏這個概念');
      button.title = active ? '取消收藏' : '加入收藏';
      button.textContent = active ? '♥' : '♡';
    });
  }

  function getSaved() {
    try {
      const parsed = JSON.parse(localStorage.getItem('ai-fieldnotes-saved') || '[]');
      return Array.isArray(parsed) ? parsed.filter(item => typeof item === 'string') : [];
    } catch (_) { return []; }
  }

  function toggleSaved(slug) {
    const saved = new Set(getSaved());
    if (saved.has(slug)) saved.delete(slug);
    else saved.add(slug);
    try { localStorage.setItem('ai-fieldnotes-saved', JSON.stringify([...saved])); }
    catch (_) { /* Private browsing may block storage; browsing still works. */ }
    updateSavedButtons();
    document.dispatchEvent(new CustomEvent('fieldnotes:saved'));
  }

  function initShared() {
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
    document.querySelectorAll('[data-random]').forEach(button => {
      button.addEventListener('click', () => {
        const topics = window.AI_FIELDNOTES_TOPICS || [];
        if (topics.length) location.href = topicUrl(topics[Math.floor(Math.random() * topics.length)].slug);
      });
    });
    document.addEventListener('click', event => {
      const saveButton = event.target.closest('[data-save-slug]');
      if (saveButton) { event.preventDefault(); toggleSaved(saveButton.dataset.saveSlug); }
    });
    updateSavedButtons();
  }

  window.Fieldnotes = { categories, element, topicUrl, getSaved, toggleSaved, updateSavedButtons };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initShared);
  else initShared();
})();
