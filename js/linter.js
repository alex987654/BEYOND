/**
 * Beyond CNL Linter Engine — Envelope Grammar (spec v0.4 / schema v0.4)
 *
 * Implements the §6.12 pipeline:
 *   tokenizeLines → parseFrontmatter → parseBody → parseTaggedClause / parseETag
 *   → checkRegister (§6.8) → checkResolution (§6.9) → checkLexicon (Layer 1)
 *   → checkSemantics (Layer 3) → checkHazards (Layer 5)
 *   → checkFrontmatterProse (FRONT-2, §5)
 *
 * Public surface preserved:
 *   lint(text) → { findings, summary }
 *   generateMarkdownReport(text, results) → string
 *   SEVERITY
 */

const BeyondLinter = (() => {

  // The lexicon is a global in the browser (js/lexicon.js loads first) and a
  // sibling module under Node. The local name must differ from the global:
  // shadowing `BeyondLexicon` here would put the `typeof` test in its own
  // temporal dead zone.
  const LX = (typeof BeyondLexicon !== 'undefined')
    ? BeyondLexicon
    : require('./lexicon.js');

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

    // 6. Resolution checks (§6.9 R-1..R-10, P-1..P-11) + FRONT-1
    checkResolution(clauses, fm, findings);

    // 6b. FRONT-1 identifier reconciliation (§6.9 R-11, R-12)
    checkIdentifierDeclarations(blocks, clauses, fm, findings);

    // 7. Layer 1: lexicon (per token in clause interiors / headings)
    checkLexicon(blocks, clauses, findings);

    // 8. Layer 3: semantic checks (E-RPT-3, E-DER-1 circularity, E-PRO-2, E-MSR-2)
    checkSemantics(clauses, fm, findings);

    // 9. Layer 5: information-hazard scan (now block-aware)
    checkHazards(blocks, findings);

    // 10. Frontmatter prose: same lexicon, identifier and hazard checks as body text
    checkFrontmatterProse(lines, fm, findings);

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
    let codeFenceLen = 0;
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

      // Code-fence detection in body. A fence is a run of three or more
      // backticks at the start of a line. Outside a block it opens one, and
      // the rest of the line is the info string — kept even when it is not a
      // valid one, so a bad info string cannot swap the roles of the opening
      // and closing fences. Inside a block, only a bare run at least as long
      // as the opening run closes it.
      const fence = /^(`{3,})([^`]*)$/.exec(trimmed);
      if (fence && !inCode) {
        inCode = true;
        codeFenceLen = fence[1].length;
        codeInfo = fence[2].trim();
        lines.push({
          idx: lineNum, raw: line, trimmed,
          offset: charOffset, region: 'code-fence-open', infoString: codeInfo
        });
        charOffset += line.length + 1;
        return;
      }
      if (fence && inCode && fence[2].trim() === '' && fence[1].length >= codeFenceLen) {
        inCode = false;
        lines.push({
          idx: lineNum, raw: line, trimmed,
          offset: charOffset, region: 'code-fence-close', infoString: codeInfo
        });
        codeInfo = '';
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
      startLine: 1,
      bodyStartLine: 1,
      instruments: new Map(),
      references: new Map(),
      conditions: new Map(),
      technicalNames: new Map(),
      models: new Map(),
      parameterSets: new Map(),
      simulationRuns: new Map(),
      datasets: new Map(),
      methods: new Map(),
      hypothesisCandidates: new Map(),
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

    empty.startLine = fences[0].idx;
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
    const expected = LX.LINTER_SCHEMA_VERSION;
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
        reason: `Frontmatter should declare phase: one of ${LX.PHASES.join(' | ')}.`,
        rule: 'FRONT-3'
      }));
    } else if (!LX.PHASES.includes(String(data.phase))) {
      findings.push(makeFinding({
        layer: 4, severity: SEVERITY.ERROR,
        category: 'Invalid phase',
        word: String(data.phase), line: fences[0].idx,
        reason: `Phase must be one of: ${LX.PHASES.join(', ')}.`,
        rule: 'FRONT-3'
      }));
    }

    // Build maps for §6.9 resolution
    const idRe = /^[A-Za-z_][A-Za-z0-9_\-.]*$/;

    function asList(value) {
      return Array.isArray(value) ? value : [];
    }

    function addIdentifiedItems(fieldName, map, requiredFields) {
      asList(data[fieldName]).forEach(item => {
        if (!item || !item.id) {
          findings.push(makeFinding({
            layer: 4, severity: SEVERITY.ERROR,
            category: 'Missing identifier',
            word: `${fieldName}[].id`, line: fences[0].idx,
            reason: `${fieldName}[].id is required by the v0.4 frontmatter schema.`,
            rule: 'FRONT-1'
          }));
          return;
        }
        if (!idRe.test(item.id)) {
          findings.push(makeFinding({
            layer: 4, severity: SEVERITY.ERROR,
            category: 'Invalid identifier',
            word: String(item.id), line: fences[0].idx,
            reason: `${fieldName}[].id "${item.id}" violates the §6.2 Identifier production.`,
            rule: 'IDENT'
          }));
        }
        requiredFields.forEach(field => {
          if (item[field] === undefined || item[field] === null || item[field] === '') {
            findings.push(makeFinding({
              layer: 4, severity: SEVERITY.ERROR,
              category: 'Missing frontmatter field',
              word: `${fieldName}[].${field}`, line: fences[0].idx,
              reason: `${fieldName}[].${field} is required by the v0.4 frontmatter schema.`,
              rule: 'FRONT-1'
            }));
          }
        });
        map.set(String(item.id), item);
      });
    }

    asList(data.instruments).forEach(item => {
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

    asList(data.references).forEach(item => {
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

    asList(data.conditions).forEach(item => {
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

    asList(data.technical_names).forEach(item => {
      if (!item || !item.term) return;
      const term = String(item.term);
      empty.technicalNames.set(term, item);
      // R-14: a single-token Technical Name that is also a core lexicon word.
      // Per the domain-general core principle, core words are not registered as
      // Technical Names. (Multi-word terms like "harm metric" are unaffected.)
      if (LX.isApproved(term.toLowerCase())) {
        findings.push(makeFinding({
          layer: 4, severity: SEVERITY.ERROR,
          category: 'Technical Name shadows a core lexicon word',
          word: term, line: fences[0].idx,
          reason: `Technical Name "${term}" is also a core-lexicon word. Per the domain-general core principle, core words are not registered as Technical Names; use the plain word, or choose a distinct domain term (for example a multi-word Technical Name) (R-14).`,
          rule: 'R-14'
        }));
      }
    });

    addIdentifiedItems('models', empty.models, ['specification_ref', 'parameter_schema_ref']);
    addIdentifiedItems('parameter_sets', empty.parameterSets, ['model']);
    addIdentifiedItems('simulation_runs', empty.simulationRuns, ['model', 'parameters']);
    addIdentifiedItems('datasets', empty.datasets, ['schema_ref']);
    addIdentifiedItems('methods', empty.methods, ['catalogue_ref']);
    addIdentifiedItems('hypothesis_space', empty.hypothesisCandidates, ['statement', 'discriminates_via']);

    empty.parameterSets.forEach((item, id) => {
      if (item.model && !empty.models.has(String(item.model))) {
        findings.push(makeFinding({
          layer: 4, severity: SEVERITY.ERROR,
          category: 'Unresolved parameter model',
          word: String(item.model), line: fences[0].idx,
          reason: `parameter_sets[] entry "${id}" names model "${item.model}", which is not declared in models.`,
          rule: 'FRONT-MODEL'
        }));
      }
    });

    empty.simulationRuns.forEach((item, id) => {
      const modelId = item.model && String(item.model);
      const paramsId = item.parameters && String(item.parameters);
      const params = paramsId ? empty.parameterSets.get(paramsId) : null;
      if (modelId && !empty.models.has(modelId)) {
        findings.push(makeFinding({
          layer: 4, severity: SEVERITY.ERROR,
          category: 'Unresolved simulation model',
          word: modelId, line: fences[0].idx,
          reason: `simulation_runs[] entry "${id}" names model "${modelId}", which is not declared in models.`,
          rule: 'FRONT-SIM-RUN'
        }));
      }
      if (paramsId && !params) {
        findings.push(makeFinding({
          layer: 4, severity: SEVERITY.ERROR,
          category: 'Unresolved simulation parameters',
          word: paramsId, line: fences[0].idx,
          reason: `simulation_runs[] entry "${id}" names parameter set "${paramsId}", which is not declared in parameter_sets.`,
          rule: 'FRONT-SIM-RUN'
        }));
      }
      if (modelId && params && String(params.model) !== modelId) {
        findings.push(makeFinding({
          layer: 4, severity: SEVERITY.ERROR,
          category: 'Simulation run mismatch',
          word: id, line: fences[0].idx,
          reason: `simulation run "${id}" uses model "${modelId}" but parameter set "${paramsId}" belongs to model "${params.model}".`,
          rule: 'FRONT-SIM-RUN'
        }));
      }
    });

    empty.hypothesisCandidates.forEach((item, id) => {
      const tests = item.discriminates_via;
      const hasTests = Array.isArray(tests) ? tests.length > 0 : Boolean(tests);
      if (!hasTests) {
        findings.push(makeFinding({
          layer: 4, severity: SEVERITY.ERROR,
          category: 'Empty discriminating tests',
          word: id, line: fences[0].idx,
          reason: `hypothesis_space[] entry "${id}" must declare a non-empty discriminates_via field.`,
          rule: 'E-HYP-3'
        }));
      }
    });

    // Scopes for E-DEF "stipulated, for ScopeName": phase names + any declared scopes
    LX.PHASES.forEach(p => empty.scopes.add(p));
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
  // Block scalars (`>`, `|`) and wrapped values are folded into the value they
  // continue, so that no frontmatter prose is lost to checkFrontmatterProse.
  function fallbackParseFrontmatter(text) {
    const data = {
      instruments: [], references: [], conditions: [], technical_names: [],
      models: [], parameter_sets: [], simulation_runs: [],
      datasets: [], methods: [], hypothesis_space: []
    };
    const listKeys = Object.keys(data);
    const indentOf = line => line.length - line.trimStart().length;

    let currentList = null;
    let currentItem = null;
    // The scalar assigned last: later, deeper-indented lines continue it.
    let target = null;
    const assign = (obj, key, rawValue, indent) => {
      const value = stripYamlComment(rawValue);
      const block = /^[>|][+-]?\d*$/.test(value);
      obj[key] = block ? '' : stripQuotes(value);
      target = { obj, key, indent, block };
    };
    const continueTarget = line => {
      const piece = line.trim().replace(/^-\s+/, '');
      if (!piece) return;
      const sofar = target.obj[target.key];
      target.obj[target.key] = sofar ? `${sofar} ${piece}` : piece;
    };

    for (const line of text.split('\n')) {
      // Inside a block scalar every deeper-indented line is content, "#" included.
      if (target && target.block && line.trim() && indentOf(line) > target.indent) {
        continueTarget(line);
        continue;
      }
      if (/^\s*#/.test(line)) continue;  // comment line

      const topKv = /^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
      if (topKv && !line.startsWith(' ') && !line.startsWith('\t')) {
        const key = topKv[1];
        const val = stripYamlComment(topKv[2].trim());
        currentItem = null;
        if (val === '' && listKeys.includes(key)) {
          currentList = data[key];
          target = null;
        } else {
          assign(data, key, val, 0);
          currentList = null;
        }
        continue;
      }
      const itemStart = /^\s*-\s*([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
      if (itemStart && currentList) {
        currentItem = {};
        currentList.push(currentItem);
        assign(currentItem, itemStart[1], itemStart[2].trim(), indentOf(line));
        continue;
      }
      const itemField = /^\s+([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
      if (itemField && currentItem) {
        assign(currentItem, itemField[1], itemField[2].trim(), indentOf(line));
        continue;
      }
      // Anything else that sits deeper than the last scalar continues it: a
      // wrapped plain value, or a nested list or mapping this parser does not
      // model. Keeping the text means it is still checked.
      if (target && indentOf(line) > target.indent) continueTarget(line);
    }
    return data;
  }

  // Drop a trailing YAML comment from a raw value. Inside quotes "#" is literal.
  function stripYamlComment(value) {
    const quoted = /^("(?:[^"\\]|\\.)*"|'(?:[^']|'')*')\s*(?:#.*)?$/.exec(value);
    if (quoted) return quoted[1];
    return value.replace(/(^|\s)#.*$/, '').trim();
  }

  // The text of the YAML comment on one raw line, or ''. "#" opens a comment
  // at the start of a line or after whitespace, outside quotes.
  function yamlCommentOf(raw) {
    const masked = raw.replace(/"(?:[^"\\]|\\.)*"|'(?:[^']|'')*'/g, q => ' '.repeat(q.length));
    const m = /(?:^|\s)#(.*)$/.exec(masked);
    return m ? raw.slice(raw.length - m[1].length) : '';
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
    if (codeBuf) {
      // The fence was never closed. Keep the block so its content is still
      // checked; checkRegister reports the missing closing fence.
      codeBuf.unclosed = true;
      blocks.push(codeBuf);
    }
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
      // §6.5: CodeContent = TaggedClause+ whatever the info string. Each
      // non-empty line is one clause; the info string only decides which
      // E-tag types the block admits (§6.8).
      block.lines.forEach(L => {
        const t = L.trimmed;
        if (!t) return;
        const c = parseTaggedClause(t, L.idx, block);
        if (c) {
          block.clauses.push(c);
          clauses.push(c);
        }
      });
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
        segment: text, lexicalText: text, embedded: [], asides: [],
        parseError: 'missing-etag',
        isImperative: block && block.type === 'orderedList'
      };
    }
    const open = findMatchingOpen(body, close);
    if (open === -1) {
      return {
        raw: text, interior: text, etag: null,
        line, block,
        segment: text, lexicalText: text, embedded: [], asides: [],
        parseError: 'unmatched-paren',
        isImperative: block && block.type === 'orderedList'
      };
    }

    const tagContent = body.substring(open + 1, close);
    const interior = body.substring(0, open).trim();
    const etag = parseETag(tagContent);
    const frames = splitInteriorFrames(interior);

    const clause = {
      raw: text,
      interior,
      etag,
      tagContent,
      line,
      block,
      // The words this tag governs: what follows the last earlier tag of a
      // compound sentence, or the whole interior when there is none.
      segment: frames.tail,
      // The interior with every tag frame cut out — what the lexicon,
      // identifier and hazard scans read.
      lexicalText: frames.lexical,
      // Earlier tags of a compound sentence (§4.3). Each is checked like a
      // clause of its own, but only the sentence as a whole gets a clause ID.
      embedded: frames.embedded,
      asides: frames.asides,
      isImperative: block && block.type === 'orderedList'
    };
    clause.embedded.forEach(part => {
      part.line = line;
      part.block = block;
      part.parent = clause;
    });
    return clause;
  }

  // Sort the parentheticals left in a clause interior once its final E-tag has
  // been cut off. One that starts with an E-tag verb, or that sits where a tag
  // would — before a comma, a coordinating conjunction, or the end — is the
  // tag of an earlier clause in a compound sentence (§4.3, §6.10) and is
  // parsed as one. Any other parenthetical is an aside, which the clause
  // grammar has no production for (§6.6).
  function splitInteriorFrames(interior) {
    const embedded = [];
    const asides = [];
    let lexical = '';
    let segmentStart = 0;   // where the current clause's own words begin
    let copiedTo = 0;       // interior[0..copiedTo) is already in `lexical`
    let inCode = false;

    for (let i = 0; i < interior.length; i++) {
      const ch = interior[i];
      if (ch === '`') { inCode = !inCode; continue; }
      if (inCode || ch !== '(') continue;

      const close = findMatchingClose(interior, i);
      if (close === -1) {
        asides.push(interior.substring(i));
        break;
      }
      const content = interior.substring(i + 1, close);
      const after = interior.substring(close + 1);
      const firstWord = content.trim().split(/[\s,]/)[0].toLowerCase();
      const startsWithTagVerb = Boolean(LX.getEtagType(firstWord));
      const inTagPosition = /^\s*(?:[,;.]|(?:and|or|but)\b|$)/i.test(after);

      if (startsWithTagVerb || inTagPosition) {
        embedded.push({
          etag: parseETag(content),
          tagContent: content,
          segment: clauseSegment(interior.substring(segmentStart, i)),
          embedded: true
        });
        lexical += interior.substring(copiedTo, i) + ' ';
        segmentStart = close + 1;
      } else {
        asides.push(interior.substring(i, close + 1));
        // The aside's words stay in the lexical text; only the parentheses go.
        lexical += interior.substring(copiedTo, i) + ' ' + content + ' ';
      }
      copiedTo = close + 1;
      i = close;
    }
    lexical += interior.substring(copiedTo);

    return { embedded, asides, lexical, tail: clauseSegment(interior.substring(segmentStart)) };
  }

  // The words of one clause within a compound sentence, without the comma and
  // conjunction that join it to the clause before.
  function clauseSegment(text) {
    return text.replace(/^[\s,;.]+/, '').replace(/^(?:and|or|but)\b\s*/i, '').trim();
  }

  // A clause together with the earlier tags of its compound sentence.
  function taggedParts(clause) {
    return [clause, ...(clause.embedded || [])];
  }

  function findMatchingClose(text, openIdx) {
    let depth = 0;
    for (let i = openIdx; i < text.length; i++) {
      const ch = text[i];
      if (ch === '(') depth++;
      else if (ch === ')') {
        depth--;
        if (depth === 0) return i;
      }
    }
    return -1;
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
    const info = LX.getEtagType(verb);
    if (!info) {
      return {
        valid: false, raw: trimmed, verb,
        type: null,
        issues: [`"${verb}" is not an approved E-tag verb. Approved: ${LX.ETAG_VERBS.join(', ')}.`]
      };
    }

    const out = {
      raw: trimmed, verb,
      type: info.code || keyOf(info),
      tier: info.tier,
      sources: [],
      premises: [],
      records: [],
      modelRef: null,
      parameterSetRef: null,
      simulationRunRef: null,
      datasetRef: null,
      methodRef: null,
      hypothesisCandidate: null,
      distinguishableFrom: null,
      uncertainty: null,
      sampleSize: null,
      scope: null,
      conditionRef: null,
      forRef: null,
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
      case 'E-SIM': parseSimTag(verb, tail, out); break;
      case 'E-AGG': parseAggTag(verb, tail, out); break;
      case 'E-HYP': parseHypTag(verb, tail, out); break;
      case 'E-DEF': parseDefTag(verb, tail, out); break;
      case 'E-PRO': parseProTag(verb, tail, out); break;
    }

    out.valid = out.issues.length === 0;
    return out;
  }

  function inferTypeCode(verb) {
    for (const code of Object.keys(LX.ETAG_TYPES)) {
      if (LX.ETAG_TYPES[code].verbs.includes(verb)) return code;
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
    if (cls && !LX.INSTRUMENT_CLASSES.has(cls)) {
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

  function parseSimTag(verb, tail, out) {
    const m = tail.match(/^from\s+model\s+`([A-Za-z0-9_\-.]+)`\s*,\s*parameters\s+`([A-Za-z0-9_\-.]+)`\s*,\s*run\s+`([A-Za-z0-9_\-.]+)`$/);
    if (!m) {
      out.issues.push(`E-SIM "${verb}" expects (${verb}, from model \`MODEL-ID\`, parameters \`PARAMETERS-ID\`, run \`RUN-ID\`).`);
      return;
    }
    out.modelRef = m[1];
    out.parameterSetRef = m[2];
    out.simulationRunRef = m[3];
  }

  function parseAggTag(verb, tail, out) {
    const m = tail.match(/^from\s+dataset\s+`([A-Za-z0-9_\-.]+)`\s*,\s*method\s+`([A-Za-z0-9_\-.]+)`\s*,\s*n\s*=\s*(\d+)$/);
    if (!m) {
      out.issues.push(`E-AGG "${verb}" expects (${verb}, from dataset \`DATASET-ID\`, method \`METHOD-ID\`, n=N).`);
      return;
    }
    out.datasetRef = m[1];
    out.methodRef = m[2];
    out.sampleSize = parseInt(m[3], 10);
    if (out.sampleSize <= 0) {
      out.issues.push('E-AGG sample size n must be a positive integer.');
    }
  }

  function parseHypTag(verb, tail, out) {
    const parts = splitTopLevelCommas(tail);
    if (parts.length < 3) {
      out.issues.push(`E-HYP "${verb}" expects (${verb}, candidate \`CANDIDATE-ID\`, from \`PREMISE-1\`, distinguishable-from \`OTHER-ID\`).`);
      return;
    }

    const cand = parts[0].match(/^candidate\s+`([A-Za-z0-9_\-.]+)`$/);
    if (!cand) {
      out.issues.push('E-HYP requires the first argument to be "candidate `ID`".');
      return;
    }
    out.hypothesisCandidate = cand[1];

    let sawFrom = false;
    let sawOther = false;
    for (let i = 1; i < parts.length; i++) {
      const p = parts[i].trim();
      const fromM = p.match(/^from\s+`([A-Za-z0-9_\-.]+)`$/);
      if (fromM) {
        sawFrom = true;
        out.premises.push(fromM[1]);
        continue;
      }
      const premiseM = p.match(/^`([A-Za-z0-9_\-.]+)`$/);
      if (sawFrom && !sawOther && premiseM) {
        out.premises.push(premiseM[1]);
        continue;
      }
      const otherM = p.match(/^distinguishable-from\s+`([A-Za-z0-9_\-.]+)`$/);
      if (otherM) {
        sawOther = true;
        out.distinguishableFrom = otherM[1];
        continue;
      }
      out.issues.push(`E-HYP clause "${p}" did not match "from \`PREMISE\`", "\`PREMISE\`", or "distinguishable-from \`CANDIDATE\`".`);
    }
    if (!sawFrom || out.premises.length === 0) {
      out.issues.push('E-HYP requires at least one premise reference after "from".');
    }
    if (!out.distinguishableFrom) {
      out.issues.push('E-HYP requires a distinguishable-from candidate reference.');
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
      const forM = p.match(/^for\s+`([A-Za-z0-9_\-.]+)`$/);
      if (forM) { out.forRef = forM[1]; continue; }
      out.issues.push(`E-PRO clause "${p}" did not match "step N", "if \`CONDITION\`", or "for \`CONDITION\`".`);
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

  // Code-block registers: info string → the E-tag types the block admits.
  const CODE_REGISTERS = new Map([
    ['definition', { types: ['E-DEF'], rule: 'C-1' }],
    ['constraint', { types: ['E-DEF', 'E-DER'], rule: 'C-2' }],
    ['measurement', { types: ['E-MSR'], rule: 'C-3' }],
    ['simulation', { types: ['E-SIM'], rule: 'C-5' }],
    ['aggregation', { types: ['E-AGG'], rule: 'C-6' }],
    ['relation', { types: ['E-DER'], rule: 'C-7' }]
  ]);

  // §6.2 Identifier
  const IDENTIFIER_RE = /^[A-Za-z_][A-Za-z0-9_\-.]*$/;

  // The §6.8 register violation for one valid E-tag in one block, or null.
  function registerViolation(block, etag) {
    if (block.type === 'paragraph') {
      if (etag.type !== 'E-HYP') return null;
      if (/^hypothesis\b/i.test((block.precedingHeading || '').trim())) return null;
      return {
        category: 'E-HYP placement', rule: 'HYP-PLACE',
        reason: 'E-HYP clauses must appear in paragraphs under a heading beginning with "Hypothesis".'
      };
    }
    if (block.type === 'blockquote') {
      if (etag.type === 'E-OBS' || etag.type === 'E-MSR') return null;
      return {
        category: 'Register mismatch (blockquote)', rule: 'B-1',
        reason: `Blockquote permits only E-OBS or E-MSR; this clause carries ${etag.type} (B-1).`
      };
    }
    if (block.type === 'orderedList') {
      if (etag.type === 'E-PRO') return null;
      return {
        category: 'Register mismatch (ordered list)', rule: 'O-1',
        reason: `Ordered list permits only E-PRO; this clause carries ${etag.type} (O-1).`
      };
    }
    if (block.type === 'codeBlock') {
      const info = block.infoString;
      if (info === 'hypothesis') {
        return {
          category: 'E-HYP placement', rule: 'HYP-PLACE',
          reason: 'E-HYP is permitted only in paragraph text under a heading beginning with "Hypothesis"; code-block hypothesis registers are not admitted.'
        };
      }
      const register = CODE_REGISTERS.get(info);
      if (!register || register.types.includes(etag.type)) return null;
      return {
        category: `Register mismatch (${info} block)`, rule: register.rule,
        reason: `Code block "${info}" permits only ${register.types.join(' or ')}; got ${etag.type} (${register.rule}).`
      };
    }
    return null;
  }

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
      if (b.type === 'codeBlock') checkCodeFence(b, findings);
      if (!b.clauses) return;

      // Every tag in the block, including the earlier tags of a compound sentence
      b.clauses.forEach(c => {
        taggedParts(c).forEach(part => {
          if (!part.etag || !part.etag.valid) return;
          const violation = registerViolation(b, part.etag);
          if (!violation) return;
          findings.push(makeFinding({
            layer: 2, severity: SEVERITY.ERROR,
            category: violation.category,
            word: `(${part.tagContent})`, line: c.line,
            reason: violation.reason,
            rule: violation.rule
          }));
        });
      });

      if (b.type === 'orderedList') {
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
      }
    });
  }

  // Fence-level findings for one code block (§6.5).
  function checkCodeFence(b, findings) {
    const info = b.infoString || '';
    if (b.unclosed) {
      findings.push(makeFinding({
        layer: 4, severity: SEVERITY.ERROR,
        category: 'Unclosed code fence',
        word: '```' + info, line: b.startLine,
        reason: 'This code fence is never closed, so everything after it reads as code. Close it with a line of three backticks (§6.5).',
        rule: 'FENCE-UNCLOSED'
      }));
    }
    if (!info) {
      findings.push(makeFinding({
        layer: 4, severity: SEVERITY.ERROR,
        category: 'Missing code block info string',
        word: '```', line: b.startLine,
        reason: 'A fenced code block needs an info string: definition, constraint, measurement, simulation, aggregation, relation, or another identifier (§6.5).',
        rule: 'C-INFO'
      }));
    } else if (!IDENTIFIER_RE.test(info)) {
      findings.push(makeFinding({
        layer: 4, severity: SEVERITY.ERROR,
        category: 'Invalid code block info string',
        word: '```' + info, line: b.startLine,
        reason: `Info string "${info}" is not a single identifier (§6.5).`,
        rule: 'C-INFO'
      }));
    } else if (info !== 'hypothesis' && !CODE_REGISTERS.has(info)) {
      findings.push(makeFinding({
        layer: 2, severity: SEVERITY.INFO,
        category: 'Code block info-string review',
        word: '```' + info, line: b.startLine,
        reason: `Code block info-string "${info}" is unrestricted but flagged for review (C-4).`,
        rule: 'C-4'
      }));
    }
  }

  // ===== STEP 6: checkResolution (§6.9 R-1..R-10, P-1..P-9, FRONT-1) =====

  function checkResolution(clauses, fm, findings) {
    // Every tag is resolved, including the earlier tags of a compound
    // sentence. `owner` is the numbered clause a tag belongs to.
    const parts = [];
    clauses.forEach(clause => taggedParts(clause).forEach(part => parts.push(part)));
    const cycleChecked = new Set();

    parts.forEach(c => {
      if (!c.etag || !c.etag.valid) return;
      const t = c.etag;
      const owner = c.parent || c;

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

      // E-PRO-4: `for` rationale slot must resolve to a declared condition
      if (t.forRef) {
        if (!fm.conditions.has(t.forRef)) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Unresolved rationale condition',
            word: '`' + t.forRef + '`', line: c.line,
            reason: `Rationale condition "${t.forRef}" (for-slot) not declared in conditions: (R-3, E-PRO-4).`,
            rule: 'E-PRO-4'
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

      // R-5..R-7: E-SIM references → models, parameter_sets, simulation_runs
      if (t.type === 'E-SIM') {
        const model = t.modelRef && fm.models.get(t.modelRef);
        const params = t.parameterSetRef && fm.parameterSets.get(t.parameterSetRef);
        const run = t.simulationRunRef && fm.simulationRuns.get(t.simulationRunRef);
        if (t.modelRef && !model) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Unresolved model reference',
            word: '`' + t.modelRef + '`', line: c.line,
            reason: `Model identifier "${t.modelRef}" not declared in models: (R-5, FRONT-1).`,
            rule: 'R-5'
          }));
        }
        if (t.parameterSetRef && !params) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Unresolved parameter reference',
            word: '`' + t.parameterSetRef + '`', line: c.line,
            reason: `Parameter-set identifier "${t.parameterSetRef}" not declared in parameter_sets: (R-6, FRONT-1).`,
            rule: 'R-6'
          }));
        }
        if (t.simulationRunRef && !run) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Unresolved simulation run',
            word: '`' + t.simulationRunRef + '`', line: c.line,
            reason: `Simulation run identifier "${t.simulationRunRef}" not declared in simulation_runs: (R-7, FRONT-1).`,
            rule: 'R-7'
          }));
        }
        if (params && String(params.model) !== t.modelRef) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Parameter/model mismatch',
            word: '`' + t.parameterSetRef + '`', line: c.line,
            reason: `Parameter set "${t.parameterSetRef}" belongs to model "${params.model}", not "${t.modelRef}".`,
            rule: 'E-SIM-1'
          }));
        }
        if (run && (String(run.model) !== t.modelRef || String(run.parameters) !== t.parameterSetRef)) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Simulation run mismatch',
            word: '`' + t.simulationRunRef + '`', line: c.line,
            reason: `Run "${t.simulationRunRef}" must reproduce from model "${t.modelRef}" and parameters "${t.parameterSetRef}".`,
            rule: 'E-SIM-2'
          }));
        }
      }

      // R-8..R-9: E-AGG references → datasets, methods
      if (t.type === 'E-AGG') {
        if (t.datasetRef && !fm.datasets.has(t.datasetRef)) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Unresolved dataset reference',
            word: '`' + t.datasetRef + '`', line: c.line,
            reason: `Dataset identifier "${t.datasetRef}" not declared in datasets: (R-8, FRONT-1).`,
            rule: 'R-8'
          }));
        }
        if (t.methodRef && !fm.methods.has(t.methodRef)) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Unresolved method reference',
            word: '`' + t.methodRef + '`', line: c.line,
            reason: `Method identifier "${t.methodRef}" not declared in methods: (R-9, FRONT-1).`,
            rule: 'R-9'
          }));
        }
      }

      // R-10: E-HYP candidate references → hypothesis_space
      if (t.type === 'E-HYP') {
        const candidate = t.hypothesisCandidate && fm.hypothesisCandidates.get(t.hypothesisCandidate);
        const other = t.distinguishableFrom && fm.hypothesisCandidates.get(t.distinguishableFrom);
        if (t.hypothesisCandidate && !candidate) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Unresolved hypothesis candidate',
            word: '`' + t.hypothesisCandidate + '`', line: c.line,
            reason: `Hypothesis candidate "${t.hypothesisCandidate}" not declared in hypothesis_space: (R-10, E-HYP-1).`,
            rule: 'E-HYP-1'
          }));
        }
        if (t.distinguishableFrom && !other) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Unresolved sibling candidate',
            word: '`' + t.distinguishableFrom + '`', line: c.line,
            reason: `Distinguishable candidate "${t.distinguishableFrom}" not declared in hypothesis_space: (R-10, E-HYP-2).`,
            rule: 'E-HYP-2'
          }));
        }
        if (t.hypothesisCandidate && t.hypothesisCandidate === t.distinguishableFrom) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Hypothesis self-comparison',
            word: '`' + t.hypothesisCandidate + '`', line: c.line,
            reason: 'E-HYP candidate and distinguishable-from candidate must differ.',
            rule: 'E-HYP-2'
          }));
        }
        if (candidate && other) {
          const cSpace = String(candidate.space || 'default');
          const oSpace = String(other.space || 'default');
          if (cSpace !== oSpace) {
            findings.push(makeFinding({
              layer: 3, severity: SEVERITY.ERROR,
              category: 'Hypothesis space mismatch',
              word: '`' + t.hypothesisCandidate + '` / `' + t.distinguishableFrom + '`', line: c.line,
              reason: `Hypothesis candidates must share a declared space; got "${cSpace}" and "${oSpace}".`,
              rule: 'E-HYP-2'
            }));
          }
        }
      }

      // R-4 + P-1..P-9: PremiseRef
      t.premises.forEach(pid => {
        const target = clauses._byId && clauses._byId.get(pid);
        const inRefs = fm.references.has(pid);
        const inConditions = fm.conditions.has(pid);   // E-DER-3, P-10
        const inTechNames = fm.technicalNames.has(pid); // E-DER-3, P-11
        if (!target && !inRefs && !inConditions && !inTechNames) {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Unresolved premise reference',
            word: '`' + pid + '`', line: c.line,
            reason: `Premise "${pid}" does not resolve to a tagged clause, a record in references:, a condition (COND-*), or a Technical-Name definition (R-4, E-DER-3).`,
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
          if (c.etag.type === 'E-HYP' && pt === 'E-HYP') {
            findings.push(makeFinding({
              layer: 3, severity: SEVERITY.ERROR,
              category: 'Hypothesis premise',
              word: '`' + pid + '`', line: c.line,
              reason: `E-HYP premise "${pid}" is another E-HYP clause; hypotheses may not premise other hypotheses.`,
              rule: 'E-HYP-4'
            }));
          }
          // Self-reference (trivial cycle)
          if (target === owner) {
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

      // E-DER-1: detect cycles in the premise DAG (multi-hop), once per numbered clause
      if (t.type === 'E-DER' && t.premises.length > 0 && !cycleChecked.has(owner)) {
        cycleChecked.add(owner);
        const cycle = detectCycleFrom(owner, clauses._byId);
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

  // ===== STEP 6b: FRONT-1 identifier reconciliation (§6.9 R-11, R-12) =====
  // Every InlineCode identifier in clause interiors and headings must resolve
  // to a frontmatter declaration. A backtick wrapping a core-lexicon word or a
  // multi-token phrase is rejected as evasion (R-12). This closes the gap by
  // which backticked body identifiers were stripped before the lexicon check
  // and never resolved against the frontmatter.

  function buildIdentifierResolver(fm) {
    const maps = [fm.instruments, fm.references, fm.conditions, fm.technicalNames,
                  fm.models, fm.parameterSets, fm.simulationRuns, fm.datasets,
                  fm.methods, fm.hypothesisCandidates];
    return id => maps.some(m => m && typeof m.has === 'function' && m.has(id));
  }

  // §6.3 IdentifierBody
  const IDENTIFIER_BODY_RE = /^[A-Za-z0-9_\-.]+$/;

  // R-11..R-13 for every inline-code token in one stretch of prose.
  function checkInlineCodeIdentifiers(text, line, resolves, findings) {
    const codes = text && text.match(/`[^`]*`/g);
    if (!codes) return;
    codes.forEach(tok => {
      const body = tok.slice(1, -1);
      if (body.length === 0) return;
      // R-12: not a single §6.3 IdentifierBody token (whitespace, |, etc.).
      // A structural malformation: the backticked text cannot be one identifier.
      if (!IDENTIFIER_BODY_RE.test(body)) {
        findings.push(makeFinding({
          layer: 3, severity: SEVERITY.ERROR,
          category: 'Invalid identifier token',
          word: tok, line,
          reason: `"${body}" is not a single identifier: it contains characters outside the §6.3 IdentifierBody (whitespace, "|", and similar). Backticks must wrap one declared identifier (R-12).`,
          rule: 'R-12'
        }));
        return;
      }
      // Declared identifier (any namespace) resolves cleanly. A declared term
      // that also happens to be a core word is diagnosed once at its
      // declaration (R-14), not here, to avoid repeating the finding per use.
      if (resolves(body)) return;
      // R-13: a core-lexicon word written in backticks but not declared.
      // A typing/register choice, not a hard error: backticks mark a declared
      // identifier, so the word reads correctly as plain text. Recoverable.
      if (LX.isApproved(body.toLowerCase())) {
        findings.push(makeFinding({
          layer: 3, severity: SEVERITY.WARNING,
          category: 'Lexicon word written as an identifier',
          word: tok, line,
          reason: `"${body}" is a core-lexicon word. Backticks mark a declared identifier (a Technical Name or a frontmatter reference); write this word as plain text (R-13).`,
          rule: 'R-13'
        }));
        return;
      }
      // R-11: a non-core identifier that resolves to no frontmatter namespace.
      findings.push(makeFinding({
        layer: 3, severity: SEVERITY.ERROR,
        category: 'Undeclared identifier',
        word: tok, line,
        reason: `Identifier "${body}" resolves to no frontmatter namespace (technical_names, conditions, instruments, references, models, parameter_sets, simulation_runs, datasets, methods, hypothesis_space). Register it as a Technical Name (R-11, FRONT-1).`,
        rule: 'R-11'
      }));
    });
  }

  function checkIdentifierDeclarations(blocks, clauses, fm, findings) {
    const resolves = buildIdentifierResolver(fm);

    blocks.forEach(b => {
      if (b.type === 'heading') checkInlineCodeIdentifiers(b.text || '', b.startLine, resolves, findings);
    });
    // The lexical text leaves out every tag frame: the identifiers inside a
    // tag are resolved by type in checkResolution, and a premise reference
    // names a clause, not a frontmatter entry.
    clauses.forEach(c => {
      const text = c.lexicalText != null ? c.lexicalText : c.interior;
      if (text) checkInlineCodeIdentifiers(text, c.line, resolves, findings);
    });
  }

  // Every premise a numbered clause cites, across all the tags of its sentence.
  function premisesOf(clause) {
    const out = [];
    taggedParts(clause).forEach(part => {
      if (part.etag && part.etag.premises) out.push(...part.etag.premises);
    });
    return out;
  }

  function detectCycleFrom(start, byId) {
    if (!byId) return null;
    const stack = [{ clause: start, path: [start.id || '?'] }];
    const seen = new Set();
    while (stack.length) {
      const { clause, path } = stack.pop();
      for (const pid of premisesOf(clause)) {
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
        scanLexicalText(b.text, b.startLine, findings, {});
      }
    });

    clauses.forEach(c => {
      const text = c.lexicalText != null ? c.lexicalText : (c.interior || '');
      if (!text) return;
      const inRelation = Boolean(c.block && c.block.type === 'codeBlock' && c.block.infoString === 'relation');
      scanLexicalText(text, c.line, findings, { allowOperators: inRelation });
    });
  }

  // Punctuation that may sit on the edge of a token: brackets, quotes,
  // Markdown emphasis markers, and sentence punctuation.
  const TOKEN_LEAD_RE = /^[(\["'*_]+/;
  const TOKEN_TRAIL_RE = /[)\]"'*_,.:;?!]+$/;
  // §6.2 Number, with thousands separators and a percent sign admitted.
  const NUMBER_RE = /^[+-]?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?%?$/;
  const WORD_RE = /^[A-Za-z][A-Za-z'-]*$/;
  // A number joined to a word, as in "24-hour".
  const NUMBER_WORD_RE = /^\d+(?:\.\d+)?-([A-Za-z][A-Za-z-]*)$/;
  // §6.6 OperatorToken; "±" belongs to the E-tag's UncertaintyExpr only.
  const OPERATOR_RE = /^[\/×+−=±]$/;
  const RELATION_OPERATOR_RE = /^[\/×+−=-]$/;
  // A letter that does not belong to the Latin script.
  const NON_LATIN_LETTER_RE = /(?=\p{L})\P{Script=Latin}/u;

  // Check one stretch of prose: drop inline code, then classify every
  // whitespace-delimited token (§6.6). A token is a number, a lexicon word, or
  // a number-word compound; anything else is reported, so that no spelling
  // trick takes a word past the lexicon unseen.
  //   opts.allowOperators — the text sits in a `relation` block (C-7).
  function scanLexicalText(text, line, findings, opts) {
    const options = opts || {};
    const stripped = text
      .replace(/`[^`]*`/g, ' ')                        // drop inline code
      .replace(/[‘’ʼ＇]/g, "'")     // typographic apostrophes
      .replace(/[“”]/g, '"');

    // Multi-word banned patterns
    LX.MULTI_WORD_BANNED.forEach(({ pattern, category, reason }) => {
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

    // Token by token
    stripped.split(/\s+/).forEach(raw => {
      const token = raw.replace(TOKEN_LEAD_RE, '').replace(TOKEN_TRAIL_RE, '');
      if (!token) return;
      if (NUMBER_RE.test(token)) return;

      if (WORD_RE.test(token)) {
        checkLexicalWord(token, token, line, findings);
        return;
      }
      const compound = NUMBER_WORD_RE.exec(token);
      if (compound) {
        checkLexicalWord(compound[1], token, line, findings);
        return;
      }
      if (options.allowOperators && RELATION_OPERATOR_RE.test(token)) return;
      if (!options.allowOperators && OPERATOR_RE.test(token)) {
        findings.push(makeFinding({
          layer: 2, severity: SEVERITY.WARNING,
          category: 'Operator outside relation block',
          word: token, line,
          reason: 'Operator notation is admitted only inside a `relation` code block (C-7). Elsewhere use sum, difference, product, quotient, ratio with of, to, by, per.',
          rule: 'C-7'
        }));
        return;
      }
      reportUnrecognizedToken(token, line, findings);
    });
  }

  function pushBanned(details, word, line, findings) {
    details.forEach(v => {
      findings.push(makeFinding({
        layer: 1, severity: SEVERITY.ERROR,
        category: v.category, word, line,
        reason: v.reason,
        rule: 'LEXICON-BANNED'
      }));
    });
  }

  // Banned list, then allow-list, for one word. `shown` is the token as written.
  function checkLexicalWord(word, shown, line, findings) {
    const lower = word.toLowerCase();

    if (lower.length === 1) {
      // Single letters are not held to the allow-list (unit letters, terminal
      // labels), but the first-person pronoun stays banned.
      const banned = LX.checkBanned(lower);
      if (banned) pushBanned(banned, shown, line, findings);
      return;
    }

    const res = LX.checkWord(lower);
    if (res.status === 'banned') {
      pushBanned(res.details, shown, line, findings);
      return;
    }
    if (res.status !== 'unlisted') return;

    // A hyphenated compound that is not itself a lexicon word must not carry
    // a banned word in on its back.
    const bannedParts = lower.split('-')
      .filter(part => part.length > 1)
      .flatMap(part => LX.checkBanned(part) || []);
    if (lower.includes('-') && bannedParts.length > 0) {
      pushBanned(bannedParts, shown, line, findings);
      return;
    }

    findings.push(makeFinding({
      layer: 1, severity: SEVERITY.WARNING,
      category: 'Word not in lexicon',
      word: shown, line,
      reason: res.hint
        ? `"${lower}" — ${res.hint}`
        : `"${lower}" not found in the Beyond CNL approved vocabulary. If domain-specific, register as a Technical Name.`,
      rule: 'LEXICON-ALLOW-LIST'
    }));
  }

  // A token that is not a word, a number, or a compound. Its letter runs still
  // get the banned check, so a digit or an underscore cannot carry a banned
  // word past the lexicon. Runs written in capitals are left alone: a bare
  // identifier such as AM-2 is unrecognized, not a copula.
  function reportUnrecognizedToken(token, line, findings) {
    let banned = false;
    (token.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || []).forEach(run => {
      if (run.length > 1 && run === run.toUpperCase()) return;
      const lower = run.toLowerCase();
      let details;
      if (lower.length === 1) {
        details = LX.checkBanned(lower);
      } else {
        const res = LX.checkWord(lower);
        details = res.status === 'banned' ? res.details : null;
      }
      if (details) {
        banned = true;
        pushBanned(details, token, line, findings);
      }
    });

    if (NON_LATIN_LETTER_RE.test(token)) {
      findings.push(makeFinding({
        layer: 1, severity: SEVERITY.ERROR,
        category: 'Non-Latin script',
        word: token, line,
        reason: `"${token}" contains letters from outside the Latin alphabet. Beyond CNL is a subset of American English; every word must come from the approved lexicon.`,
        rule: 'LEXICON-SCRIPT'
      }));
    } else if (!banned) {
      findings.push(makeFinding({
        layer: 1, severity: SEVERITY.WARNING,
        category: 'Unrecognized token',
        word: token, line,
        reason: `"${token}" is not a lexicon word, a number, or a number-word compound (§6.6). Write identifiers in inline code and spell words and units out.`,
        rule: 'LEXICON-TOKEN'
      }));
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

      const parts = taggedParts(c);

      // Malformed E-tag: the clause's own, or an earlier one in a compound sentence
      parts.forEach(part => {
        if (part.etag.valid) return;
        part.etag.issues.forEach(issue => {
          findings.push(makeFinding({
            layer: 3, severity: SEVERITY.ERROR,
            category: 'Malformed E-tag',
            word: `(${part.tagContent || ''})`, line: c.line,
            reason: issue,
            rule: 'EVID-MALFORMED'
          }));
        });
      });

      // Parenthetical asides: the clause grammar has no production for them
      (c.asides || []).forEach(aside => {
        findings.push(makeFinding({
          layer: 2, severity: SEVERITY.WARNING,
          category: 'Parenthetical in clause',
          word: shortText(aside), line: c.line,
          reason: 'Parentheses are not part of the clause grammar; only the E-tag takes them (§6.6). Restructure the clause without the aside.',
          rule: 'CLAUSE-PAREN'
        }));
      });

      // Tag-placement rules apply to every valid tag of the sentence
      parts.forEach(part => {
        if (!part.etag.valid) return;
        checkProcedural(part, c, findings);
        checkDefinitionPlacement(part, c, findings);
      });

      if (!c.etag.valid) return;

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

  // E-PRO-1 and E-PRO-2 for one procedural tag, wherever it sits. A
  // `(procedure)` tag outside an ordered list still marks a procedural clause,
  // so it is held to the same rules; otherwise the tag would let any
  // declarative claim through with no source.
  function checkProcedural(part, clause, findings) {
    if (part.etag.type !== 'E-PRO') return;
    const words = (part.segment || '').replace(/^[*_"'(\[\s]+/, '');

    // E-PRO-1: imperative leading verb
    const firstTok = (words.match(/^[A-Za-z][A-Za-z\-]*/) || [''])[0].toLowerCase();
    if (!LX.IMPERATIVE_VERBS.has(firstTok)) {
      const lead = firstTok || shortText(words.split(/\s+/)[0] || '');
      findings.push(makeFinding({
        layer: 3, severity: SEVERITY.ERROR,
        category: 'Non-imperative leading verb',
        word: lead, line: clause.line,
        reason: `Procedural clause must begin with an imperative verb from the approved list (E-PRO-1). "${lead}" is not admitted.`,
        rule: 'E-PRO-1'
      }));
    }

    // E-PRO-2: no evidential-claim verbs in the clause's own words
    const tokens = words.replace(/`[^`]*`/g, ' ').toLowerCase().match(/\b[a-z][a-z\-]*\b/g) || [];
    tokens.forEach(tok => {
      if (LX.EVIDENTIAL_CLAIM_VERBS.has(tok)) {
        findings.push(makeFinding({
          layer: 3, severity: SEVERITY.ERROR,
          category: 'Evidential-claim verb in procedure',
          word: tok, line: clause.line,
          reason: `Procedural clauses must not contain evidential-claim verbs (E-PRO-2). "${tok}" prescribes vs asserts.`,
          rule: 'E-PRO-2'
        }));
      }
    });
  }

  // E-DEF-1: `(defined)` belongs in a definition or constraint block, or on a
  // clause that introduces a **bolded** term. Anywhere else it would let any
  // claim through with no source.
  function checkDefinitionPlacement(part, clause, findings) {
    if (part.etag.type !== 'E-DEF' || part.etag.verb !== 'defined') return;
    const block = clause.block;
    if (!block) return;
    if (block.type === 'codeBlock' && (block.infoString === 'definition' || block.infoString === 'constraint')) return;
    if (registerViolation(block, part.etag)) return;  // already reported as a register mismatch
    if (/\*\*[^*]+\*\*/.test(part.segment || '')) return;
    findings.push(makeFinding({
      layer: 3, severity: SEVERITY.ERROR,
      category: 'Definition outside a definition block',
      word: `(${part.tagContent})`, line: clause.line,
      reason: 'A (defined) tag must sit in a `definition` or `constraint` code block, or on a clause that introduces a **bolded** term (E-DEF-1). Tag a causal or factual claim E-DER with its premise.',
      rule: 'E-DEF-1'
    }));
  }

  // ===== STEP 9: checkHazards (Layer 5) — block-aware =====

  const HAZARD_LOCATION_PATTERNS = [
    { pattern: /\b(?:Earth|Terra|Sol|Milky\s+Way|solar\s+system)\b/g, hazard: 'Location disclosure' },
    { pattern: /\b(?:latitude|longitude|GPS|coordinates)\b/g, hazard: 'Location disclosure' },
    { pattern: /\b(?:America|Europe|Asia|Africa|Australia|Antarctica)\b/g, hazard: 'Location disclosure' }
  ];
  const HAZARD_CAPABILITY_PATTERNS = [
    { pattern: /\b(?:our\s+(?:technology|capability|weapons|defense|military|power))\b/gi, hazard: 'Capability disclosure' },
    { pattern: /\b(?:we\s+(?:can|have|possess|developed|created|built|achieved))\b/gi, hazard: 'Capability disclosure' }
  ];

  // Information-hazard scan of one stretch of prose.
  function scanHazards(text, line, findings) {
    HAZARD_LOCATION_PATTERNS.forEach(({ pattern, hazard }) => {
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
    HAZARD_CAPABILITY_PATTERNS.forEach(({ pattern, hazard }) => {
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

  function checkHazards(blocks, findings) {
    blocks.forEach(b => {
      if (b.type === 'heading') scanHazards(b.text, b.startLine, findings);
      if (!b.clauses) return;
      b.clauses.forEach(c => {
        const text = c.lexicalText != null ? c.lexicalText : c.interior;
        if (text) scanHazards(text, c.line, findings);
      });
    });
  }

  // ===== STEP 10: checkFrontmatterProse (FRONT-2, §5 field constraints) =====
  // The frontmatter is part of the document a recipient reads. Its prose —
  // purpose, definitions, statements, titles, instrument descriptions — gets
  // the same lexicon, identifier and hazard checks as body text. Fields that
  // hold an identifier or an enumerated value are checked elsewhere.

  const FM_NON_PROSE_KEYS = new Set([
    'schema', 'phase', 'id', 'term', 'pos', 'access',
    'model', 'parameters', 'space', 'discriminates_via'
  ]);

  function isProseKey(key) {
    return !FM_NON_PROSE_KEYS.has(key) && !/_ref$/.test(key);
  }

  // Every prose string under `node`, in document order, with the key it sits under.
  function collectFrontmatterProse(node, key, out) {
    if (typeof node === 'string') {
      // A YAML parser types bare numbers and dates itself; the fallback parser
      // leaves them as strings, so skip those here to keep the two in step.
      if (isProseKey(key) && !/^[\d\s.:+\-TZ]*$/.test(node)) out.push({ key, text: node });
      return;
    }
    if (Array.isArray(node)) {
      node.forEach(item => collectFrontmatterProse(item, key, out));
      return;
    }
    if (node && typeof node === 'object' && !(node instanceof Date)) {
      Object.keys(node).forEach(k => collectFrontmatterProse(node[k], k, out));
    }
  }

  function checkFrontmatterProse(lines, fm, findings) {
    if (!fm.data) return;
    const prose = [];
    collectFrontmatterProse(fm.data, '', prose);

    const fmLines = lines.filter(l => l.region === 'fm');
    const resolves = buildIdentifierResolver(fm);

    // Locate a value's source line. Values arrive in document order, so the
    // search runs forward from the last hit (then, failing that, from the
    // top). A folded or wrapped value breaks across lines, so a shorter
    // prefix is tried when the longer one is not found on a single line.
    let cursor = 0;
    const locate = (key, text) => {
      const firstLine = text.split('\n')[0];
      for (const from of [cursor, 0]) {
        for (const length of [24, 12]) {
          const needle = firstLine.slice(0, length).trim();
          if (!needle) continue;
          const hits = [];
          for (let i = from; i < fmLines.length; i++) {
            if (fmLines[i].raw.includes(needle)) hits.push(i);
          }
          if (hits.length === 0) continue;
          // A full-length match on the line that names the key is the surest.
          const keyed = length === 24 ? hits.find(i => fmLines[i].raw.includes(key + ':')) : undefined;
          cursor = keyed !== undefined ? keyed : hits[0];
          return fmLines[cursor].idx;
        }
      }
      return fm.startLine;
    };
    const checkProse = (text, line) => {
      scanLexicalText(text, line, findings, {});
      checkInlineCodeIdentifiers(text, line, resolves, findings);
      scanHazards(text, line, findings);
    };

    prose.forEach(({ key, text }) => checkProse(text, locate(key, text)));

    // A YAML comment is not data, but it is text in the document a recipient
    // reads, and a YAML parser throws it away. Check it where it stands.
    fmLines.forEach(l => {
      const comment = yamlCommentOf(l.raw);
      if (comment.trim()) checkProse(comment, l.idx);
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
    r += `---\n\n*Report generated by Beyond CNL Linter v0.4 (envelope grammar)*\n`;
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
