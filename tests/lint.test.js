'use strict';

// Linter regression tests. Run with:  node --test
//
// Node has no js-yaml, so these tests exercise the linter's built-in fallback
// frontmatter parser. The browser path (js-yaml from the CDN) is checked by
// loading the samples in Beyond-CNL-Linter.html.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const Linter = require('../js/linter.js');

const ROOT = path.join(__dirname, '..');
const SAMPLES = path.join(ROOT, 'samples');

// Fifteen lines; with the blank line that follows, a test body starts on line 17.
const FRONTMATTER = [
  '---',
  'schema: beyond-cnl-v0.4',
  'purpose: Describe the signal.',
  'phase: Discovery',
  'instruments:',
  '  - id: RX-4',
  '    type: receiver',
  'references:',
  '  - id: REF-1',
  '    title: Record',
  '    access: public',
  'conditions:',
  '  - id: COND-1',
  '    statement: The signal persists.',
  '---'
].join('\n');
const BODY_LINE = 17;

function lintBody(body, frontmatter = FRONTMATTER) {
  return Linter.lint(frontmatter + '\n\n' + body);
}

function describe(result) {
  return result.findings
    .filter(f => f.rule !== 'EVID-COVERAGE')
    .map(f => `[${f.severity}] line ${f.line} ${f.rule}: ${f.word}`)
    .join('\n') || '(no findings)';
}

function found(result, rule, severity) {
  return result.findings.filter(f => f.rule === rule && (!severity || f.severity === severity));
}

function assertFinding(result, rule, severity, word) {
  const hits = found(result, rule, severity).filter(f => !word || String(f.word).toLowerCase().includes(word.toLowerCase()));
  assert.ok(hits.length > 0, `expected ${severity} ${rule}${word ? ` on "${word}"` : ''}; got:\n${describe(result)}`);
}

function assertNoFinding(result, rule) {
  assert.equal(found(result, rule).length, 0, `expected no ${rule}; got:\n${describe(result)}`);
}

function assertClean(result) {
  assert.equal(result.summary.errors, 0, `expected no errors; got:\n${describe(result)}`);
  assert.equal(result.summary.warnings, 0, `expected no warnings; got:\n${describe(result)}`);
}

// ---------------------------------------------------------------------------
// Samples and documented examples
// ---------------------------------------------------------------------------

for (const name of fs.readdirSync(SAMPLES).filter(n => n.startsWith('SAMPLE-'))) {
  test(`sample lints clean: ${name}`, () => {
    const result = Linter.lint(fs.readFileSync(path.join(SAMPLES, name), 'utf8'));
    assertClean(result);
    assert.equal(result.summary.compliant, true);
  });
}

test('README compliant example lints clean', () => {
  const result = lintBody([
    '> The signal amplitude at 1420.405 mega hertz decreased by 3.1 decibel',
    '> over a 24-hour window (measured, instrument `RX-4`).'
  ].join('\n'));
  assertClean(result);
});

test('a document without frontmatter is rejected', () => {
  const result = Linter.lint('The signal persists (observed, operator).');
  assertFinding(result, 'FRONT-MISSING', 'error');
  assert.equal(result.summary.compliant, false);
});

test('a clause without an E-tag is rejected', () => {
  const result = lintBody('The signal decreases over time.');
  assertFinding(result, 'EVID-MISSING', 'error');
});

// ---------------------------------------------------------------------------
// R1: every token is classified; nothing skips the lexicon
// ---------------------------------------------------------------------------

test('R1: a digit suffix does not hide a banned word', () => {
  const result = lintBody('We1 believe2 humans3 are4 good5 and I6 want7 peace8 (observed, operator).');
  for (const word of ['believe2', 'are4', 'good5', 'I6', 'want7']) {
    assertFinding(result, 'LEXICON-BANNED', 'error', word);
  }
  assertFinding(result, 'LEXICON-TOKEN', 'warning', 'humans3');
  assert.equal(result.summary.compliant, false);
});

test('R1: an underscore does not hide a banned word', () => {
  const result = lintBody('we_believe humans_are_good (observed, operator).');
  assertFinding(result, 'LEXICON-BANNED', 'error', 'we_believe');
  assertFinding(result, 'LEXICON-BANNED', 'error', 'humans_are_good');
});

test('R1: a hyphen does not hide a banned word', () => {
  const result = lintBody('The source remains we-believe (observed, operator).');
  assertFinding(result, 'LEXICON-BANNED', 'error', 'we-believe');
});

test('R1: non-Latin script is rejected', () => {
  for (const sentence of ['Мы люди Земли хотим мира (observed, operator).', '我们相信和平 (observed, operator).']) {
    const result = lintBody(sentence);
    assertFinding(result, 'LEXICON-SCRIPT', 'error');
    assert.equal(result.summary.compliant, false);
  }
});

test('R1: numbers, percentages and number-word compounds are accepted', () => {
  const result = lintBody('The count reaches 1,247 within 2% over a 24-hour window at -174 decibel (measured, receiver `RX-4`).');
  assertClean(result);
});

test('R1: a bare identifier is an unrecognized token, not a banned word', () => {
  const result = lintBody('Receiver AM-2 persists near source US-1 (observed, operator).');
  assertFinding(result, 'LEXICON-TOKEN', 'warning', 'AM-2');
  assertNoFinding(result, 'LEXICON-BANNED');
});

// ---------------------------------------------------------------------------
// R2: code fences never hide content
// ---------------------------------------------------------------------------

const BANNED_LINE = 'We believe humans of Earth are good!';

test('R2: an unclosed fence is an error and its content is still checked', () => {
  const result = lintBody(['The signal persists (observed, operator).', '', '```definition', BANNED_LINE].join('\n'));
  assertFinding(result, 'FENCE-UNCLOSED', 'error');
  assertFinding(result, 'LEXICON-BANNED', 'error', 'believe');
});

test('R2: a fence without an info string is an error and its content is checked', () => {
  const result = lintBody(['```', BANNED_LINE, '```'].join('\n'));
  assertFinding(result, 'C-INFO', 'error');
  assertFinding(result, 'LEXICON-BANNED', 'error', 'believe');
});

test('R2: an unknown info string is flagged for review and its content is checked', () => {
  const result = lintBody(['```note', BANNED_LINE, '```'].join('\n'));
  assertFinding(result, 'C-4', 'info');
  assertFinding(result, 'LEXICON-BANNED', 'error', 'believe');
  assertFinding(result, 'EVID-MISSING', 'error');
});

test('R2: an info string with a space does not desynchronize the fences', () => {
  const result = lintBody(['```definition extra', 'The signal persists (defined).', '```', '', BANNED_LINE].join('\n'));
  assertFinding(result, 'C-INFO', 'error');
  assertFinding(result, 'LEXICON-BANNED', 'error', 'believe');
});

test('R2: a longer fence is not closed by a shorter one', () => {
  const result = lintBody(['````definition', 'The signal persists (defined).', '```', 'The source persists (defined).', '````'].join('\n'));
  assertNoFinding(result, 'FENCE-UNCLOSED');
  assert.match(found(result, 'EVID-COVERAGE')[0].reason, /^2 of 3 /);
});

test('R2: relation blocks admit E-DER clauses with operators', () => {
  const result = lintBody(['```relation', 'The ratio = flux / area (derived, from `REF-1`).', '```'].join('\n'));
  assertClean(result);
});

test('R2: relation blocks reject other E-tag types (C-7)', () => {
  const result = lintBody(['```relation', 'The ratio equals 4 (measured, receiver `RX-4`).', '```'].join('\n'));
  assertFinding(result, 'C-7', 'error');
});

test('R2: operators outside a relation block are flagged (C-7)', () => {
  const result = lintBody('The ratio = 4 (derived, from `REF-1`).');
  assertFinding(result, 'C-7', 'warning', '=');
});

// ---------------------------------------------------------------------------
// R3: frontmatter prose is checked like body text
// ---------------------------------------------------------------------------

test('R3: banned words in the purpose are errors on the right line', () => {
  const fm = FRONTMATTER.replace('purpose: Describe the signal.',
    'purpose: We the people of Earth want friendship and believe our weapons are good!');
  const result = lintBody('The signal persists (observed, operator).', fm);
  for (const word of ['want', 'believe', 'our', 'are', 'good']) {
    assertFinding(result, 'LEXICON-BANNED', 'error', word);
  }
  assertFinding(result, 'LEXICON-PUNCT', 'error');
  assertFinding(result, 'HAZARD-LOCATION', 'warning', 'Earth');
  assert.ok(found(result, 'LEXICON-BANNED').every(f => f.line === 3), 'findings should point at the purpose line');
});

test('R3: unknown words in a condition statement are warnings on the right line', () => {
  const fm = FRONTMATTER.replace('statement: The signal persists.', 'statement: The signal persists zzzgarble.');
  const result = lintBody('The signal persists (observed, operator).', fm);
  const hits = found(result, 'LEXICON-ALLOW-LIST', 'warning');
  assert.equal(hits.length, 1, describe(result));
  assert.equal(hits[0].line, 14);
});

test('R3: identifier and enumeration fields are not read as prose', () => {
  const result = lintBody('The signal persists (observed, instrument `RX-4`).');
  assertClean(result);
});

test('R3: a folded block scalar is read as prose', () => {
  const fm = FRONTMATTER.replace('    statement: The signal persists.',
    ['    statement: >', '      The signal persists', '      and we believe it.',
      '  - id: COND-2', '    statement: The signal persists.'].join('\n'));
  const result = lintBody('The signal persists (observed, operator).', fm);
  assertFinding(result, 'LEXICON-BANNED', 'error', 'believe');
  assert.equal(found(result, 'LEXICON-BANNED')[0].line, 15, 'points at the first line of the folded text, not at a later look-alike');
  assertNoFinding(result, 'LEXICON-TOKEN');
});

test('R3: a wrapped plain value is read as prose', () => {
  const fm = FRONTMATTER.replace('purpose: Describe the signal.', 'purpose: Describe the signal\n  that we believe persists.');
  const result = lintBody('The signal persists (observed, operator).', fm);
  assertFinding(result, 'LEXICON-BANNED', 'error', 'believe');
});

test('R3: a YAML comment is read as prose', () => {
  const fm = FRONTMATTER.replace('    type: receiver', '    type: receiver # built by humans who believe\n    # We want peace');
  const result = lintBody('The signal persists (observed, operator).', fm);
  assertFinding(result, 'LEXICON-BANNED', 'error', 'believe');
  assertFinding(result, 'LEXICON-BANNED', 'error', 'want');
  assert.deepEqual(found(result, 'LEXICON-BANNED').map(f => f.line), [7, 8]);
  assertNoFinding(result, 'R-1');
});

test('fallback parser: a nested list is not an empty value', () => {
  const fm = FRONTMATTER.replace(/---$/, [
    'hypothesis_space:',
    '  - id: H-1',
    '    statement: The signal persists.',
    '    discriminates_via:',
    '      - OBS-0.1',
    '  - id: H-2',
    '    statement: The signal persists.',
    '    discriminates_via: OBS-0.1',
    '---'
  ].join('\n'));
  const result = lintBody('The signal persists (observed, operator).', fm);
  assertNoFinding(result, 'E-HYP-3');
  assertClean(result);
});

test('R3: an undeclared identifier in frontmatter prose is an error', () => {
  const fm = FRONTMATTER.replace('statement: The signal persists.', 'statement: The signal of `NOPE-9` persists.');
  const result = lintBody('The signal persists (observed, operator).', fm);
  assertFinding(result, 'R-11', 'error', 'NOPE-9');
});

// ---------------------------------------------------------------------------
// R4: first person and contracted copulas
// ---------------------------------------------------------------------------

test('R4: the pronoun I is banned', () => {
  const result = lintBody('I observed the signal (observed, operator).');
  assertFinding(result, 'LEXICON-BANNED', 'error', 'I');
});

test('R4: other single letters are still left alone', () => {
  const result = lintBody('The chamber reaches 500 degree C (measured, receiver `RX-4`).');
  assertClean(result);
});

test('R4: contracted copulas are banned', () => {
  const result = lintBody("It's a signal and that's the source and we're here and I'm present (observed, operator).");
  for (const word of ["It's", "that's", "we're", "I'm"]) {
    assertFinding(result, 'LEXICON-BANNED', 'error', word);
  }
});

test('R4: a curly apostrophe does not hide a copula', () => {
  const result = lintBody('The signal isn’t present and the sources aren’t near (observed, operator).');
  assertFinding(result, 'LEXICON-BANNED', 'error', "isn't");
  assertFinding(result, 'LEXICON-BANNED', 'error', "aren't");
});

test('R4: a possessive is an unknown word with a hint, not a copula', () => {
  const result = lintBody("The sensor's range persists (observed, operator).");
  assertNoFinding(result, 'LEXICON-BANNED');
  assertFinding(result, 'LEXICON-ALLOW-LIST', 'warning', "sensor's");
});

// ---------------------------------------------------------------------------
// R5: the argument-free tags are not a free pass
// ---------------------------------------------------------------------------

test('R5: (procedure) on a declarative clause fails E-PRO-1 outside a list too', () => {
  const result = lintBody('The signal persists (procedure).');
  assertFinding(result, 'E-PRO-1', 'error');
});

test('R5: a step that starts with an identifier or a number fails E-PRO-1', () => {
  const result = lintBody(['## Procedure', '', '1. `RX-4` persists near the source (procedure, step 1).', '2. 14 days pass (procedure, step 2).'].join('\n'));
  assert.equal(found(result, 'E-PRO-1', 'error').length, 2, describe(result));
});

test('R5: an imperative step still passes', () => {
  const result = lintBody(['## Procedure', '', '1. Set the signal to zero (procedure, step 1, if `COND-1`).'].join('\n'));
  assertClean(result);
});

test('R5: (defined) on a paragraph claim fails E-DEF-1', () => {
  const result = lintBody('The source contains a signal (defined).');
  assertFinding(result, 'E-DEF-1', 'error');
});

test('R5: (defined) is accepted on a bolded term and in definition and constraint blocks', () => {
  const result = lintBody([
    'The **signal** designates the flux above the baseline (defined).',
    '',
    '```definition',
    'baseline: the flux with no source present (defined).',
    '```',
    '',
    '```constraint',
    'Condition `COND-1` requires a signal above the baseline (defined).',
    '```'
  ].join('\n'));
  assertClean(result);
});

// ---------------------------------------------------------------------------
// R6: every tag in a compound sentence is validated
// ---------------------------------------------------------------------------

test('R6: an invalid earlier tag in a compound sentence is an error', () => {
  const result = lintBody('The flux rises (opinion), and the noise remains constant (observed, operator).');
  assertFinding(result, 'EVID-MALFORMED', 'error', 'opinion');
});

test('R6: an earlier tag resolves its references by type', () => {
  const result = lintBody('The flux reaches 4 kelvin (measured, receiver `NOPE-9`), and the noise remains constant (observed, operator).');
  assertFinding(result, 'R-1', 'error', 'NOPE-9');
  assertNoFinding(result, 'R-11');
});

test('R6: an earlier tag obeys the block register', () => {
  const result = lintBody('> The flux rises (derived, from `REF-1`), and the noise remains constant (observed, operator).');
  assertFinding(result, 'B-1', 'error');
});

test('R6: a valid compound sentence is clean and stays one numbered clause', () => {
  const result = lintBody([
    'The flux reaches 4 kelvin (measured, receiver `RX-4`), and the noise remains constant (observed, operator).',
    '',
    'The signal persists (derived, from `OBS-0.1`).'
  ].join('\n'));
  assertClean(result);
  assert.match(found(result, 'EVID-COVERAGE')[0].reason, /^2 of 2 /);
});

test('R6: an earlier (procedure) tag still needs an imperative clause', () => {
  const result = lintBody('The signal persists (procedure), and the noise remains constant (observed, operator).');
  assertFinding(result, 'E-PRO-1', 'error');
});

test('R6: a later clause in a compound step is checked on its own words', () => {
  const result = lintBody(['## Procedure', '', '1. Set the signal to zero (procedure, step 1), and the noise remains constant (procedure, step 2).'].join('\n'));
  assertFinding(result, 'E-PRO-1', 'error', 'the');
});

test('R6: a parenthetical aside is flagged and its words are still checked', () => {
  const result = lintBody('The signal (we believe) persists (observed, operator).');
  assertFinding(result, 'CLAUSE-PAREN', 'warning');
  assertFinding(result, 'LEXICON-BANNED', 'error', 'believe');
});

// ---------------------------------------------------------------------------
// Backlog: known gaps, kept visible. A failing todo test does not fail the run.
// ---------------------------------------------------------------------------

test('R8 backlog: irregular past forms and numerals are approved', { todo: true }, () => {
  const result = lintBody('The signal fell and the flux rose across three windows (observed, operator).');
  assertNoFinding(result, 'LEXICON-ALLOW-LIST');
});

test('R9 backlog: the lexicon words `mean` and `right` are not banned', { todo: true }, () => {
  const result = lintBody('The mean delay equals 4 second on the right face (measured, receiver `RX-4`).');
  assertNoFinding(result, 'LEXICON-BANNED');
});

test('R11 backlog: a heading may end in parentheses', { todo: true }, () => {
  const result = lintBody(['## Procedure (alternate path)', '', '1. Set the signal to zero (procedure, step 1).'].join('\n'));
  assertNoFinding(result, 'H-1');
});

test('R12 backlog: the spec form (stipulated, for phase `X`) resolves', { todo: true }, () => {
  const result = lintBody('The pause duration equals 14 days (stipulated, for phase `Characterization`).');
  assertNoFinding(result, 'R-SCOPE');
});

test('R13 backlog: digits inside an identifier do not satisfy E-MSR-1', { todo: true }, () => {
  const result = lintBody('Receiver `RX-4` registers the signal (measured, receiver `RX-4`).');
  assertFinding(result, 'E-MSR-1', 'warning');
});

test('R15 backlog: a tag with no clause in front of it is rejected', { todo: true }, () => {
  const result = lintBody('(observed, operator).');
  assert.ok(result.summary.errors > 0, describe(result));
});
