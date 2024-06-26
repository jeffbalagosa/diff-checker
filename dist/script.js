"use strict";
var _a;
(_a = document.getElementById("compareButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const originalText = document.getElementById("original").value;
    const changedText = document.getElementById("changed").value;
    const result = compareTexts(originalText, changedText);
    document.getElementById("results").innerHTML = result;
    addClickListeners();
});
function trimWhitespace(str) {
    return str.replace(/^\s+|\s+$/g, "");
}
function compareTexts(original, changed) {
    const originalLines = trimWhitespace(original).split("\n");
    const changedLines = trimWhitespace(changed).split("\n");
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
function highlightBlocks(lines1, lines2, lineClass, highlightColor) {
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
        }
        else {
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
function escapeHtml(unsafe) {
    return unsafe.replace(/[&<"']/g, (match) => {
        const escapeMap = {
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
function synchronizeBlocks(block, currentClass, targetClass) {
    const index = block.getAttribute('data-block-index');
    const targetBlock = document.querySelector(`.${targetClass}-block[data-block-index="${index}"]`);
    if (targetBlock) {
        targetBlock.innerHTML = block.innerHTML;
        block.querySelectorAll(`.${currentClass}`).forEach(line => {
            line.removeAttribute('style');
        });
        targetBlock.querySelectorAll(`.${targetClass}`).forEach(line => {
            line.removeAttribute('style');
        });
        block.removeAttribute('style');
        targetBlock.removeAttribute('style');
        block.querySelectorAll(`[style]`).forEach(line => {
            line.removeAttribute('style');
        });
        targetBlock.querySelectorAll(`[style]`).forEach(line => {
            line.removeAttribute('style');
        });
        console.log(`Replaced and cleared block index ${index} from ${currentClass} to ${targetClass}`);
    }
    else {
        console.log(`No target block found for index ${index}`);
    }
}
