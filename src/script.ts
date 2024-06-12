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

  const originalHighlighted = highlightBlocks(originalLines, changedLines, "original-line", "rgba(245,61,61,.4)");
  const changedHighlighted = highlightBlocks(changedLines, originalLines, "changed-line", "rgba(0,194,129,.4)");

  return `
        <div id="original-result">
            <h3>Original Text</h3>
            <div class="border">
            <pre>${originalHighlighted}</pre>
            </div>
        </div>
        <div id="changed-result">
            <h3>Changed Text</h3>
            <div class="border">
            <pre>${changedHighlighted}</pre>
            </div>
        </div>
    `;
}

function highlightBlocks(lines1: string[], lines2: string[], lineClass: string, highlightColor: string): string {
  let result = '';
  let inBlock = false;
  let blockIndex = 0;

  lines1.forEach((line, index) => {
    const otherLine = lines2[index];
    if (line !== otherLine) {
      if (!inBlock) {
        result += `<div class="${lineClass}-block" data-block-index="${blockIndex}">`;
        inBlock = true;
      }
      result += `<div class="${lineClass}" style="background-color: ${highlightColor}" data-index="${index}">${escapeHtml(line)}</div>`;
    } else {
      if (inBlock) {
        result += `</div>`;
        inBlock = false;
        blockIndex++;
      }
      result += `<div class="${lineClass}" data-index="${index}">${escapeHtml(line)}</div>`;
    }
  });
  if (inBlock) {
    result += `</div>`;
    blockIndex++;
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
  const index = block.getAttribute('data-block-index');
  const targetBlock = document.querySelector(`.${targetClass}-block[data-block-index="${index}"]`);

  if (targetBlock) {
    // Update the target block with the content of the clicked block
    targetBlock.innerHTML = block.innerHTML;

    // Remove highlighting for lines within the source block
    block.querySelectorAll(`.${currentClass}`).forEach(line => {
      line.removeAttribute('style');
    });

    // Remove highlighting for lines within the target block
    targetBlock.querySelectorAll(`.${targetClass}`).forEach(line => {
      line.removeAttribute('style');
    });

    // Remove highlighting for the block itself
    block.removeAttribute('style');
    targetBlock.removeAttribute('style');

    // Remove block level highlighting if present
    block.querySelectorAll(`[style]`).forEach(line => {
      line.removeAttribute('style');
    });
    targetBlock.querySelectorAll(`[style]`).forEach(line => {
      line.removeAttribute('style');
    });

    console.log(`Replaced and cleared block index ${index} from ${currentClass} to ${targetClass}`);
  } else {
    console.log(`No target block found for index ${index}`);
  }
}
