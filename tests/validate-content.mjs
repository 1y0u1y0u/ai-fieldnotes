// Run with: node tests/validate-content.mjs (Node.js 18+)
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { runInNewContext } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const code = readFileSync(join(root, 'data/topics.js'), 'utf8');
const sandbox = { window: {} };
runInNewContext(code, sandbox, { filename: 'data/topics.js', timeout: 1000 });
const topics = sandbox.window.AI_FIELDNOTES_TOPICS;
const categories = new Set(['core', 'generation', 'application', 'practice']);
const requiredText = ['slug', 'title', 'english', 'category', 'level', 'icon', 'summary', 'oneLiner', 'analogy'];
const seen = new Set();
let assertions = 0;
const verify = (condition, message) => { assert.ok(condition, message); assertions++; };
const nonempty = value => typeof value === 'string' && value.trim().length > 0;

verify(Array.isArray(topics) && topics.length > 0, 'topics.js must export a non-empty array');
for (const [index, topic] of topics.entries()) {
  const id = `Topic ${index + 1} (${topic?.slug ?? 'unknown'})`;
  for (const field of requiredText) verify(nonempty(topic[field]), `${id}: missing text field ${field}`);
  verify(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic.slug), `${id}: invalid slug`);
  verify(!seen.has(topic.slug), `${id}: duplicate slug`); seen.add(topic.slug);
  verify(categories.has(topic.category), `${id}: invalid category`);
  verify(['入門', '進階'].includes(topic.level), `${id}: invalid level`);
  verify(Number.isInteger(topic.minutes) && topic.minutes > 0 && topic.minutes <= 60, `${id}: invalid reading minutes`);
  verify(Array.isArray(topic.mechanics) && topic.mechanics.length === 3, `${id}: exactly 3 mechanics required`);
  verify(Array.isArray(topic.examples) && topic.examples.length >= 2, `${id}: 2+ examples required`);
  verify(Array.isArray(topic.misconceptions) && topic.misconceptions.length >= 2, `${id}: 2+ misconceptions required`);
  verify(Array.isArray(topic.glossary) && topic.glossary.length >= 3, `${id}: 3+ glossary entries required`);
  for (const [field, keys] of [['mechanics', ['title','body']], ['examples', ['title','body']], ['misconceptions', ['myth','fact']], ['glossary', ['term','definition']]]) {
    for (const [i, item] of topic[field].entries()) for (const key of keys) verify(nonempty(item[key]), `${id}: ${field}[${i}].${key} missing`);
  }
  verify(topic.quiz && nonempty(topic.quiz.question), `${id}: quiz question missing`);
  verify(Array.isArray(topic.quiz.options) && topic.quiz.options.length === 4 && topic.quiz.options.every(nonempty), `${id}: quiz needs 4 choices`);
  verify(Number.isInteger(topic.quiz.correctIndex) && topic.quiz.correctIndex >= 0 && topic.quiz.correctIndex < 4, `${id}: quiz answer index out of bounds`);
  verify(nonempty(topic.quiz.explanation), `${id}: quiz explanation missing`);
  // Detail URL should be safe to construct and remain relative to a Pages project subfolder.
  verify(!topic.slug.includes('/'), `${id}: slash not allowed in URL slug`);
}

for (const file of ['AGENTS.md','README.md','index.html','topic.html','about.html','assets/styles.css','assets/shared.js','assets/app.js','assets/topic.js','images/favicon.svg','.nojekyll']) {
  verify(existsSync(join(root, file)), `Missing project file: ${file}`);
}
const index = readFileSync(join(root, 'index.html'), 'utf8');
const detail = readFileSync(join(root, 'topic.html'), 'utf8');
verify(index.includes('id="topicGrid"'), 'Homepage needs a topic grid');
verify(index.includes('id="topicSearch"'), 'Homepage needs a search input');
verify(index.includes('id="savedOnly"'), 'Homepage needs a saved filter');
verify(detail.includes('id="topicContent"'), 'Detail template needs a content root');
for (const name of ['index.html', 'topic.html', 'about.html']) {
  const html = readFileSync(join(root, name), 'utf8');
  verify(/<html\s+lang="zh-Hant"/.test(html), `${name}: missing zh-Hant language`);
  verify(/<meta\s+name="viewport"/.test(html), `${name}: missing responsive viewport`);
  verify(/href="assets\/styles\.css"/.test(html), `${name}: missing shared stylesheet`);
  verify(!/(?:href|src)="\/(?!\/)/.test(html), `${name}: root-relative link may break on GitHub Pages`);
}
console.log(`PASS ✓ ${topics.length} topic records, ${categories.size} category options, ${assertions} checks.`);
console.log('PASS ✓ required files, page targets, relative assets and responsive metadata.');
