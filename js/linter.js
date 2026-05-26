/**
 * Beyond CNL Linter Engine — Envelope Grammar (spec v0.2 / schema v0.3)
 *
 * Implements the §6.12 pipeline:
 *   tokenizeLines → parseFrontmatter → parseBody → parseTaggedClause / parseETag
 *   → checkRegister (§6.8) → checkResolution (§6.9) → checkLexicon (Layer 1)
 *   → checkSemantics (Layer 3) → checkHazards (Layer 5)
 *
 * Public surface preserved:
 *   lint(text) → { findings, summary }
 *   generateMarkdownReport(text, results) → string
 *   SEVERITY
 */

const BeyondLinter = (() => {

  const SEVERITY = {
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
  };

  const LAYER_NAMES = ['', 'Lexicon', 'Grammar', 'Evidential', 'Markdown structure', 'Information hazard'];

  // ===== ENTRY POINT =====

  function lint(text) {
    const startTime = (typeof performance !== 'undefined') ? performance.now() : Date.now();
    const findings = [];

    // 1–2. Tokenize + parse frontmatter (§5)
    const lines = tokenizeLines(text);
    const fm = parseFrontmatter(lines, findings);

    // 3–4. Parse body blocks (§6.5) and tagged clauses (§6.6)
    const blocks = parseBody(lines, fm.bodyStartLine);
    const clauses = [];
    blocks.forEach(b => parseClausesForBlock(b, clauses, findings));

    // Assign clause IDs (used by §6.9 R-4 premise resolution)
    assignClauseIds(blocks, clauses);

    // 5. Register checks (§6.8)
    checkRegister(blocks, findings);

    // 6. Resolution checks (§6.9 R-1..R-4, P-1..P-6) + FRONT-1
    checkResolution(clauses, fm, findings);

    // 7. Layer 1: lexicon (per token in clause interiors / headings)
    checkLexicon(blocks, clauses, findings);

    // 8. Layer 3: semantic checks (E-RPT-3, E-DER-1 circularity, E-PRO-2, E-MSR-2)
    checkSemantics(clauses, fm, findings);

    // 9. Layer 5: information-hazard scan (now block-aware)
    checkHazards(blocks, findings);

    // Coverage metric (§7.3)
    addCoverageMetric(blocks, clauses, findings);

    // Sort by line, then severity
    const sevOrder = { error: 0, warning: 1, info: 2 };
    findings.sort((a, b) => {
      if (a.line !== b.line) return a.line - b.line;
      return sevOrder[a.severity] - sevOrder[b.severity];
    });

    const endTime = (typeof performance !== 'undefined') ? performance.now() : Date.now();
    const summary = buildSummary(findings, endTime - startTime);
    return { findings, summary };
  }

  // ===== STEP 1: tokenizeLines =====
  // Annotate each line with: { idx (1-based), raw, trimmed, inCodeBlock, fence, infoString }

  function tokenizeLines(text) {
    const raw = text.split('\n');
    const lines = [];
    let inFm = false;
    let fmDone = false;
    let inCode = false;
    let codeInfo = '';
    let charOffset = 0;

    raw.forEach((line, i) => {
      const lineNum = i + 1;
      const trimmed = line.trim();

      // Frontmatter fence detection
      if (!fmDone) {
        if (!inFm && i === 0 && trimmed === '---') {
          inFm = true;
          lines.push({ idx: lineNum, raw: line, trimmed, offset: charOffset, region: 'fm-fence' });
          charOffset += line.length + 1;
          return;
        }
        if (inFm && trimmed === '---') {
          fmDone = true;
          inFm = false;
          lines.push({ idx: lineNum, raw: line, trimmed, offset: charOffset, region: 'fm-fence' });
          charOffset += line.length + 1;
          return;
        }
        if (inFm) {
          lines.push({ idx: lineNum, raw: line, trimmed, offset: charOffset, region: 'fm' });
          charOffset += line.length + 1;
          return;
        }
      }

      // Code-fence detection in body
      const fenceMatch = trimmed.match(/^```(\S*)\s*$/);
      if (fenceMatch) {
        if (!inCode) {
          inCode = true;
          codeInfo = fenceMatch[1] || '';
          lines.push({
            idx: lineNum, raw: line, trimmed,
            offset: charOffset, region: 'code-fence-open', infoString: codeInfo
          });
        } else {
          inCode = false;
          lines.push({
            idx: lineNum, raw: line, trimmed,
            offset: charOffset, region: 'code-fence-close', infoString: codeInfo
          });
          codeInfo = '';
        }
        charOffset += line.length + 1;
        return;
      }

      if (inCode) {
        lines.push({
          idx: lineNum, raw: line, trimmed,
          offset: charOffset, region: 'code', infoString: codeInfo
        });
        charOffset += line.length + 1;
        return;
      }

      lines.push({ idx: lineNum, raw: line, trimmed, offset: charOffset, region: 'body' });
      charOffset += line.length + 1;
    });

    return lines;
  }

  // ===== STEP 2: parseFrontmatter (§5) =====

  function parseFrontmatter(lines, findings) {
    const empty = {
      raw: '',
      data: null,
      bodyStartLine: 1,
      instruments: new Map(),
      references: new Map(),
      conditions: new Map(),
      technicalNames: new Map(),
      scopes: new Set()
    };

    const fmLines = lines.filter(l => l.region === 'fm');
    const fences = lines.filter(l => l.region === 'fm-fence');

    if (fences.length < 2) {
      findings.push(makeFinding({
        layer: 4, severity: SEVERITY.ERROR,
        category: 'Missing frontmatter',
        word: '---',
        line: 1,
        reason: 'Beyond CNL documents must begin with YAML frontmatter (schema §5). A document without frontmatter is rejected.',
        rule: 'FRONT-MISSING'
      }));
      return empty;
    }

    empty.bodyStartLine = fences[1].idx + 1;
    const text = fmLines.map(l => l.raw).join('\n');
    empty.raw = text;

    // Try real YAML parser first
    let data = null;
    const yaml = getYamlParser();
    if (yaml) {
      try {
        data = yaml.load(text);
      } catch (err) {
        findings.push(makeFinding({
          layer: 4, severity: SEVERITY.ERROR,
          category: 'Frontmatter YAML parse error',
          word: String(err.message || err).slice(0, 80),
          line: fences[0].idx,
          reason: `YAML parser rejected the frontmatter: ${err.message || err}`,
          rule: 'FRONT-YAML'
        }));
      }
    } else {
      data = fallbackParseFrontmatter(text);
    }

    if (!data || typeof data !== 'object') {
      return empty;
    }
    empty.data = data;

    // FRONT-4: schema version must equal what this linter implements
    const expected = BeyondLexicon.LINTER_SCHEMA_VERSION;
    if (!data.schema) {
      findings.push(makeFinding({
        layer: 4, severity: SEVERITY.ERROR,
        category: 'Missing schema declaration',
        word: 'schema:', line: fences[0].idx,
        reason: `Frontmatter must declare "schema: ${expected}".`,
        rule: 'FRONT-4'
      }));
    } else if (data.schema !== expected) {
      const newer = compareSchemaVersion(data.schema, expected) > 0;
      findings.push(makeFinding({
        layer: 4, severity: SEVERITY.ERROR,
        category: newer ? 'Schema version newer than linter' : 'Schema version mismatch',
        word: String(data.schema),
        line: fences[0].idx,
        reason: newer
          ? `Document declares "${data.schema}" but this linter implements "${expected}". Per FRONT-4, a document declaring a future schema is rejected (prevents silent downgrade).`
          : `Document declares "${data.schema}"; this linter implements "${expected}".`,
        rule: 'FRONT-4'
      }));
    }

    // FRONT-2: purpose must exist
    if (!data.purpose) {
      findings.push(makeFinding({
        layer: 4, severity: SEVERITY.ERROR,
        category: 'Missing purpose',
        word: 'purpose:', line: fences[0].idx,
        reason: 'Frontmatter must declare a narrow procedural purpose statement (FRONT-2).',
        rule: 'FRONT-2'
      }));
    }

    // FRONT-3: phase must be one of five
    if (!data.phase) {
      findings.push(makeFinding({
        layer: 4, severity: SEVERITY.WARNING,
        category: 'Missing phase',
        word: 'phase:', line: fences[0].idx,
        reason: `Frontmatter should declare phase: one of ${BeyondLexicon.PHASES.join(' | ')}.`,
        rule: 'FRONT-3'
      }));
    } else if (!BeyondLexicon.PHASES.includes(String(data.phase))) {
      findings.push(makeFinding({
        layer: 4, severity: SEVERITY.ERROR,
        category: 'Invalid phase',
        word: String(data.phase), line: fences[0].idx,
        reason: `Phase must be one of: ${BeyondLexicon.PHASES.join(', ')}.`,
        rule: 'FRONT-3'
      }));
    }

    // Build maps for §6.9 resolution
    const idRe = /^[A-Za-z_][A-Za-z0-9_\-.]*$/;

    (data.instruments || []).forEach(item => {
      if (!item || !item.id) return;
      if (!idRe.test(item.id)) {
        findings.push(makeFinding({
          layer: 4, severity: SEVERITY.ERROR,
          category: 'Invalid identifier',
          word: String(item.id), line: fences[0].idx,
          reason: `instruments[].id "${item.id}" violates the §6.2 Identifier production.`,
          rule: 'IDENT'
        }));
      }
      empty.instruments.set(String(item.id), item);
    });

    (data.references || []).forEach(item => {
      if (!item || !item.id) return;
      if (!idRe.test(item.id)) {
        findings.push(makeFinding({
          layer: 4, severity: SEVERITY.ERROR,
          category: 'Invalid identifier',
          word: String(item.id), line: fences[0].idx,
          reason: `references[].id "${item.id}" violates the §6.2 Identifier production.`,
          rule: 'IDENT'
        }));
      }
      if (item.access && !['public', 'restricted', 'private'].includes(String(item.access))) {
        findings.push(makeFinding({
          layer: 4, severity: SEVERITY.ERROR,
          category: 'Invalid reference access',
          word: String(item.access), line: fences[0].idx,
          reason: `references[].access must be one of public, restricted, private — got "${item.access}".`,
          rule: 'FRONT-REF-ACCESS'
        }));
      }
      empty.references.set(String(item.id), item);
    });

    (data.conditions || []).forEach(item => {
      if (!item || !item.id) return;
      if (!idRe.test(item.id)) {
        findings.push(makeFinding({
          layer: 4, severity: SEVERITY.ERROR,
          category: 'Invalid identifier',
          word: String(item.id), line: fences[0].idx,
          reason: `conditions[].id "${item.id}" violates the §6.2 Identifier production.`,
          rule: 'IDENT'
        }));
      }
      empty.conditions.set(String(item.id), item);
    });

    (data.technical_names || []).forEach(item => {
      if (!item || !item.term) return;
      empty.technicalNames.set(String(item.term), item);
    });

    // Scopes for E-DEF "stipulated, for ScopeName": phase names + any declared scopes
    BeyondLexicon.PHASES.forEach(p => empty.scopes.add(p));
    if (data.phase) empty.scopes.add(String(data.phase));

    return empty;
  }

  function compareSchemaVersion(a, b) {
    const pa = /v(\d+)\.(\d+)/.exec(a);
    const pb = /v(\d+)\.(\d+)/.exec(b);
    if (!pa || !pb) return 0;
    const da = parseInt(pa[1]) * 1000 + parseInt(pa[2]);
    const db = parseInt(pb[1]) * 1000 + parseInt(pb[2]);
    return da - db;
  }

  function getYamlParser() {
    if (typeof jsyaml !== 'undefined') return jsyaml;
    if (typeof globalThis !== 'undefined' && globalThis.jsyaml) return globalThis.jsyaml;
    if (typeof require === 'function') {
      try { return require('js-yaml'); } catch (_) { /* not available */ }
    }
    return null;
  }

  // Minimal fallback: extracts top-level keys and arrays of `- id: X` style entries.
  // Used only when js-yaml isn't available. Does not enforce YAML 1.2 fidelity.
  function fallbackParseFrontmatter(text) {
    const data = { instruments: [], references: [], conditions: [], technical_names: [] };
    const lines = text.split('\n');
    let currentList = null;
    let currentItem = null;
    for (const line of lines) {
      const topKv = /^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
      if (topKv && !line.startsWith(' ') && !line.startsWith('\t')) {
        const key = topKv[1];
        const val = topKv[2].trim();
        if (val === '' && ['instruments', 'references', 'conditions', 'technical_names'].includes(key)) {
          currentList = data[key];
          currentItem = null;
        } else {
          data[key] = stripQuotes(val);
          currentList = null;
        }
        continue;
      }
      const itemStart = /^\s*-\s*([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
      if (itemStart && currentList) {
        currentItem = {};
        currentItem[itemStart[1]] = stripQuotes(itemStart[2].trim());
        currentList.push(currentItem);
        continue;
      }
      const itemField = /^\s+([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
      if (itemField && currentItem) {
        currentItem[itemField[1]] = stripQuotes(itemField[2].trim());
      }
    }
    return data;
  }

  function stripQuotes(s) {
    if (typeof s !== 'string') return s;
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
      return s.slice(1, -1);
    }
    return s;
  }

  // ===== STEP 3: parseBody (§6.5) =====
  // Produces Block[] with type ∈ {heading, paragraph, blockquote, orderedList, codeBlock}.

  function parseBody(lines, bodyStartLine) {
    const blocks = [];
    let current = null;
    let lastHeadingText = '';
    let codeBuf = null;

    function flush() {
      if (current) {
        blocks.push(current);
        current = null;
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const L = lines[i];
      if (L.idx < bodyStartLine) continue;
      if (L.region === 'fm' || L.region === 'fm-fence') continue;

      // Code block handling
      if (L.region === 'code-fence-open') {
        flush();
        codeBuf = {
          type: 'codeBlock',
          infoString: L.infoString || '',
          lines: [],
          startLine: L.idx,
          endLine: L.idx,
          precedingHeading: lastHeadingText
        };
        continue;
      }
      if (L.region === 'code') {
        if (codeBuf) {
          codeBuf.lines.push(L);
          codeBuf.endLine = L.idx;
        }
        continue;
      }
      if (L.region === 'code-fence-close') {
        if (codeBuf) {
          codeBuf.endLine = L.idx;
          blocks.push(codeBuf);
          codeBuf = null;
        }
        continue;
      }

      const text = L.trimmed;

      // Blank line
      if (text.length === 0) { flush(); continue; }

      // Heading
      const headingMatch = text.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        flush();
        const level = headingMatch[1].length;
        const headingText = headingMatch[2].trim();
        blocks.push({
          type: 'heading',
          level,
          text: headingText,
          startLine: L.idx,
          endLine: L.idx,
          precedingHeading: lastHeadingText
        });
        lastHeadingText = headingText;
        continue;
      }

      // Blockquote
      if (/^>\s?/.test(text)) {
        const content = text.replace(/^>\s?/, '');
        if (current && current.type === 'blockquote') {
          current.lines.push({ text: content, line: L.idx });
          current.endLine = L.idx;
        } else {
          flush();
          current = {
            type: 'blockquote',
            lines: [{ text: content, line: L.idx }],
            startLine: L.idx,
            endLine: L.idx,
            precedingHeading: lastHeadingText
          };
        }
        continue;
      }

      // Ordered list item
      const listMatch = text.match(/^(\d+)\.\s+(.+)$/);
      if (listMatch) {
        if (current && current.type === 'orderedList') {
          current.items.push({ marker: listMatch[1], text: listMatch[2], line: L.idx });
          current.endLine = L.idx;
        } else {
          flush();
          current = {
            type: 'orderedList',
            items: [{ marker: listMatch[1], text: listMatch[2], line: L.idx }],
            startLine: L.idx,
            endLine: L.idx,
            precedingHeading: lastHeadingText
          };
        }
        continue;
      }

      // List-item continuation (indented line under last item)
      if (current && current.type === 'orderedList' && /^\s{2,}/.test(L.raw)) {
        const last = current.items[current.items.length - 1];
        last.text += ' ' + text;
        current.endLine = L.idx;
        continue;
      }

      // Blockquote continuation
      if (current && current.type === 'blockquote') {
        const lastQ = current.lines[current.lines.length - 1];
        lastQ.text += ' ' + text;
        current.endLine = L.idx;
        continue;
      }

      // Paragraph
      if (current && current.type === 'paragraph') {
        current.text += ' ' + text;
        current.endLine = L.idx;
      } else {
        flush();
        current = {
          type: 'paragraph',
          text,
          startLine: L.idx,
          endLine: L.idx,
          precedingHeading: lastHeadingText
        };
      }
    }
    flush();
    return blocks;
  }

  // ===== STEP 4: parseClauses + parseETag (§6.6, §6.7) =====

  function parseClausesForBlock(block, clauses, findings) {
    block.clauses = [];

    if (block.type === 'heading' || block.type === 'codeBlock' && /^[\s`]*$/.test(block.lines.map(l => l.raw).join(''))) {
      // headings carry no clauses
      return;
    }

    if (block.type === 'paragraph') {
      const segs = splitClauseSegments(block.text, block.startLine);
      segs.forEach(seg => {
        const c = parseTaggedClause(seg.text, seg.line, block);
        if (c) {
          block.clauses.push(c);
          clauses.push(c);
        }
      });
      return;
    }

    if (block.type === 'blockquote') {
      const joined = block.lines.map(l => l.text).join(' ');
      const segs = splitClauseSegments(joined, block.startLine);
      segs.forEach(seg => {
        const c = parseTaggedClause(seg.text, seg.line, block);
        if (c) {
          block.clauses.push(c);
          clauses.push(c);
        }
      });
      return;
    }

    if (block.type === 'orderedList') {
      block.items.forEach(item => {
        const c = parseTaggedClause(item.text, item.line, block);
        if (c) {
          c.isImperative = true;
          block.clauses.push(c);
          clauses.push(c);
        }
      });
      return;
    }

    if (block.type === 'codeBlock') {
      // For known semantic info strings, treat each non-empty line as a clause
      const targetInfo = ['definition', 'constraint', 'measurement'];
      if (targetInfo.includes(block.infoString)) {
        block.lines.forEach(L => {
          const t = L.trimmed;
          if (!t) return;
          const c = parseTaggedClause(t, L.idx, block);
          if (c) {
            block.clauses.push(c);
            clauses.push(c);
          }
        });
      }
      return;
    }
  }

  // Split a text into clause segments. Each segment is a single sentence,
  // terminated by `.` (optionally preceded by `)` for tagged clauses).
  // Periods inside decimal numbers (e.g. "3.7 MHz") are not boundaries.
  function splitClauseSegments(text, baseLine) {
    const segs = [];
    // Sentence boundary: period not preceded by digit, followed by space or EOL.
    const re = /(?<!\d)\.(?:\s+|$)/g;
    let lastEnd = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      const piece = text.substring(lastEnd, m.index + 1).trim(); // include period
      if (piece.length > 0) segs.push({ text: piece, line: baseLine });
      lastEnd = re.lastIndex;
    }
    const rest = text.substring(lastEnd).trim();
    if (rest.length > 0) {
      const withPeriod = /\.$/.test(rest) ? rest : rest + '.';
      segs.push({ text: withPeriod, line: baseLine });
    }
    return segs;
  }

  function parseTaggedClause(rawText, line, block) {
    const text = rawText.trim();
    if (!text) return null;

    // Strip terminating period
    let body = text.replace(/\.\s*$/, '');

    // Find the LAST `(...)` immediately before the (now-stripped) period.
    // We scan from the end to handle nested parens in unusual prose.
    const close = body.lastIndexOf(')');
    if (close === -1 || close !== body.length - 1) {
      return {
        raw: text, interior: text, etag: null,
        line, block,
        parseError: 'missing-etag',
        isImperative: block && block.type === 'orderedList'
      };
    }
    const open = findMatchingOpen(body, close);
    if (open === -1) {
      return {
        raw: text, interior: text, etag: null,
        line, block,
        parseError: 'unmatched-paren',
        isImperative: block && block.type === 'orderedList'
      };
    }

    const tagContent = body.substring(open + 1, close);
    const interior = body.substring(0, open).trim();
    const etag = parseETag(tagContent);

    return {
      raw: text,
      interior,
      etag,
      tagContent,
      line,
      block,
      isImperative: block && block.type === 'orderedList'
    };
  }

  function findMatchingOpen(text, closeIdx) {
    let depth = 0;
    for (let i = closeIdx; i >= 0; i--) {
      const ch = text[i];
      if (ch === ')') depth++;
      else if (ch === '(') {
        depth--;
        if (depth === 0) return i;
      }
    }
    return -1;
  }

  function parseETag(content) {
    const trimmed = content.trim();
    const issues = [];
    const verb = trimmed.split(/[\s,]/)[0].toLowerCase();
    const info = BeyondLexicon.getEtagType(verb);
    if (!info) {
      return {
        valid: false, raw: trimmed, verb,
        type: null,
        issues: [`"${verb}" is not an approved E-tag verb. Approved: ${BeyondLexicon.ETAG_VERBS.join(', ')}.`]
      };
    }

    const out = {
      raw: trimmed, verb,
      type: info.code || keyOf(info),
      tier: info.tier,
      sources: [],
      premises: [],
      records: [],
      uncertainty: null,
      sampleSize: null,
      scope: null,
      conditionRef: null,
      step: null,
      issues
    };
    out.type = inferTypeCode(verb);

    const tail = trimmed.substring(verb.length).replace(/^,?\s*/, '');

    switch (out.type) {
      case 'E-OBS': parseObsTag(verb, tail, out); break;
      case 'E-MSR': parseMsrTag(verb, tail, out); break;
      case 'E-DER': parseDerTag(verb, tail, out); break;
      case 'E-RPT': parseRptTag(verb, tail, out); break;
      case 'E-DEF': parseDefTag(verb, tail, out); break;
      case 'E-PRO': parseProTag(verb, tail, out); break;
    }

    out.valid = out.issues.length === 0;
    return out;
  }

  function inferTypeCode(verb) {
    for (const code of Object.keys(BeyondLexicon.ETAG_TYPES)) {
      if (BeyondLexicon.ETAG_TYPES[code].verbs.includes(verb)) return code;
    }
    return null;
  }
  function keyOf(info) {
    if (info && info.code) return info.code;
    return null;
  }

  // SourceRef = (InstrumentClass SP)? InlineCode | "operator"
  function parseSourceRef(s) {
    const trim = s.trim();
    if (trim === 'operator') return { ok: true, kind: 'operator' };
    const m = trim.match(/^(?:([a-z][a-z\-]*)\s+)?`([A-Za-z0-9_\-.]+)`$/);
    if (!m) return { ok: false, reason: `"${trim}" does not parse as SourceRef (expected "[class] \`ID\`" or "operator").` };
    const cls = m[1] ? m[1].toLowerCase() : null;
    if (cls && !BeyondLexicon.INSTRUMENT_CLASSES.has(cls)) {
      return { ok: false, reason: `Instrument class "${cls}" is not in the approved set.` };
    }
    return { ok: true, kind: 'inlineCode', instrumentClass: cls, id: m[2] };
  }

  function parseObsTag(verb, tail, out) {
    if (!tail) {
      out.issues.push(`E-OBS "${verb}" requires a source: (${verb}, [class] \`ID\`) or (${verb}, operator).`);
      return;
    }
    const ref = parseSourceRef(tail);
    if (!ref.ok) {
      out.issues.push(`E-OBS: ${ref.reason}`);
      return;
    }
    out.sources.push(ref);
  }

  function parseMsrTag(verb, tail, out) {
    if (!tail) {
      out.issues.push(`E-MSR "${verb}" requires a source identifier.`);
      return;
    }
    const parts = splitTopLevelCommas(tail);
    if (parts.length === 0) {
      out.issues.push(`E-MSR "${verb}" requires at least a source identifier.`);
      return;
    }
    const ref = parseSourceRef(parts[0]);
    if (!ref.ok) { out.issues.push(`E-MSR: ${ref.reason}`); return; }
    out.sources.push(ref);
    for (let i = 1; i < parts.length; i++) {
      const p = parts[i].trim();
      if (/^n\s*=\s*\d+$/.test(p)) {
        out.sampleSize = parseInt(p.replace(/^n\s*=\s*/, ''));
        continue;
      }
      const u = parseUncertainty(p);
      if (u.ok) { out.uncertainty = u; continue; }
      out.issues.push(`E-MSR: "${p}" is not a recognized uncertainty expression or n=N specifier.`);
    }
  }

  // UncertaintyExpr = (1-sigma|2-sigma|3-sigma) | (Number% SP "CI") | ("±" SP Number SP Unit) | ("tolerance" SP Number SP Unit)
  function parseUncertainty(s) {
    const t = s.trim();
    if (/^[123]-sigma$/.test(t)) return { ok: true, kind: 'sigma', text: t };
    if (/^\d+(?:\.\d+)?\s*%\s+CI$/i.test(t)) return { ok: true, kind: 'ci', text: t };
    if (/^±\s*\d+(?:\.\d+)?\s+\S+$/.test(t)) return { ok: true, kind: 'pm', text: t };
    if (/^tolerance\s+\d+(?:\.\d+)?\s+\S+$/i.test(t)) return { ok: true, kind: 'tolerance', text: t };
    return { ok: false };
  }

  function parseDerTag(verb, tail, out) {
    const m = tail.match(/^from\s+(.+)$/);
    if (!m) {
      out.issues.push(`E-DER "${verb}" requires "from" and premise references: (${verb}, from \`PREMISE-1\`, \`PREMISE-2\`).`);
      return;
    }
    const ids = splitTopLevelCommas(m[1]);
    if (ids.length === 0) {
      out.issues.push(`E-DER "${verb}" requires at least one premise reference.`);
      return;
    }
    ids.forEach(idTok => {
      const im = idTok.trim().match(/^`([A-Za-z0-9_\-.]+)`$/);
      if (!im) { out.issues.push(`E-DER premise "${idTok}" must be an InlineCode identifier.`); return; }
      out.premises.push(im[1]);
    });
  }

  function parseRptTag(verb, tail, out) {
    const m = tail.match(/^(in|from)\s+`([A-Za-z0-9_\-.]+)`(?:\s*,\s*by\s+(.+))?$/);
    if (!m) {
      out.issues.push(`E-RPT "${verb}" expects (${verb}, in|from \`RECORD-ID\`[, by [class] \`SRC\`]).`);
      return;
    }
    out.records.push(m[2]);
    if (m[3]) {
      const src = parseSourceRef(m[3]);
      if (!src.ok) { out.issues.push(`E-RPT: ${src.reason}`); return; }
      out.sources.push(src);
    }
  }

  function parseDefTag(verb, tail, out) {
    if (verb === 'defined') {
      if (tail) out.issues.push(`E-DEF "defined" takes no arguments — got "${tail}".`);
      return;
    }
    if (verb === 'stipulated') {
      const m = tail.match(/^for\s+(.+)$/);
      if (!m) {
        out.issues.push(`E-DEF "stipulated" requires "for ScopeName": (stipulated, for \`Characterization\`).`);
        return;
      }
      out.scope = m[1].trim().replace(/^`(.+)`$/, '$1');
    }
  }

  function parseProTag(verb, tail, out) {
    if (!tail) return;
    const parts = splitTopLevelCommas(tail);
    for (const part of parts) {
      const p = part.trim();
      const stepM = p.match(/^step\s+(\d+)$/);
      if (stepM) { out.step = parseInt(stepM[1]); continue; }
      const ifM = p.match(/^if\s+`([A-Za-z0-9_\-.]+)`$/);
      if (ifM) { out.conditionRef = ifM[1]; continue; }
      out.issues.push(`E-PRO clause "${p}" did not match "step N" or "if \`CONDITION\`".`);
    }
  }

  function splitTopLevelCommas(s) {
    const out = [];
    let depth = 0;
    let buf = '';
    for (const ch of s) {
      if (ch === '`') depth = depth === 0 ? 1 : 0;
      if (depth === 0 && ch === ',') {
        out.push(buf.trim());
        buf = '';
      } else {
        buf += ch;
      }
    }
    if (buf.trim()) out.push(buf.trim());
    return out;
  }

  // ===== Clause ID assignment for §6.9 R-4 premise resolution =====

  function assignClauseIds(blocks, clauses) {
    let sectionPath = [0];
    let clauseCounters = new Map(); // section path → counter
    let lastSectionKey = '0';

    blocks.forEach(b => {
      if (b.type === 'heading') {
        if (b.level >= sectionPath.length) {
          while (sectionPath.length < b.level) sectionPath.push(0);
        } else {
          sectionPath.length = b.level;
        }
        sectionPath[b.level - 1] = (sectionPath[b.level - 1] || 0) + 1;
        lastSectionKey = sectionPath.slice(0, b.level).join('.');
        if (!clauseCounters.has(lastSectionKey)) clauseCounters.set(lastSectionKey, 0);
        return;
      }
      if (!b.clauses) return;
      b.clauses.forEach(c => {
        if (!c.etag || !c.etag.type) return;
        const typeShort = c.etag.type.replace('E-', '');
        const nextIdx = (clauseCounters.get(lastSectionKey) || 0) + 1;
        clauseCounters.set(lastSectionKey, nextIdx);
        c.id = `${typeShort}-${lastSectionKey}.${nextIdx}`;
        c.section = lastSectionKey;
      });
    });

    // Build a quick lookup map shared with resolution
    const byId = new Map();
    clauses.forEach(c => { if (c.id) byId.set(c.id, c); });
    clauses._byId = byId;
  }

  // ===== STEP 5: checkRegister (§6.8) =====

  function checkRegister(blocks, findings) {
    blocks.forEach(b => {
      if (b.type === 'heading') {
        if (/\([^)]+\)\s*\.?\s*$/.test(b.text)) {
          findings.push(makeFinding({
            layer: 2, severity: SEVERITY.ERROR,
            category: 'E-tag on heading',
            word: b.text, line: b.startLine,
            reason: 'Headings are not declarative clauses and must not carry E-tags (H-1).',
            rule: 'H-1'
          }));
        }
        return;
      }
      if (!b.clauses) return;

      if (b.type === 'blockquote') {
        b.clauses.forEach(c => {
          if (!c.etag || !c.etag.valid) return;
          if (c.etag.type !== 'E-OBS' && c.etag.type !== 'E-MSR') {
            findings.push(makeFinding({
              layer: 2, severity: SEVERITY.ERROR,
              category: 'Register mismatch (blockquote)',
              word: `(${c.tagContent})`, line: c.line,
              reason: `Blockquote permits only E-OBS or E-MSR; this clause carries ${c.etag.type} (B-1).`,
              rule: 'B-1'
            }));
          }
        });
        return;
      }

      if (b.type === 'orderedList') {
        b.clauses.forEach(c => {
          if (!c.etag || !c.etag.valid) return;
          if (c.etag.type !== 'E-PRO') {
            findings.push(makeFinding({
              layer: 2, severity: SEVERITY.ERROR,
              category: 'Register mismatch (ordered list)',
              word: `(${c.tagContent})`, line: c.line,
              reason: `Ordered list permits only E-PRO; this clause carries ${c.etag.type} (O-1).`,
              rule: 'O-1'
            }));
          }
        });
        // O-2: must follow a heading whose text begins with "Procedure" or "Steps"
        const head = b.precedingHeading || '';
        if (!/^(procedure|steps)\b/i.test(head.trim())) {
          findings.push(makeFinding({
            layer: 2, severity: SEVERITY.WARNING,
            category: 'OrderedList placement',
            word: head ? `under "${head}"` : 'no preceding heading',
            line: b.startLine,
            reason: 'Procedural ordered lists must follow a heading beginning with "Procedure" or "Steps" (O-2).',
            rule: 'O-2'
          }));
        }
        return;
      }

      if (b.type === 'codeBlock') {
        const info = b.infoString;
        if (info === 'definition') {
          b.clauses.forEach(c => {
            if (!c.etag || !c.etag.valid) return;
            if (c.etag.type !== 'E-DEF') {
              findings.push(makeFinding({
                layer: 2, severity: SEVERITY.ERROR,
                category: 'Register mismatch (definition block)',
                word: `(${c.tagContent})`, line: c.line,
                reason: `Code block "definition" permits only E-DEF; got ${c.etag.type} (C-1).`,
                rule: 'C-1'
              }));
            }
          });
        } else if (info === 'constraint') {
          b.clauses.forEach(c => {
            if (!c.etag || !c.etag.valid) return;
            if (c.etag.type !== 'E-DEF' && c.etag.type !== 'E-DER') {
              findings.push(makeFinding({
                layer: 2, severity: SEVERITY.ERROR,
                category: 'Register mismatch (constraint block)',
                word: `(${c.tagContent})`, line: c.line,
                reason: `Code block "constraint" permits only E-DEF or E-DER; got ${c.etag.type} (C-2).`,
                rule: 'C-2'
              }));
            }
          });
        } else if (info === 'measurement') {
          b.clauses.forEach(c => {
            if (!c.etag || !c.etag.valid) return;
            if (c.etag.type !== 'E-MSR') {
              findings.push(makeFinding({
                layer: 2, severity: SEVERITY.ERROR,
                category: 'Register mismatch (measurement block)',
                word: `(${c.tagContent})`, line: c.line,
                reason: `Code block "measurement" permits only E-MSR; got ${c.etag.type} (C-3).`,
                rule: 'C-3'
              }));
            }
          });
        } else if (info) {
          findings.push(makeFinding({
            layer: 2, severity: SEVERITY.INFO,
            category: 'Code block info-string review',
            word: '```' + info, line: b.startLine,
            reason: `Code block info-string "${info}" is unrestricted but flagged for review (C-4).`,
            rule: 'C-4'
          }));
        }
      }
    });
  }

  // ===== STEP 6: checkResolution (§6.9 R-1..R-4, P-1..P-6, FRONT-1) =====

  function checkResolution(clauses, fm, findings) {
    clauses.forEach(c => {
      if (!c.etag || !c.etag.valid) return;
      const t = c.etag;

      // R-1: SourceRef → instruments
      t.sources.forEach(src => {
        if (src.kind === 'inlineCode' && !fm.instruments.has(src.id)) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Unresolved source reference',
            word: '`' + src.id + '`', line: c.line,
            reason: `Source identifier "${src.id}" not declared in instruments: (R-1, FRONT-1).`,
            rule: 'R-1'
          }));
        }
      });

      // R-2: RecordRef → references
      t.records.forEach(rid => {
        if (!fm.references.has(rid)) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Unresolved record reference',
            word: '`' + rid + '`', line: c.line,
            reason: `Record identifier "${rid}" not declared in references: (R-2, FRONT-1).`,
            rule: 'R-2'
          }));
        }
      });

      // R-3: ConditionRef → conditions
      if (t.conditionRef) {
        if (!fm.conditions.has(t.conditionRef)) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Unresolved condition reference',
            word: '`' + t.conditionRef + '`', line: c.line,
            reason: `Condition identifier "${t.conditionRef}" not declared in conditions: (R-3, FRONT-1, E-PRO-3).`,
            rule: 'R-3'
          }));
        }
      }

      // E-DEF stipulated scope must be a declared scope
      if (t.type === 'E-DEF' && t.scope) {
        if (!fm.scopes.has(t.scope)) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.WARNING,
            category: 'Unresolved scope',
            word: t.scope, line: c.line,
            reason: `Scope "${t.scope}" is not a declared phase or document scope.`,
            rule: 'R-SCOPE'
          }));
        }
      }

      // R-4 + P-1..P-6: PremiseRef
      t.premises.forEach(pid => {
        const target = clauses._byId && clauses._byId.get(pid);
        const inRefs = fm.references.has(pid);
        if (!target && !inRefs) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Unresolved premise reference',
            word: '`' + pid + '`', line: c.line,
            reason: `Premise "${pid}" does not resolve to any tagged clause in this document or to a record in references: (R-4).`,
            rule: 'R-4'
          }));
          return;
        }
        if (target) {
          const pt = target.etag && target.etag.type;
          if (pt === 'E-PRO') {
            findings.push(makeFinding({
              layer: 3, severity: SEVERITY.ERROR,
              category: 'Procedural premise (P-6)',
              word: '`' + pid + '`', line: c.line,
              reason: `Premise "${pid}" is an E-PRO clause; procedural clauses are not premises (P-6).`,
              rule: 'P-6'
            }));
          }
          // Self-reference (trivial cycle)
          if (target === c) {
            findings.push(makeFinding({
              layer: 3, severity: SEVERITY.ERROR,
              category: 'Circular derivation',
              word: '`' + pid + '`', line: c.line,
              reason: `Clause "${pid}" cites itself as a premise (E-DER-1).`,
              rule: 'E-DER-1'
            }));
          }
        }
      });

      // E-DER-1: detect cycles in the premise DAG (multi-hop)
      if (t.type === 'E-DER' && t.premises.length > 0) {
        const cycle = detectCycleFrom(c, clauses._byId);
        if (cycle) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Circular derivation chain',
            word: cycle.join(' → '), line: c.line,
            reason: `Premise chain forms a cycle: ${cycle.join(' → ')} (E-DER-1).`,
            rule: 'E-DER-1'
          }));
        }
      }
    });
  }

  function detectCycleFrom(start, byId) {
    if (!byId) return null;
    const stack = [{ clause: start, path: [start.id || '?'] }];
    const seen = new Set();
    while (stack.length) {
      const { clause, path } = stack.pop();
      if (!clause.etag || !clause.etag.premises) continue;
      for (const pid of clause.etag.premises) {
        const target = byId.get(pid);
        if (!target) continue;
        if (target === start) return [...path, pid];
        const key = (target.id || '') + '<-' + (clause.id || '');
        if (seen.has(key)) continue;
        seen.add(key);
        stack.push({ clause: target, path: [...path, pid] });
      }
    }
    return null;
  }

  // ===== STEP 7: checkLexicon (Layer 1) =====

  function checkLexicon(blocks, clauses, findings) {
    // Headings: lexicon check only
    blocks.forEach(b => {
      if (b.type === 'heading') {
        scanLexicalText(b.text, b.startLine, findings, { allowPunctQuestion: false });
      }
    });

    clauses.forEach(c => {
      const interior = c.interior || '';
      if (!interior) return;
      scanLexicalText(interior, c.line, findings, { allowPunctQuestion: false });
    });
  }

  // Tokenize a string, drop inline-code, drop digits/punctuation, check allow-list + bans.
  function scanLexicalText(text, line, findings, opts) {
    const stripped = text.replace(/`[^`]*`/g, ' '); // drop inline code

    // Multi-word banned patterns
    BeyondLexicon.MULTI_WORD_BANNED.forEach(({ pattern, category, reason }) => {
      const re = new RegExp(pattern.source, pattern.flags);
      let m;
      while ((m = re.exec(stripped)) !== null) {
        findings.push(makeFinding({
          layer: 1, severity: SEVERITY.ERROR,
          category, word: m[0], line, reason,
          rule: 'LEXICON-MULTI'
        }));
      }
    });

    // Exclamation marks → error
    const excl = stripped.match(/!/g);
    if (excl) {
      findings.push(makeFinding({
        layer: 1, severity: SEVERITY.ERROR,
        category: 'Exclamation mark', word: '!', line,
        reason: 'Affect disclosure — exclamation marks banned.',
        rule: 'LEXICON-PUNCT'
      }));
    }
    const qm = stripped.match(/\?/g);
    if (qm) {
      findings.push(makeFinding({
        layer: 1, severity: SEVERITY.WARNING,
        category: 'Question mark', word: '?', line,
        reason: 'Questions may leak cognitive architecture; permitted only in procedural context.',
        rule: 'LEXICON-PUNCT'
      }));
    }

    // Word-by-word
    const wordRe = /\b[a-zA-Z][a-zA-Z'\-]*\b/g;
    let m;
    while ((m = wordRe.exec(stripped)) !== null) {
      const word = m[0];
      const lower = word.toLowerCase();
      if (lower.length <= 1) continue;
      const res = BeyondLexicon.checkWord(lower);
      if (res.status === 'banned') {
        res.details.forEach(v => {
          findings.push(makeFinding({
            layer: 1, severity: SEVERITY.ERROR,
            category: v.category, word, line,
            reason: v.reason,
            rule: 'LEXICON-BANNED'
          }));
        });
      } else if (res.status === 'unlisted') {
        findings.push(makeFinding({
          layer: 1, severity: SEVERITY.WARNING,
          category: 'Word not in lexicon',
          word, line,
          reason: res.hint
            ? `"${lower}" — ${res.hint}`
            : `"${lower}" not found in the Beyond CNL approved vocabulary. If domain-specific, register as a Technical Name.`,
          rule: 'LEXICON-ALLOW-LIST'
        }));
      }
    }
  }

  // ===== STEP 8: checkSemantics (Layer 3) =====

  function checkSemantics(clauses, fm, findings) {
    clauses.forEach(c => {
      // Missing E-tag (parse error)
      if (!c.etag) {
        findings.push(makeFinding({
          layer: 3, severity: SEVERITY.ERROR,
          category: 'Missing E-tag',
          word: shortText(c.raw), line: c.line,
          reason: 'Every declarative clause must end with an E-tag in parentheses before the period (§6.6).',
          rule: 'EVID-MISSING'
        }));
        return;
      }
      // Malformed E-tag
      if (!c.etag.valid) {
        c.etag.issues.forEach(issue => {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Malformed E-tag',
            word: `(${c.tagContent || ''})`, line: c.line,
            reason: issue,
            rule: 'EVID-MALFORMED'
          }));
        });
        return;
      }

      // E-MSR-1: must contain a numeric value
      if (c.etag.type === 'E-MSR') {
        if (!/\d/.test(c.interior)) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.WARNING,
            category: 'E-MSR without numeric',
            word: `(${c.tagContent})`, line: c.line,
            reason: 'E-MSR clauses should contain at least one numerical value with a unit (E-MSR-1).',
            rule: 'E-MSR-1'
          }));
        }
      }

      // E-PRO-1 + E-PRO-2 inside ordered lists
      if (c.etag.type === 'E-PRO' && c.isImperative) {
        const firstTok = (c.interior.match(/^[A-Za-z][A-Za-z\-]*/) || [''])[0].toLowerCase();
        if (firstTok && !BeyondLexicon.IMPERATIVE_VERBS.has(firstTok)) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Non-imperative leading verb',
            word: firstTok, line: c.line,
            reason: `Procedural clause must begin with an imperative verb from the approved list (E-PRO-1). "${firstTok}" is not admitted.`,
            rule: 'E-PRO-1'
          }));
        }
        // E-PRO-2: no evidential-claim verbs in interior
        const tokens = c.interior.toLowerCase().match(/\b[a-z][a-z\-]*\b/g) || [];
        tokens.forEach(tok => {
          if (BeyondLexicon.EVIDENTIAL_CLAIM_VERBS.has(tok)) {
            findings.push(makeFinding({
              layer: 3, severity: SEVERITY.ERROR,
              category: 'Evidential-claim verb in procedure',
              word: tok, line: c.line,
              reason: `Procedural clauses must not contain evidential-claim verbs (E-PRO-2). "${tok}" prescribes vs asserts.`,
              rule: 'E-PRO-2'
            }));
          }
        });
      }

      // E-RPT-3 / P-5 hearsay depth: warn when this clause carries E-RPT and
      // is itself the only premise of a downstream E-DER (depth-1 is OK; multi-hop unreachable without cross-doc resolution).
      // Depth-2+ would require cited docs; current scope warns at depth 1.
      if (c.etag.type === 'E-RPT') {
        // Only warn if any other clause depends on this via E-DER premise
        const consumers = clauses.filter(o => o.etag && o.etag.premises && o.etag.premises.includes(c.id));
        if (consumers.length > 0) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.WARNING,
            category: 'Hearsay-depth warning',
            word: c.id || '(unknown)', line: c.line,
            reason: 'A downstream clause derives from this E-RPT; hearsay chains are limited to depth 1 (E-RPT-3 / P-5).',
            rule: 'E-RPT-3'
          }));
        }
      }
    });
  }

  // ===== STEP 9: checkHazards (Layer 5) — block-aware =====

  function checkHazards(blocks, findings) {
    const locationPatterns = [
      { pattern: /\b(?:Earth|Terra|Sol|Milky\s+Way|solar\s+system)\b/g, hazard: 'Location disclosure' },
      { pattern: /\b(?:latitude|longitude|GPS|coordinates)\b/g, hazard: 'Location disclosure' },
      { pattern: /\b(?:America|Europe|Asia|Africa|Australia|Antarctica)\b/g, hazard: 'Location disclosure' }
    ];
    const capabilityPatterns = [
      { pattern: /\b(?:our\s+(?:technology|capability|weapons|defense|military|power))\b/gi, hazard: 'Capability disclosure' },
      { pattern: /\b(?:we\s+(?:can|have|possess|developed|created|built|achieved))\b/gi, hazard: 'Capability disclosure' }
    ];

    function scan(text, line) {
      locationPatterns.forEach(({ pattern, hazard }) => {
        const re = new RegExp(pattern.source, pattern.flags);
        let m;
        while ((m = re.exec(text)) !== null) {
          findings.push(makeFinding({
            layer: 5, severity: SEVERITY.WARNING,
            category: hazard, word: m[0], line,
            reason: `Potential location disclosure: "${m[0]}".`,
            rule: 'HAZARD-LOCATION'
          }));
        }
      });
      capabilityPatterns.forEach(({ pattern, hazard }) => {
        const re = new RegExp(pattern.source, pattern.flags);
        let m;
        while ((m = re.exec(text)) !== null) {
          findings.push(makeFinding({
            layer: 5, severity: SEVERITY.WARNING,
            category: hazard, word: m[0], line,
            reason: `Potential capability disclosure: "${m[0]}".`,
            rule: 'HAZARD-CAPABILITY'
          }));
        }
      });

      // Proper-noun heuristic (skip sentence-initial)
      const properRe = /(?<=\s)[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*/g;
      let m;
      while ((m = properRe.exec(text)) !== null) {
        const before = text.substring(0, m.index);
        if (/[.!?]\s+$/.test(before)) continue;
        // Skip if it's adjacent to a backtick (likely Technical Name introduced in code)
        const beforeChar = text[m.index - 1] || '';
        if (beforeChar === '`') continue;
        findings.push(makeFinding({
          layer: 5, severity: SEVERITY.INFO,
          category: 'Possible proper noun',
          word: m[0], line,
          reason: `"${m[0]}" appears to be a proper noun. Proper nouns of groups/places/identities are banned.`,
          rule: 'HAZARD-PROPERNOUN'
        }));
      }
    }

    blocks.forEach(b => {
      if (b.type === 'heading') scan(b.text, b.startLine);
      if (!b.clauses) return;
      b.clauses.forEach(c => {
        if (c.interior) scan(c.interior, c.line);
      });
    });
  }

  // ===== Coverage metric (§7.3) =====

  function addCoverageMetric(blocks, clauses, findings) {
    if (clauses.length === 0) return;
    const tagged = clauses.filter(c => c.etag).length;
    const coverage = tagged / clauses.length;
    findings.push(makeFinding({
      layer: 3,
      severity: coverage < 1.0 ? SEVERITY.ERROR : SEVERITY.INFO,
      category: 'Evidential coverage',
      word: `${(coverage * 100).toFixed(1)}%`,
      line: 0,
      reason: `${tagged} of ${clauses.length} declarative clauses carry E-tags. Required: 100% (§7.3).`,
      rule: 'EVID-COVERAGE'
    }));
  }

  // ===== Utilities =====

  function makeFinding({ layer, severity, category, word, line, reason, rule, position }) {
    return { layer, severity, category, word, line, reason, rule, position: position || 0 };
  }

  function shortText(s) {
    if (!s) return '';
    return s.length > 60 ? s.substring(0, 60) + '…' : s;
  }

  function buildSummary(findings, elapsedMs) {
    const summary = {
      totalFindings: findings.length,
      errors: findings.filter(f => f.severity === SEVERITY.ERROR).length,
      warnings: findings.filter(f => f.severity === SEVERITY.WARNING).length,
      info: findings.filter(f => f.severity === SEVERITY.INFO).length,
      byLayer: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      byCategory: {},
      elapsedMs: elapsedMs.toFixed(1),
      compliant: 0
    };
    findings.forEach(f => {
      summary.byLayer[f.layer] = (summary.byLayer[f.layer] || 0) + 1;
      summary.byCategory[f.category] = (summary.byCategory[f.category] || 0) + 1;
    });
    summary.compliant = summary.errors === 0;
    return summary;
  }

  // ===== Markdown report =====

  function generateMarkdownReport(text, results) {
    const { findings, summary } = results;
    const now = new Date().toISOString();
    let r = `# Beyond CNL Lint Report\n\n`;
    r += `**Generated:** ${now}\n`;
    r += `**Status:** ${summary.compliant ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}\n`;
    r += `**Analysis time:** ${summary.elapsedMs}ms\n\n`;
    r += `## Summary\n\n`;
    r += `| Metric | Count |\n|---|---|\n`;
    r += `| Errors | ${summary.errors} |\n`;
    r += `| Warnings | ${summary.warnings} |\n`;
    r += `| Info | ${summary.info} |\n`;
    r += `| Total findings | ${summary.totalFindings} |\n\n`;
    r += `### By Enforcement Layer\n\n`;
    r += `| Layer | Name | Findings |\n|---|---|---|\n`;
    for (let i = 1; i <= 5; i++) {
      r += `| ${i} | ${LAYER_NAMES[i]} | ${summary.byLayer[i] || 0} |\n`;
    }
    r += `\n`;
    if (Object.keys(summary.byCategory).length > 0) {
      r += `### By Category\n\n| Category | Count |\n|---|---|\n`;
      Object.entries(summary.byCategory)
        .sort((a, b) => b[1] - a[1])
        .forEach(([cat, count]) => r += `| ${cat} | ${count} |\n`);
      r += `\n`;
    }
    if (findings.length > 0) {
      r += `## Detailed Findings\n\n`;
      findings.forEach((f, idx) => {
        const icon = f.severity === 'error' ? '🔴' : f.severity === 'warning' ? '🟡' : '🔵';
        r += `### ${icon} Finding ${idx + 1} (Line ${f.line})\n\n`;
        r += `- **Severity:** ${f.severity.toUpperCase()}\n`;
        r += `- **Layer:** ${f.layer} — ${LAYER_NAMES[f.layer]}\n`;
        r += `- **Category:** ${f.category}\n`;
        r += `- **Flagged:** \`${f.word}\`\n`;
        r += `- **Rule:** ${f.rule}\n`;
        r += `- **Reason:** ${f.reason}\n\n`;
      });
    }
    r += `---\n\n*Report generated by Beyond CNL Linter v0.3 (envelope grammar)*\n`;
    return r;
  }

  return {
    lint,
    generateMarkdownReport,
    SEVERITY,
    // Internals exposed for testing / advanced callers
    tokenizeLines,
    parseFrontmatter,
    parseBody,
    parseTaggedClause,
    parseETag
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BeyondLinter;
}
