'use strict';

// Sync tests for the four hand-maintained lexicon files. Run with:  node --test
//
//   Beyond CNL Lexicon.md                               canonical, all word classes
//   Skill files for LLMs/beyond_cnl_COMPANION_LEXICON.md  nouns, adjectives, adverbs (no verbs)
//   Skill files for LLMs/SKILL.md                         the verb list
//   js/lexicon.js                                         the linter's allow-list of word forms

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const Lexicon = require('../js/lexicon.js');

const ROOT = path.join(__dirname, '..');
const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8');

const CANONICAL = read('Beyond CNL Lexicon.md');
const COMPANION = read('Skill files for LLMs/beyond_cnl_COMPANION_LEXICON.md');
const SKILL = read('Skill files for LLMs/SKILL.md');
const LEXICON_JS = read('js/lexicon.js');

// Parse `## N. Title (count[ unique])` sections, `### Title (count)` subsections
// and `| `word` | ... |` table rows. A row's word may carry a qualifier, as in
// "| `accuracy` (abstract) | ... |".
function parseSections(text) {
  const sections = [];
  let section = null;
  let subsection = null;
  for (const line of text.split('\n')) {
    let m;
    if ((m = /^## (?:(\d+)\. )?(.+?)(?: \((\d+)( unique)?\))?\s*$/.exec(line))) {
      section = { number: m[1] || null, title: m[2], count: m[3] ? Number(m[3]) : null, unique: Boolean(m[4]), subsections: [], rows: [] };
      sections.push(section);
      subsection = null;
    } else if (section && (m = /^### (.+?)(?: \((\d+)\))?\s*$/.exec(line))) {
      subsection = { title: m[1], count: m[2] ? Number(m[2]) : null, rows: [] };
      section.subsections.push(subsection);
    } else if (section && (m = /^\| `([^`]+)`(?: \([^)]*\))? \|(.*)\|\s*$/.exec(line))) {
      const row = { word: m[1], rest: m[2].trim() };
      section.rows.push(row);
      if (subsection) subsection.rows.push(row);
    }
  }
  return sections;
}

const canonical = parseSections(CANONICAL);
const companion = parseSections(COMPANION);
const skill = parseSections(SKILL);

const byNumber = (sections, n) => sections.find(s => s.number === String(n));
const distinct = rows => new Set(rows.map(r => r.word));
const sorted = iterable => [...iterable].sort();

// `| Nouns | 1084 |` style rows of a summary table.
function summaryCounts(text) {
  const counts = {};
  for (const line of text.split('\n')) {
    const m = /^\| (Function words|Method-only verbs|Nouns|Adjectives|Adverbs|Numerals and units) \| (\d+) \|/.exec(line);
    if (m) counts[m[1]] = Number(m[2]);
  }
  return counts;
}

const canonicalVerbs = distinct(byNumber(canonical, 4).rows);
const TABLE_SECTIONS = [4, 5, 6, 7];

for (const [label, sections] of [['canonical lexicon', canonical], ['companion lexicon', companion]]) {
  test(`${label}: every subsection count equals its table rows`, () => {
    for (const section of sections) {
      for (const sub of section.subsections) {
        if (sub.count === null || sub.rows.length === 0) continue; // plain backtick lists carry semantic counts
        assert.equal(sub.rows.length, sub.count, `${section.title} > ${sub.title}`);
      }
    }
  });

  test(`${label}: every section rollup equals its words`, () => {
    for (const section of sections) {
      if (section.count === null || section.rows.length === 0) continue;
      const actual = section.unique ? distinct(section.rows).size : section.rows.length;
      assert.equal(actual, section.count, section.title);
    }
  });

  test(`${label}: the summary table matches the section rollups`, () => {
    const summary = summaryCounts(label.startsWith('canonical') ? CANONICAL : COMPANION);
    assert.equal(summary['Nouns'], byNumber(sections, 5).count);
    assert.equal(summary['Adjectives'], byNumber(sections, 6).count);
    assert.equal(summary['Adverbs'], byNumber(sections, 7).count);
    assert.equal(summary['Method-only verbs'], canonicalVerbs.size);
  });
}

test('companion lexicon mirrors the canonical nouns, adjectives and adverbs', () => {
  for (const n of [5, 6, 7]) {
    const want = byNumber(canonical, n);
    const got = byNumber(companion, n);
    assert.deepEqual(got.subsections.map(s => s.title), want.subsections.map(s => s.title), `section ${n} subsections`);
    want.subsections.forEach((sub, i) => {
      assert.deepEqual(got.subsections[i].rows, sub.rows, `section ${n} > ${sub.title}`);
    });
  }
});

test('SKILL.md verb list equals the canonical verb list', () => {
  const section = skill.find(s => s.title === 'Approved Verb List');
  assert.ok(section, 'SKILL.md has an "Approved Verb List (N)" section');
  assert.deepEqual(sorted(distinct(section.rows)), sorted(canonicalVerbs));
  assert.equal(section.count, canonicalVerbs.size);
});

test('SKILL.md quotes the current lexicon counts', () => {
  const lists = /complete noun \((\d+)\), adjective \((\d+)\),\s+adverb \((\d+)\), numeral\/unit \((\d+)\), and function-word \((\d+)\)/.exec(SKILL);
  assert.ok(lists, 'the companion-lexicon paragraph lists its counts');
  assert.deepEqual(lists.slice(1).map(Number), [5, 6, 7, 8, 3].map(n => byNumber(canonical, n).count));
  const verbs = /verb list \((\d+)\)/.exec(SKILL);
  assert.equal(Number(verbs[1]), canonicalVerbs.size);
});

test('every canonical table word is in the linter allow-list', () => {
  const missing = [];
  for (const n of TABLE_SECTIONS) {
    for (const word of distinct(byNumber(canonical, n).rows)) {
      if (!Lexicon.isApproved(word)) missing.push(word);
    }
  }
  assert.deepEqual(missing, []);
});

test('imperative verbs are the canonical verbs minus the excluded five', () => {
  const excluded = new Set(['observe', 'measure', 'detect', 'report', 'appear']);
  const want = sorted([...canonicalVerbs].filter(v => !excluded.has(v)));
  assert.deepEqual(sorted(Lexicon.IMPERATIVE_VERBS), want);
});

test('js/lexicon.js header quotes the real number of word forms', () => {
  const quoted = [...LEXICON_JS.matchAll(/(\d{4,}) (?:approved )?word forms/g)].map(m => Number(m[1]));
  assert.ok(quoted.length >= 2, 'both header comments quote a count');
  for (const n of quoted) assert.equal(n, Lexicon.ALLOW_LIST.size);
});

test('version strings agree within and across the skill files', () => {
  const lexiconHead = /^## Version (\d+\.\d+\.\d+)/m.exec(CANONICAL)[1];
  const lexiconFoot = /End of Beyond CNL Lexicon v(\d+\.\d+\.\d+)/.exec(CANONICAL)[1];
  assert.equal(lexiconFoot, lexiconHead);

  const skillHead = /^## Version (\d+\.\d+\.\d+)/m.exec(SKILL)[1];
  const skillFoot = /End of Beyond CNL Skill Document v(\d+\.\d+\.\d+)/.exec(SKILL)[1];
  assert.equal(skillFoot, skillHead);

  const companionHead = /For use alongside Beyond CNL SKILL v(\d+\.\d+\.\d+)/.exec(COMPANION)[1];
  const companionFoot = /End of Beyond CNL Companion Lexicon v(\d+\.\d+\.\d+)/.exec(COMPANION)[1];
  assert.equal(companionHead, skillHead);
  assert.equal(companionFoot, skillHead);
});

test('a noun dropped for carrying a home-system name is rejected with a hint', () => {
  const dropped = byNumber(canonical, 2).rows.filter(r => /home-planet|home-system/.test(r.rest));
  assert.ok(dropped.length > 0, 'the dropped-noun table records at least one such noun');
  for (const { word } of dropped) {
    assert.equal(Lexicon.isApproved(word), false, word);
    assert.ok(Lexicon.getHint(word), `${word} has a replacement hint`);
  }
});

// ---------------------------------------------------------------------------
// Backlog: known drift, kept visible. A failing todo test does not fail the run.
// ---------------------------------------------------------------------------

test('R10 backlog: nouns dropped in lexicon §2 are not approved', { todo: true }, () => {
  const dropped = byNumber(canonical, 2).rows.map(r => r.word);
  const kept = new Set(byNumber(canonical, 5).rows.map(r => r.word)); // "keep in Measurement" de-duplications
  const stillApproved = dropped.filter(w => !kept.has(w) && Lexicon.isApproved(w));
  assert.deepEqual(stillApproved, []);
});

test('R8 backlog: numerals, `least` and irregular past forms are approved', { todo: true }, () => {
  const wanted = ['two', 'three', 'nineteen', 'third', 'ninth', 'least', 'fell', 'rose', 'built', 'held', 'began', 'wrote'];
  assert.deepEqual(wanted.filter(w => !Lexicon.isApproved(w)), []);
});

test('R8 backlog: wrongly inflected forms are not approved', { todo: true }, () => {
  const wrong = ['falled', 'builded', 'rised', 'controled', 'transmited', 'coolled', 'openned', 'prooves'];
  assert.deepEqual(wrong.filter(w => Lexicon.isApproved(w)), []);
});
