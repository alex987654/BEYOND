(function () {
  const state = {
    textarea: null,
    editor: null,
    toolbar: null,
    suppressInput: false
  };

  function init() {
    state.textarea = document.getElementById('textInput');
    state.editor = document.getElementById('markdownEditor');
    state.toolbar = document.getElementById('markdownToolbar');

    if (!state.textarea || !state.editor) return;

    setMarkdown(state.textarea.value || '');

    state.editor.addEventListener('input', syncFromEditor);
    state.editor.addEventListener('blur', syncFromEditor);
    state.editor.addEventListener('paste', handlePaste);

    if (state.toolbar) {
      state.toolbar.addEventListener('click', handleToolbarClick);
    }
  }

  function setMarkdown(markdown) {
    if (!state.textarea || !state.editor) return;

    const normalized = normalizeMarkdown(markdown);
    state.suppressInput = true;
    state.textarea.value = normalized;
    state.editor.replaceChildren(markdownToFragment(normalized));
    state.suppressInput = false;
    updateEmptyState();
  }

  function getMarkdown() {
    if (!state.textarea || !state.editor) {
      return state.textarea ? state.textarea.value : '';
    }

    syncFromEditor();
    return state.textarea.value;
  }

  function syncFromEditor() {
    if (state.suppressInput || !state.textarea || !state.editor) return;

    state.textarea.value = serializeEditor();
    updateEmptyState();
  }

  function normalizeMarkdown(value) {
    return String(value || '').replace(/\r\n?/g, '\n');
  }

  function markdownToFragment(markdown) {
    const fragment = document.createDocumentFragment();
    if (!markdown) return fragment;

    const lines = normalizeMarkdown(markdown).split('\n');
    let i = 0;

    if (lines[0] && lines[0].trim() === '---') {
      let end = -1;
      for (let j = 1; j < lines.length; j += 1) {
        if (lines[j].trim() === '---') {
          end = j;
          break;
        }
      }

      if (end === -1) end = lines.length - 1;
      fragment.appendChild(createFrontmatter(lines.slice(0, end + 1).join('\n')));
      i = end + 1;
    }

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      if (!trimmed) {
        fragment.appendChild(createBlankLine());
        i += 1;
        continue;
      }

      const fence = line.match(/^```(.*)$/);
      if (fence) {
        const code = [];
        const info = fence[1].trim();
        i += 1;
        while (i < lines.length && !lines[i].match(/^```\s*$/)) {
          code.push(lines[i]);
          i += 1;
        }
        if (i < lines.length) i += 1;
        fragment.appendChild(createCodeBlock(code.join('\n'), info));
        continue;
      }

      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) {
        fragment.appendChild(createHeading(heading[1].length, heading[2]));
        i += 1;
        continue;
      }

      if (isHorizontalRule(line)) {
        const hr = document.createElement('hr');
        hr.dataset.mdBlock = 'hr';
        fragment.appendChild(hr);
        i += 1;
        continue;
      }

      if (isTableStart(lines, i)) {
        const tableLines = [lines[i]];
        i += 2;
        while (i < lines.length && looksLikeTableRow(lines[i])) {
          tableLines.push(lines[i]);
          i += 1;
        }
        fragment.appendChild(createTable(tableLines));
        continue;
      }

      if (isUnorderedListLine(line)) {
        const list = document.createElement('ul');
        list.dataset.mdBlock = 'ul';
        while (i < lines.length && isUnorderedListLine(lines[i])) {
          list.appendChild(createListItem(lines[i].replace(/^\s*[-*+]\s+/, '')));
          i += 1;
        }
        fragment.appendChild(list);
        continue;
      }

      if (isOrderedListLine(line)) {
        const list = document.createElement('ol');
        list.dataset.mdBlock = 'ol';
        while (i < lines.length && isOrderedListLine(lines[i])) {
          list.appendChild(createListItem(lines[i].replace(/^\s*\d+\.\s+/, '')));
          i += 1;
        }
        fragment.appendChild(list);
        continue;
      }

      if (/^\s*>\s?/.test(line)) {
        const quote = document.createElement('blockquote');
        quote.dataset.mdBlock = 'quote';
        while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
          const p = document.createElement('p');
          appendInline(p, lines[i].replace(/^\s*>\s?/, ''));
          quote.appendChild(p);
          i += 1;
        }
        fragment.appendChild(quote);
        continue;
      }

      fragment.appendChild(createParagraph(line));
      i += 1;
    }

    return fragment;
  }

  function createFrontmatter(text) {
    const pre = document.createElement('pre');
    pre.className = 'md-frontmatter';
    pre.dataset.mdBlock = 'frontmatter';
    pre.textContent = text;
    return pre;
  }

  function createCodeBlock(text, info) {
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    pre.className = 'md-codeblock';
    pre.dataset.mdBlock = 'code';
    pre.dataset.info = info || '';
    code.textContent = text;
    pre.appendChild(code);
    return pre;
  }

  function createHeading(level, text) {
    const heading = document.createElement(`h${Math.max(1, Math.min(level, 6))}`);
    heading.dataset.mdBlock = 'heading';
    appendInline(heading, text);
    return heading;
  }

  function createParagraph(text) {
    const p = document.createElement('p');
    p.dataset.mdBlock = 'paragraph';
    appendInline(p, text);
    return p;
  }

  function createBlankLine() {
    const div = document.createElement('div');
    div.className = 'md-blank';
    div.dataset.mdBlock = 'blank';
    div.appendChild(document.createElement('br'));
    return div;
  }

  function createListItem(text) {
    const li = document.createElement('li');
    appendInline(li, text);
    return li;
  }

  function createTable(tableLines) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const rows = tableLines.map(parseTableRow);

    table.dataset.mdBlock = 'table';
    rows.forEach((cells, rowIndex) => {
      const tr = document.createElement('tr');
      cells.forEach((cell) => {
        const cellEl = document.createElement(rowIndex === 0 ? 'th' : 'td');
        appendInline(cellEl, cell);
        tr.appendChild(cellEl);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
  }

  function appendInline(parent, text) {
    parent.appendChild(renderInline(text));
  }

  function renderInline(text) {
    const fragment = document.createDocumentFragment();
    let i = 0;

    while (i < text.length) {
      const codeEnd = text[i] === '`' ? text.indexOf('`', i + 1) : -1;
      if (codeEnd > i + 1) {
        const code = document.createElement('code');
        code.textContent = text.slice(i + 1, codeEnd);
        fragment.appendChild(code);
        i = codeEnd + 1;
        continue;
      }

      if (text.startsWith('**', i)) {
        const end = text.indexOf('**', i + 2);
        if (end > i + 2) {
          const strong = document.createElement('strong');
          strong.textContent = text.slice(i + 2, end);
          fragment.appendChild(strong);
          i = end + 2;
          continue;
        }
      }

      if (text[i] === '*') {
        const end = text.indexOf('*', i + 1);
        if (end > i + 1) {
          const em = document.createElement('em');
          em.textContent = text.slice(i + 1, end);
          fragment.appendChild(em);
          i = end + 1;
          continue;
        }
      }

      if (text[i] === '[') {
        const closeText = text.indexOf(']', i + 1);
        const openHref = closeText >= 0 ? text.indexOf('(', closeText) : -1;
        const closeHref = openHref >= 0 ? text.indexOf(')', openHref) : -1;
        if (closeText > i + 1 && openHref === closeText + 1 && closeHref > openHref + 1) {
          const link = document.createElement('a');
          link.href = safeHref(text.slice(openHref + 1, closeHref));
          link.textContent = text.slice(i + 1, closeText);
          fragment.appendChild(link);
          i = closeHref + 1;
          continue;
        }
      }

      const nextSpecial = findNextInlineSpecial(text, i + 1);
      fragment.appendChild(document.createTextNode(text.slice(i, nextSpecial)));
      i = nextSpecial;
    }

    return fragment;
  }

  function findNextInlineSpecial(text, start) {
    const candidates = ['`', '*', '[']
      .map((char) => text.indexOf(char, start))
      .filter((index) => index >= 0);
    return candidates.length ? Math.min(...candidates) : text.length;
  }

  function safeHref(href) {
    const value = href.trim();
    if (/^(https?:|mailto:|#|\/|\.\/|\.\.\/)/i.test(value)) return value;
    return '#';
  }

  function serializeEditor() {
    const blocks = [];

    state.editor.childNodes.forEach((node) => {
      const markdown = serializeBlock(node);
      if (markdown === null) return;
      if (Array.isArray(markdown)) {
        blocks.push(...markdown);
      } else {
        blocks.push(markdown);
      }
    });

    while (blocks.length && blocks[blocks.length - 1] === '') {
      blocks.pop();
    }

    return blocks.join('\n');
  }

  function serializeBlock(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.replace(/\u00a0/g, ' ');
      return text.trim() ? text : null;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    const el = node;
    const tag = el.tagName.toLowerCase();

    if (el.dataset.mdBlock === 'blank' || el.classList.contains('md-blank')) return '';
    if (el.dataset.mdBlock === 'frontmatter') return readEditableText(el);
    if (el.dataset.mdBlock === 'code') {
      const info = el.dataset.info ? el.dataset.info.trim() : '';
      const codeEl = el.querySelector('code') || el;
      const body = readEditableText(codeEl);
      return `\`\`\`${info}\n${body}\n\`\`\``;
    }
    if (el.dataset.mdBlock === 'hr' || tag === 'hr') return '---';

    if (/^h[1-6]$/.test(tag)) {
      const level = Number(tag.slice(1));
      return `${'#'.repeat(level)} ${serializeInline(el.childNodes).trim()}`;
    }

    if (tag === 'p') {
      return serializeInline(el.childNodes).trimEnd();
    }

    if (tag === 'blockquote') {
      const lines = [];
      el.childNodes.forEach((child) => {
        const text = serializeBlock(child);
        if (text === null) return;
        String(text).split('\n').forEach((line) => lines.push(`> ${line}`.trimEnd()));
      });
      return lines.length ? lines : ['>'];
    }

    if (tag === 'ul' || tag === 'ol') {
      const ordered = tag === 'ol';
      return Array.from(el.children)
        .filter((child) => child.tagName && child.tagName.toLowerCase() === 'li')
        .map((li, index) => `${ordered ? `${index + 1}.` : '-'} ${serializeInline(li.childNodes).trim()}`);
    }

    if (tag === 'li') {
      return serializeInline(el.childNodes).trim();
    }

    if (tag === 'table') {
      return serializeTable(el);
    }

    if (tag === 'div') {
      const text = serializeInline(el.childNodes).trimEnd();
      return text || null;
    }

    return serializeInline(el.childNodes).trimEnd();
  }

  function serializeInline(nodes) {
    return Array.from(nodes).map((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.replace(/\u00a0/g, ' ');
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return '';

      const el = node;
      const tag = el.tagName.toLowerCase();

      if (tag === 'br') return '\n';
      if (tag === 'strong' || tag === 'b') return `**${serializeInline(el.childNodes)}**`;
      if (tag === 'em' || tag === 'i') return `*${serializeInline(el.childNodes)}*`;
      if (tag === 'code') return `\`${readEditableText(el).replace(/`/g, '\\`')}\``;
      if (tag === 'a') {
        const href = el.getAttribute('href') || '';
        return `[${serializeInline(el.childNodes)}](${href})`;
      }
      if (tag === 'div' || tag === 'p') return serializeInline(el.childNodes);

      return serializeInline(el.childNodes);
    }).join('');
  }

  function serializeTable(table) {
    const rows = Array.from(table.querySelectorAll('tr')).map((row) => {
      const cells = Array.from(row.children).map((cell) => serializeInline(cell.childNodes).trim());
      return `| ${cells.join(' | ')} |`;
    });

    if (!rows.length) return null;

    const firstRowCells = rows[0].split('|').length - 2;
    const separator = `| ${Array.from({ length: Math.max(firstRowCells, 1) }, () => '---').join(' | ')} |`;
    return [rows[0], separator, ...rows.slice(1)].join('\n');
  }

  function readEditableText(el) {
    return (el.innerText || el.textContent || '')
      .replace(/\r\n?/g, '\n')
      .replace(/\n$/, '');
  }

  function handlePaste(event) {
    if (!state.editor) return;

    const text = event.clipboardData ? event.clipboardData.getData('text/plain') : '';
    if (!text) return;

    event.preventDefault();

    if (isEditorEmpty() || selectionCoversEditor()) {
      setMarkdown(text);
      placeCaretAtEnd(state.editor);
      return;
    }

    insertTextAtSelection(text);
    syncFromEditor();
  }

  function handleToolbarClick(event) {
    const button = event.target.closest('[data-md-command]');
    if (!button || !state.editor) return;

    event.preventDefault();
    state.editor.focus();

    const command = button.dataset.mdCommand;
    if (command === 'heading') document.execCommand('formatBlock', false, 'h2');
    if (command === 'bold') document.execCommand('bold');
    if (command === 'italic') document.execCommand('italic');
    if (command === 'unordered') document.execCommand('insertUnorderedList');
    if (command === 'ordered') document.execCommand('insertOrderedList');
    if (command === 'quote') document.execCommand('formatBlock', false, 'blockquote');
    if (command === 'code') wrapSelectionInCode();
    if (command === 'link') createLinkFromSelection();

    syncFromEditor();
  }

  function wrapSelectionInCode() {
    const range = getEditorSelectionRange();
    if (!range) return;

    const selected = range.toString();
    const code = document.createElement('code');
    code.textContent = selected || 'code';
    range.deleteContents();
    range.insertNode(code);
    moveCaretAfter(code);
  }

  function createLinkFromSelection() {
    const href = window.prompt('URL');
    if (!href) return;

    const range = getEditorSelectionRange();
    if (!range) return;

    const link = document.createElement('a');
    link.href = safeHref(href);
    link.textContent = range.toString() || href;
    range.deleteContents();
    range.insertNode(link);
    moveCaretAfter(link);
  }

  function insertTextAtSelection(text) {
    const range = getEditorSelectionRange();
    if (!range) return;

    const fragment = document.createDocumentFragment();
    normalizeMarkdown(text).split('\n').forEach((line, index) => {
      if (index > 0) fragment.appendChild(document.createElement('br'));
      fragment.appendChild(document.createTextNode(line));
    });

    range.deleteContents();
    range.insertNode(fragment);
    placeCaretAtEnd(state.editor);
  }

  function getEditorSelectionRange() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !state.editor.contains(selection.anchorNode)) {
      state.editor.focus();
      placeCaretAtEnd(state.editor);
    }

    const refreshedSelection = window.getSelection();
    if (!refreshedSelection || refreshedSelection.rangeCount === 0) return null;
    return refreshedSelection.getRangeAt(0);
  }

  function selectionCoversEditor() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !state.editor.contains(selection.anchorNode)) return false;

    const selectedText = selection.toString().trim();
    const editorText = state.editor.innerText.trim();
    return Boolean(editorText && selectedText && selectedText.length >= editorText.length);
  }

  function isEditorEmpty() {
    return !state.editor.textContent.trim();
  }

  function updateEmptyState() {
    if (!state.editor) return;
    state.editor.dataset.empty = isEditorEmpty() ? 'true' : 'false';
  }

  function placeCaretAtEnd(el) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function moveCaretAfter(node) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStartAfter(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function isHorizontalRule(line) {
    return /^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/.test(line);
  }

  function isUnorderedListLine(line) {
    return /^\s*[-*+]\s+/.test(line);
  }

  function isOrderedListLine(line) {
    return /^\s*\d+\.\s+/.test(line);
  }

  function looksLikeTableRow(line) {
    return line.includes('|') && line.trim().length > 1;
  }

  function isTableStart(lines, index) {
    return looksLikeTableRow(lines[index] || '') && isTableSeparator(lines[index + 1] || '');
  }

  function isTableSeparator(line) {
    return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
  }

  function parseTableRow(line) {
    return line.trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim());
  }

  window.BeyondMarkdownEditor = {
    init,
    setMarkdown,
    getMarkdown,
    sync: syncFromEditor
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
