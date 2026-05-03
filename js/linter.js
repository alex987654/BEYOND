/**
 * Beyond CNL Linter Engine
 * Grammar and Lexicon Checker for Beyond CNL documents
 */

const BeyondLinter = (() => {

  // Severity levels
  const SEVERITY = {
    ERROR: 'error',      // Document fails — must fix
    WARNING: 'warning',  // Likely violation — review needed
    INFO: 'info'         // Structural note
  };

  // ===== LAYER 1: LEXICON CHECK =====
  // Two-pass: (1) check for explicitly banned words, (2) check all words against whitelist

  function checkLexicon(text) {
    const findings = [];

    // Strip code blocks, inline code, and frontmatter before checking
    const stripped = stripCodeBlocks(text);

    // Track words already flagged as banned to avoid double-reporting
    const bannedPositions = new Set();

    // --- Pass 1: Multi-word banned patterns ---
    BeyondLexicon.MULTI_WORD_BANNED.forEach(({ pattern, category, reason }) => {
      let match;
      const re = new RegExp(pattern.source, pattern.flags);
      while ((match = re.exec(stripped)) !== null) {
        findings.push({
          layer: 1,
          severity: SEVERITY.ERROR,
          category,
          word: match[0],
          position: match.index,
          line: getLineNumber(stripped, match.index),
          reason,
          rule: 'LEXICON-MULTI'
        });
        // Mark all positions in this match as covered
        for (let i = match.index; i < match.index + match[0].length; i++) {
          bannedPositions.add(i);
        }
      }
    });

    // --- Pass 2: Individual word check (banned + whitelist) ---
    const wordPattern = /\b[a-zA-Z]['a-zA-Z]*\b/g;
    let match;
    while ((match = wordPattern.exec(stripped)) !== null) {
      const word = match[0];
      const lower = word.toLowerCase();

      // Skip single letters, numbers-adjacent tokens, TECHNAME placeholders
      if (lower.length <= 1 && lower !== 'a') continue;
      if (lower === 'techname') continue;

      // Skip if already covered by multi-word pattern
      if (bannedPositions.has(match.index)) continue;

      const result = BeyondLexicon.checkWord(lower);

      if (result.status === 'banned') {
        result.details.forEach(v => {
          findings.push({
            layer: 1,
            severity: SEVERITY.ERROR,
            category: v.category,
            word: word,
            position: match.index,
            line: getLineNumber(stripped, match.index),
            reason: v.reason,
            rule: 'LEXICON-BANNED'
          });
        });
      } else if (result.status === 'unlisted') {
        const hint = result.hint;
        findings.push({
          layer: 1,
          severity: SEVERITY.WARNING,
          category: 'Word not in lexicon',
          word: word,
          position: match.index,
          line: getLineNumber(stripped, match.index),
          reason: hint
            ? `"${lower}" — ${hint}`
            : `"${lower}" not found in the Beyond CNL approved vocabulary (~2,187 words). If domain-specific, register as a Technical Name in frontmatter.`,
          rule: 'LEXICON-WHITELIST'
        });
      }
      // status === 'approved' → no finding
    }

    // --- Pass 3: Punctuation checks ---
    let excl;
    const exclPattern = /!/g;
    while ((excl = exclPattern.exec(stripped)) !== null) {
      findings.push({
        layer: 1,
        severity: SEVERITY.ERROR,
        category: 'Exclamation mark',
        word: '!',
        position: excl.index,
        line: getLineNumber(stripped, excl.index),
        reason: 'Affect disclosure — exclamation marks banned as interjection/affect markers',
        rule: 'LEXICON-PUNCT'
      });
    }

    let qm;
    const qmPattern = /\?/g;
    while ((qm = qmPattern.exec(stripped)) !== null) {
      findings.push({
        layer: 1,
        severity: SEVERITY.WARNING,
        category: 'Question mark',
        word: '?',
        position: qm.index,
        line: getLineNumber(stripped, qm.index),
        reason: 'Questions may leak cognitive architecture — verify this appears in a procedural context only',
        rule: 'LEXICON-PUNCT'
      });
    }

    return findings;
  }

  // ===== LAYER 2: GRAMMAR CHECK =====

  function checkGrammar(text) {
    const findings = [];
    const sentences = extractSentences(text);

    sentences.forEach((sentence, idx) => {
      // Skip headings and very short fragments
      if (sentence.isHeading || sentence.text.trim().length < 5) return;

      // Check sentence length
      // Use blockType for more accurate classification:
      // list-items are procedural (20 words), everything else (25 words)
      const words = sentence.text.split(/\s+/).filter(w => w.length > 0);
      const isProcedure = sentence.blockType === 'list-item' || /\(procedure/.test(sentence.text);
      const maxWords = isProcedure ? 20 : 25;

      if (words.length > maxWords) {
        findings.push({
          layer: 2,
          severity: SEVERITY.WARNING,
          category: 'Sentence length',
          word: `${words.length} words`,
          position: sentence.position,
          line: sentence.line,
          reason: `Sentence exceeds ${maxWords}-word limit for ${isProcedure ? 'procedures' : 'observations'}. Consider splitting.`,
          rule: 'GRAM-LENGTH'
        });
      }

      // Check for passive voice with copula (common missed pattern)
      if (/\b(?:was|were|been|being)\s+\w+ed\b/i.test(sentence.text)) {
        findings.push({
          layer: 2,
          severity: SEVERITY.ERROR,
          category: 'Passive copula construction',
          word: sentence.text.match(/\b(?:was|were|been|being)\s+\w+ed\b/i)[0],
          position: sentence.position,
          line: sentence.line,
          reason: 'Copula-based passive construction — restructure as active voice with instrument/agent subject',
          rule: 'GRAM-PASSIVE'
        });
      }

      // Check for "there is/are" existential
      if (/\bthere\s+(?:is|are|was|were|exist|exists)\b/i.test(sentence.text)) {
        findings.push({
          layer: 2,
          severity: SEVERITY.ERROR,
          category: 'Existential construction',
          word: sentence.text.match(/\bthere\s+(?:is|are|was|were|exist|exists)\b/i)[0],
          position: sentence.position,
          line: sentence.line,
          reason: 'Existential copula construction — restructure as observation with source',
          rule: 'GRAM-EXIST'
        });
      }
    });

    return findings;
  }

  // ===== LAYER 3: EVIDENTIAL CHECK =====

  function checkEvidentials(text) {
    const findings = [];
    const sentences = extractSentences(text);

    // Detect whether document has ANY E-tags at all
    const hasAnyEtags = /\([^)]*(?:observed|detected|registered|measured|sampled|derived|calculated|follows|reported|cited|replicated|defined|stipulated|specified|procedure)[^)]*\)/.test(text);

    // Count declarative content (non-heading, non-blank, non-short)
    const declarativeSentences = sentences.filter(s =>
      !s.isHeading && !s.isFrontmatter && s.text.trim().length >= 5
    );

    // If document has declarative content but zero E-tags, flag up front
    if (declarativeSentences.length > 0 && !hasAnyEtags) {
      findings.push({
        layer: 3,
        severity: SEVERITY.WARNING,
        category: 'No evidential tags found',
        word: `0 E-tags in ${declarativeSentences.length} clauses`,
        position: 0,
        line: 0,
        reason: 'This document contains no Beyond CNL evidential tags. It may not be a Beyond CNL document, or it requires complete evidential marking. Every declarative clause needs an E-tag: (observed, ...), (measured, ...), (derived, ...), (reported, ...), (defined), or (procedure).',
        rule: 'EVID-NONE'
      });
    }

    let taggedCount = 0;
    let declarativeCount = 0;

    declarativeSentences.forEach((sentence) => {
      declarativeCount++;

      // Check for E-tag presence
      const etagMatch = sentence.text.match(/\(([^)]+)\)\s*\.?\s*$/);

      if (!etagMatch) {
        // Only report individual missing E-tags if the document uses E-tags elsewhere
        // (avoids flooding the report when the entire document is plain text)
        if (hasAnyEtags) {
          findings.push({
            layer: 3,
            severity: SEVERITY.ERROR,
            category: 'Missing E-tag',
            word: sentence.text.substring(0, 60) + (sentence.text.length > 60 ? '...' : ''),
            position: sentence.position,
            line: sentence.line,
            reason: 'Every declarative clause must carry an evidential tag in final parenthetical position',
            rule: 'EVID-MISSING'
          });
        }
      } else {
        taggedCount++;

        // Validate the E-tag content
        const tagContent = etagMatch[1];
        const validation = BeyondLexicon.validateEtag(tagContent);

        if (!validation.valid) {
          validation.issues.forEach(issue => {
            findings.push({
              layer: 3,
              severity: SEVERITY.ERROR,
              category: 'Malformed E-tag',
              word: `(${tagContent})`,
              position: sentence.position,
              line: sentence.line,
              reason: issue,
              rule: 'EVID-MALFORMED'
            });
          });
        }

        // E-MSR: check for numeric value in clause
        if (validation.type && validation.type.code === 'E-MSR') {
          if (!/\d/.test(sentence.text.replace(etagMatch[0], ''))) {
            findings.push({
              layer: 3,
              severity: SEVERITY.WARNING,
              category: 'E-MSR without numeric',
              word: `(${tagContent})`,
              position: sentence.position,
              line: sentence.line,
              reason: 'E-MSR (measurement) clause should contain at least one numerical value with a unit',
              rule: 'EVID-MSR-NUM'
            });
          }
        }

        // Block-register constraint check:
        // blockquotes should use E-OBS/E-MSR, list-items should use E-PRO
        if (validation.valid && validation.type && sentence.blockType) {
          const etagVerb = tagContent.split(/[\s,]/)[0].toLowerCase();

          if (sentence.blockType === 'blockquote') {
            const obsVerbs = ['observed', 'detected', 'registered', 'measured', 'sampled'];
            if (!obsVerbs.includes(etagVerb)) {
              findings.push({
                layer: 3,
                severity: SEVERITY.WARNING,
                category: 'Register mismatch',
                word: `(${tagContent}) in blockquote`,
                position: sentence.position,
                line: sentence.line,
                reason: `Blockquotes use observation register. Expected E-OBS or E-MSR tag, found "${etagVerb}".`,
                rule: 'EVID-REGISTER'
              });
            }
          }

          if (sentence.blockType === 'list-item') {
            if (etagVerb !== 'procedure') {
              findings.push({
                layer: 3,
                severity: SEVERITY.WARNING,
                category: 'Register mismatch',
                word: `(${tagContent}) in ordered list`,
                position: sentence.position,
                line: sentence.line,
                reason: `Ordered list items use procedure register. Expected E-PRO tag, found "${etagVerb}".`,
                rule: 'EVID-REGISTER'
              });
            }
          }
        }
      }

      // Check compound sentences for multiple E-tags
      const independentClauses = sentence.text.split(/,\s*(?:and|or|but|so)\s+/);
      if (independentClauses.length > 1) {
        const tagCount = (sentence.text.match(/\([^)]*(?:observed|detected|registered|measured|sampled|derived|calculated|follows|reported|cited|replicated|defined|stipulated|specified|procedure)[^)]*\)/g) || []).length;
        if (tagCount < independentClauses.length) {
          findings.push({
            layer: 3,
            severity: SEVERITY.WARNING,
            category: 'Compound clause E-tag count',
            word: `${tagCount} tags for ${independentClauses.length} clauses`,
            position: sentence.position,
            line: sentence.line,
            reason: `Compound sentence with ${independentClauses.length} independent clauses should have ${independentClauses.length} E-tags (found ${tagCount})`,
            rule: 'EVID-COMPOUND'
          });
        }
      }
    });

    // Add coverage metric
    if (declarativeCount > 0) {
      const coverage = taggedCount / declarativeCount;
      findings.push({
        layer: 3,
        severity: coverage < 1.0 ? SEVERITY.ERROR : SEVERITY.INFO,
        category: 'Evidential coverage',
        word: `${(coverage * 100).toFixed(1)}%`,
        position: 0,
        line: 0,
        reason: `${taggedCount} of ${declarativeCount} declarative clauses carry E-tags. Required: 100%`,
        rule: 'EVID-COVERAGE'
      });
    }

    return findings;
  }

  // ===== LAYER 4: MARKDOWN STRUCTURE CHECK =====

  function checkStructure(text) {
    const findings = [];
    const lines = text.split('\n');

    // Check for YAML frontmatter
    const hasFrontmatter = text.trimStart().startsWith('---');
    if (!hasFrontmatter) {
      findings.push({
        layer: 4,
        severity: SEVERITY.WARNING,
        category: 'Missing frontmatter',
        word: '---',
        position: 0,
        line: 1,
        reason: 'Beyond CNL documents should begin with YAML frontmatter declaring instruments, references, technical names, and conditions',
        rule: 'STRUCT-FRONT'
      });
    } else {
      // Parse frontmatter
      const frontEnd = text.indexOf('---', 3);
      if (frontEnd > 0) {
        const frontmatter = text.substring(3, frontEnd).trim();

        // Check required fields
        if (!/\bschema:\s*beyond-cnl/i.test(frontmatter)) {
          findings.push({
            layer: 4,
            severity: SEVERITY.WARNING,
            category: 'Missing schema declaration',
            word: 'schema:',
            position: 0,
            line: 1,
            reason: 'Frontmatter should declare schema: beyond-cnl-v0.3',
            rule: 'STRUCT-SCHEMA'
          });
        }

        if (!/\bpurpose:/i.test(frontmatter)) {
          findings.push({
            layer: 4,
            severity: SEVERITY.WARNING,
            category: 'Missing purpose',
            word: 'purpose:',
            position: 0,
            line: 1,
            reason: 'Frontmatter should declare a narrow procedural purpose statement',
            rule: 'STRUCT-PURPOSE'
          });
        }

        if (!/\bphase:/i.test(frontmatter)) {
          findings.push({
            layer: 4,
            severity: SEVERITY.INFO,
            category: 'Missing phase',
            word: 'phase:',
            position: 0,
            line: 1,
            reason: 'Frontmatter may declare protocol phase: Discovery | Validation | Characterization | Open-Contact | Negotiation',
            rule: 'STRUCT-PHASE'
          });
        } else {
          // Validate phase value
          const phaseMatch = frontmatter.match(/\bphase:\s*(.+)/i);
          if (phaseMatch) {
            const phase = phaseMatch[1].trim();
            if (!BeyondLexicon.PHASES.includes(phase)) {
              findings.push({
                layer: 4,
                severity: SEVERITY.ERROR,
                category: 'Invalid phase',
                word: phase,
                position: 0,
                line: 1,
                reason: `Phase must be one of: ${BeyondLexicon.PHASES.join(', ')}`,
                rule: 'STRUCT-PHASE-VAL'
              });
            }
          }
        }
      }
    }

    // Check Markdown heading hierarchy
    let lastHeadingLevel = 0;
    lines.forEach((line, idx) => {
      const headingMatch = line.match(/^(#{1,6})\s/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        if (level > lastHeadingLevel + 1 && lastHeadingLevel > 0) {
          findings.push({
            layer: 4,
            severity: SEVERITY.WARNING,
            category: 'Heading level skip',
            word: line.trim(),
            position: 0,
            line: idx + 1,
            reason: `Heading jumps from H${lastHeadingLevel} to H${level}. Maintain sequential heading hierarchy.`,
            rule: 'STRUCT-HEADING'
          });
        }
        lastHeadingLevel = level;
      }
    });

    // Check for forbidden HTML elements
    const htmlPattern = /<(?:script|style|iframe|embed|object|form|input|button|select|textarea)\b/gi;
    let htmlMatch;
    while ((htmlMatch = htmlPattern.exec(text)) !== null) {
      findings.push({
        layer: 4,
        severity: SEVERITY.ERROR,
        category: 'Forbidden HTML element',
        word: htmlMatch[0],
        position: htmlMatch.index,
        line: getLineNumber(text, htmlMatch.index),
        reason: 'Interactive/executable HTML elements are forbidden in Beyond CNL documents',
        rule: 'STRUCT-HTML'
      });
    }

    return findings;
  }

  // ===== LAYER 5: INFORMATION HAZARD SCAN =====

  function checkHazards(text) {
    const findings = [];
    const stripped = stripCodeBlocks(text);

    // Check for location-revealing patterns
    const locationPatterns = [
      { pattern: /\b(?:Earth|Terra|Sol|Milky\s+Way|solar\s+system)\b/gi, hazard: 'Location disclosure' },
      { pattern: /\b(?:latitude|longitude|GPS|coordinates)\b/gi, hazard: 'Location disclosure' },
      { pattern: /\b(?:America|Europe|Asia|Africa|Australia|Antarctica)\b/gi, hazard: 'Location disclosure' },
    ];

    locationPatterns.forEach(({ pattern, hazard }) => {
      let match;
      while ((match = pattern.exec(stripped)) !== null) {
        findings.push({
          layer: 5,
          severity: SEVERITY.WARNING,
          category: hazard,
          word: match[0],
          position: match.index,
          line: getLineNumber(stripped, match.index),
          reason: `Potential location disclosure: "${match[0]}". Review whether this reveals sender position.`,
          rule: 'HAZARD-LOCATION'
        });
      }
    });

    // Check for capability-revealing patterns
    const capabilityPatterns = [
      { pattern: /\b(?:our\s+(?:technology|capability|weapons|defense|military|power))\b/gi, hazard: 'Capability disclosure' },
      { pattern: /\b(?:we\s+(?:can|have|possess|developed|created|built|achieved))\b/gi, hazard: 'Capability disclosure' },
    ];

    capabilityPatterns.forEach(({ pattern, hazard }) => {
      let match;
      while ((match = pattern.exec(stripped)) !== null) {
        findings.push({
          layer: 5,
          severity: SEVERITY.WARNING,
          category: hazard,
          word: match[0],
          position: match.index,
          line: getLineNumber(stripped, match.index),
          reason: `Potential capability disclosure: "${match[0]}". Review whether this reveals sender capabilities beyond what the protocol requires.`,
          rule: 'HAZARD-CAPABILITY'
        });
      }
    });

    // Check for proper nouns (capitalized words not at sentence start, not in headings)
    const lines = stripped.split('\n');
    lines.forEach((line, lineIdx) => {
      if (line.startsWith('#') || line.trim().length === 0) return;

      // Find capitalized words mid-sentence
      const midCapPattern = /(?<=\s)[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*/g;
      let match;
      while ((match = midCapPattern.exec(line)) !== null) {
        // Skip if it looks like a Technical Name in backticks
        const beforeChar = line[match.index - 1] || '';
        if (beforeChar === '`') continue;

        // Skip common sentence starters after periods
        const before = line.substring(0, match.index);
        if (/[.!?]\s+$/.test(before)) continue;

        findings.push({
          layer: 5,
          severity: SEVERITY.INFO,
          category: 'Possible proper noun',
          word: match[0],
          position: 0,
          line: lineIdx + 1,
          reason: `"${match[0]}" appears to be a proper noun. Proper nouns of groups, places, or identities are banned. Technical Names must appear in backticks after definition.`,
          rule: 'HAZARD-PROPERNOUN'
        });
      }
    });

    return findings;
  }

  // ===== UTILITY FUNCTIONS =====

  function stripCodeBlocks(text) {
    // Remove YAML frontmatter
    let stripped = text.replace(/^---[\s\S]*?---/m, '');
    // Remove fenced code blocks
    stripped = stripped.replace(/```[\s\S]*?```/g, '');
    // Remove inline code
    stripped = stripped.replace(/`[^`]+`/g, ' TECHNAME ');
    return stripped;
  }

  function getLineNumber(text, position) {
    return text.substring(0, position).split('\n').length;
  }

  function extractSentences(text) {
    const sentences = [];

    // Phase 1: Remove frontmatter and fenced code blocks, tracking line offsets
    const stripped = stripFrontmatterAndCode(text);

    // Phase 2: Parse into blocks (heading, blockquote, list-item, paragraph)
    const blocks = parseBlocks(stripped.text);

    // Phase 3: Detect whether document uses E-tags at all
    const hasAnyEtags = /\([^)]*(?:observed|detected|registered|measured|sampled|derived|calculated|follows|reported|cited|replicated|defined|stipulated|specified|procedure)[^)]*\)/.test(stripped.text);

    // Phase 4: Split each block into sentences
    blocks.forEach(block => {
      if (block.type === 'heading' || block.type === 'blank') {
        sentences.push({
          text: block.content.trim(),
          position: block.offset,
          line: block.line,
          isHeading: block.type === 'heading',
          isFrontmatter: false,
          blockType: block.type
        });
        return;
      }

      const blockSentences = splitBlockIntoSentences(
        block.content, block.line, block.offset, hasAnyEtags
      );

      blockSentences.forEach(s => {
        sentences.push({
          ...s,
          isHeading: false,
          isFrontmatter: false,
          blockType: block.type
        });
      });
    });

    return sentences;
  }

  /**
   * Strip frontmatter and fenced code blocks, returning cleaned text
   * and preserving line numbers via blank-line placeholders.
   */
  function stripFrontmatterAndCode(text) {
    let result = text;

    // Replace YAML frontmatter with blank lines (preserve line count)
    result = result.replace(/^---[\s\S]*?---/m, (match) => {
      return match.split('\n').map(() => '').join('\n');
    });

    // Replace fenced code blocks with blank lines
    result = result.replace(/```[\s\S]*?```/g, (match) => {
      return match.split('\n').map(() => '').join('\n');
    });

    // Replace inline code with TECHNAME placeholder (preserve position)
    result = result.replace(/`[^`]+`/g, ' TECHNAME ');

    return { text: result };
  }

  /**
   * Parse text into typed blocks.
   * Handles: headings, blockquotes, ordered list items, paragraphs, blanks.
   */
  function parseBlocks(text) {
    const lines = text.split('\n');
    const blocks = [];
    let currentBlock = null;
    let charOffset = 0;

    function flushBlock() {
      if (currentBlock && currentBlock.content.trim()) {
        blocks.push(currentBlock);
      }
      currentBlock = null;
    }

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      const lineNum = idx + 1;

      // Blank line — flush current block
      if (trimmed.length === 0) {
        flushBlock();
        charOffset += line.length + 1;
        return;
      }

      // Heading
      if (/^#{1,6}\s/.test(trimmed)) {
        flushBlock();
        blocks.push({
          type: 'heading',
          content: trimmed,
          line: lineNum,
          offset: charOffset
        });
        charOffset += line.length + 1;
        return;
      }

      // Blockquote line (starts with >)
      if (/^>\s?/.test(trimmed)) {
        const content = trimmed.replace(/^>\s?/, '');
        if (currentBlock && currentBlock.type === 'blockquote') {
          currentBlock.content += ' ' + content;
        } else {
          flushBlock();
          currentBlock = {
            type: 'blockquote',
            content: content,
            line: lineNum,
            offset: charOffset
          };
        }
        charOffset += line.length + 1;
        return;
      }

      // Ordered list item (starts with digit+period)
      if (/^\d+\.\s/.test(trimmed)) {
        flushBlock();
        currentBlock = {
          type: 'list-item',
          content: trimmed.replace(/^\d+\.\s/, ''),
          line: lineNum,
          offset: charOffset
        };
        charOffset += line.length + 1;
        return;
      }

      // Continuation line — append to current block or start new paragraph
      if (currentBlock && (currentBlock.type === 'list-item' || currentBlock.type === 'blockquote')) {
        // Indented continuation of list item or blockquote
        if (/^\s{2,}/.test(line) || currentBlock.type === 'blockquote') {
          currentBlock.content += ' ' + trimmed;
          charOffset += line.length + 1;
          return;
        }
      }

      // Paragraph line
      if (currentBlock && currentBlock.type === 'paragraph') {
        currentBlock.content += ' ' + trimmed;
      } else {
        flushBlock();
        currentBlock = {
          type: 'paragraph',
          content: trimmed,
          line: lineNum,
          offset: charOffset
        };
      }

      charOffset += line.length + 1;
    });

    flushBlock();
    return blocks;
  }

  /**
   * Split a block's content into individual sentences.
   * Uses E-tag boundaries as primary split points when available,
   * falls back to period-splitting for plain text.
   */
  function splitBlockIntoSentences(content, startLine, startOffset, hasEtags) {
    const sentences = [];
    const text = content.trim();
    if (!text) return sentences;

    if (hasEtags) {
      // E-tag-aware splitting:
      // Split on the pattern: closing-paren + period, optionally followed by space/newline
      // This catches "(measured, instrument `RX-4`). The next sentence..."
      // and "(procedure, step 1)." at end of block

      // Match E-tag closings: ")." or "), and" compound boundaries
      const etagEndPattern = /\)\.\s*/g;
      let lastEnd = 0;
      let match;

      while ((match = etagEndPattern.exec(text)) !== null) {
        const sentenceText = text.substring(lastEnd, match.index + 2).trim(); // include ")."
        if (sentenceText.length > 0) {
          sentences.push({
            text: sentenceText,
            position: startOffset + lastEnd,
            line: startLine
          });
        }
        lastEnd = match.index + match[0].length;
      }

      // Remaining text after last E-tag (may be a sentence without E-tag)
      const remainder = text.substring(lastEnd).trim();
      if (remainder.length > 0) {
        // Check if this remainder itself contains sentences (period-split)
        const fallbackSentences = periodSplit(remainder, startOffset + lastEnd, startLine);
        sentences.push(...fallbackSentences);
      }
    } else {
      // No E-tags in document — fall back to period-splitting
      const fallbackSentences = periodSplit(text, startOffset, startLine);
      sentences.push(...fallbackSentences);
    }

    return sentences;
  }

  /**
   * Fallback sentence splitting on period+space boundaries.
   * Used when no E-tags are present in the document.
   */
  function periodSplit(text, startOffset, startLine) {
    const sentences = [];
    // Split on period/exclamation/question followed by space or end
    // But not on decimal numbers (digit.digit) or abbreviations
    const parts = text.split(/(?<=[.!?])(?:\s+|$)/);
    let offset = 0;

    parts.forEach(part => {
      const trimmed = part.trim();
      if (trimmed.length > 0) {
        sentences.push({
          text: trimmed,
          position: startOffset + offset,
          line: startLine
        });
      }
      offset += part.length + 1;
    });

    return sentences;
  }

  // ===== MAIN LINT FUNCTION =====

  function lint(text) {
    const startTime = performance.now();

    const findings = [
      ...checkLexicon(text),
      ...checkGrammar(text),
      ...checkEvidentials(text),
      ...checkStructure(text),
      ...checkHazards(text)
    ];

    // Sort by line number, then severity
    const severityOrder = { error: 0, warning: 1, info: 2 };
    findings.sort((a, b) => {
      if (a.line !== b.line) return a.line - b.line;
      return severityOrder[a.severity] - severityOrder[b.severity];
    });

    const elapsed = performance.now() - startTime;

    // Build summary
    const summary = {
      totalFindings: findings.length,
      errors: findings.filter(f => f.severity === SEVERITY.ERROR).length,
      warnings: findings.filter(f => f.severity === SEVERITY.WARNING).length,
      info: findings.filter(f => f.severity === SEVERITY.INFO).length,
      byLayer: {
        1: findings.filter(f => f.layer === 1).length,
        2: findings.filter(f => f.layer === 2).length,
        3: findings.filter(f => f.layer === 3).length,
        4: findings.filter(f => f.layer === 4).length,
        5: findings.filter(f => f.layer === 5).length
      },
      byCategory: {},
      elapsedMs: elapsed.toFixed(1),
      compliant: findings.filter(f => f.severity === SEVERITY.ERROR).length === 0
    };

    // Count by category
    findings.forEach(f => {
      summary.byCategory[f.category] = (summary.byCategory[f.category] || 0) + 1;
    });

    return { findings, summary };
  }

  // ===== REPORT GENERATION =====

  function generateMarkdownReport(text, results) {
    const { findings, summary } = results;
    const now = new Date().toISOString();

    let report = `# Beyond CNL Lint Report\n\n`;
    report += `**Generated:** ${now}\n`;
    report += `**Status:** ${summary.compliant ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}\n`;
    report += `**Analysis time:** ${summary.elapsedMs}ms\n\n`;

    report += `## Summary\n\n`;
    report += `| Metric | Count |\n|---|---|\n`;
    report += `| Errors | ${summary.errors} |\n`;
    report += `| Warnings | ${summary.warnings} |\n`;
    report += `| Info | ${summary.info} |\n`;
    report += `| Total findings | ${summary.totalFindings} |\n\n`;

    report += `### By Enforcement Layer\n\n`;
    report += `| Layer | Name | Findings |\n|---|---|---|\n`;
    report += `| 1 | Lexicon | ${summary.byLayer[1]} |\n`;
    report += `| 2 | Grammar | ${summary.byLayer[2]} |\n`;
    report += `| 3 | Evidential | ${summary.byLayer[3]} |\n`;
    report += `| 4 | Markdown structure | ${summary.byLayer[4]} |\n`;
    report += `| 5 | Information hazard | ${summary.byLayer[5]} |\n\n`;

    if (Object.keys(summary.byCategory).length > 0) {
      report += `### By Category\n\n`;
      report += `| Category | Count |\n|---|---|\n`;
      Object.entries(summary.byCategory)
        .sort((a, b) => b[1] - a[1])
        .forEach(([cat, count]) => {
          report += `| ${cat} | ${count} |\n`;
        });
      report += `\n`;
    }

    if (findings.length > 0) {
      report += `## Detailed Findings\n\n`;

      findings.forEach((f, idx) => {
        const icon = f.severity === 'error' ? '🔴' : f.severity === 'warning' ? '🟡' : '🔵';
        report += `### ${icon} Finding ${idx + 1} (Line ${f.line})\n\n`;
        report += `- **Severity:** ${f.severity.toUpperCase()}\n`;
        report += `- **Layer:** ${f.layer} — ${['', 'Lexicon', 'Grammar', 'Evidential', 'Markdown structure', 'Information hazard'][f.layer]}\n`;
        report += `- **Category:** ${f.category}\n`;
        report += `- **Flagged:** \`${f.word}\`\n`;
        report += `- **Rule:** ${f.rule}\n`;
        report += `- **Reason:** ${f.reason}\n\n`;
      });
    }

    report += `---\n\n*Report generated by Beyond CNL Linter v0.2*\n`;

    return report;
  }

  // ===== PUBLIC API =====

  return {
    lint,
    generateMarkdownReport,
    SEVERITY,
    checkLexicon,
    checkGrammar,
    checkEvidentials,
    checkStructure,
    checkHazards
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BeyondLinter;
}
