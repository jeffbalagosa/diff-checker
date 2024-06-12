document.getElementById("compareButton")?.addEventListener("click", () => {
  const originalText = (
    document.getElementById("original") as HTMLTextAreaElement
  ).value;
  const changedText = (
    document.getElementById("changed") as HTMLTextAreaElement
  ).value;

  const result = compareTexts(originalText, changedText);
  document.getElementById("results")!.innerHTML = result;

  addClickListeners();
});

function trimWhitespace(str: string): string {
  return str.replace(/^\s+|\s+$/g, "");
}

function compareTexts(original: string, changed: string): string {
  const originalLines = trimWhitespace(original).split("\n");
  const changedLines = trimWhitespace(changed).split("\n");

  // Even out the lengths of the original and changed lines
  const maxLength = Math.max(originalLines.length, changedLines.length);
  while (originalLines.length < maxLength) {
    originalLines.push("");
  }
  while (changedLines.length < maxLength) {
    changedLines.push("");
  }

  let addedLines = 0;
  let removedLines = 0;

  const originalHighlighted = highlightBlocks(originalLines, changedLines, "original-line", "rgba(245,61,61,.4)");
  const changedHighlighted = highlightBlocks(changedLines, originalLines, "changed-line", "rgba(0,194,129,.4)");

  return `
        <div id="original-result">
            <h3>Original Text</h3>
            <span style="color: red;"><strong>${removedLines}</strong> removals<br></span>
            <div class="border">
            <pre>${originalHighlighted}</pre>
            </div>
        </div>
        <div id="changed-result">
            <h3>Changed Text</h3>
            <span style="color: green;"><strong>${addedLines}</strong> additions<br></span>
            <div class="border">
            <pre>${changedHighlighted}</pre>
            </div>
        </div>
    `;
}

function highlightBlocks(lines1: string[], lines2: string[], lineClass: string, highlightColor: string): string {
  let result = "";
  let inBlock = false;

  lines1.forEach((line, index) => {
    const indentation = line.match(/^\s*/)?.[0] ?? "";
    if (line !== lines2[index]) {
      if (!inBlock) {
        inBlock = true;
        result += `<div class="${lineClass}-block" data-start-index="${index}">`;
      }
      result += `<span class="${lineClass}" data-index="${index}" style="background-color: ${highlightColor};">${escapeHtml(line)}</span><br>`;
    } else {
      if (inBlock) {
        inBlock = false;
        result += `</div>`;
      }
      result += `<span class="${lineClass}" data-index="${index}">${escapeHtml(line)}</span><br>`;
    }
  });

  if (inBlock) {
    result += `</div>`;
  }

  return result;
}

function escapeHtml(unsafe: string): string {
  return unsafe.replace(/[&<"']/g, (match) => {
    const escapeMap: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return escapeMap[match];
  });
}

function addClickListeners() {
  const originalBlocks = document.querySelectorAll('.original-line-block');
  const changedBlocks = document.querySelectorAll('.changed-line-block');

  originalBlocks.forEach(block => {
    block.addEventListener('click', () => synchronizeBlocks(block, 'original-line', 'changed-line'));
  });

  changedBlocks.forEach(block => {
    block.addEventListener('click', () => synchronizeBlocks(block, 'changed-line', 'original-line'));
  });
}

function synchronizeBlocks(block: Element, currentClass: string, targetClass: string) {
  const lines = block.querySelectorAll(`.${currentClass}`);

  lines.forEach(line => {
    const index = line.getAttribute('data-index');
    const targetLine = document.querySelector(`.${targetClass}[data-index="${index}"]`);

    if (line.textContent && targetLine) {
      const lineText = line.textContent.trim();
      const indentation = line.textContent.match(/^\s*/)?.[0] ?? "";
      targetLine.textContent = indentation + lineText;

      // Remove the highlighting style from both lines
      line.removeAttribute('style');
      targetLine.removeAttribute('style');
    }
  });

  // Ensure trailing lines are handled correctly
  const lastLineIndex = parseInt(lines[lines.length - 1].getAttribute('data-index') || "0", 10);
  for (let i = lastLineIndex + 1; i < lines.length; i++) {
    const targetLine = document.querySelector(`.${targetClass}[data-index="${i}"]`);
    if (targetLine) {
      targetLine.textContent = "";
      targetLine.removeAttribute('style');
    }
  }
}
