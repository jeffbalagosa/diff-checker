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
    let addedBlocks = 0;
    let removedBlocks = 0;
    const originalHighlighted = highlightBlocks(originalLines, changedLines, "original-line", "rgba(245,61,61,.4)", () => removedBlocks++);
    const changedHighlighted = highlightBlocks(changedLines, originalLines, "changed-line", "rgba(0,194,129,.4)", () => addedBlocks++);
    return `
        <div id="original-result">
            <h3>Original Text</h3>
            <span style="color: red;"><strong>${removedBlocks}</strong> removals<br></span>
            <div class="border">
            <pre>${originalHighlighted}</pre>
            </div>
        </div>
        <div id="changed-result">
            <h3>Changed Text</h3>
            <span style="color: green;"><strong>${addedBlocks}</strong> additions<br></span>
            <div class="border">
            <pre>${changedHighlighted}</pre>
            </div>
        </div>
    `;
}
function highlightBlocks(lines1, lines2, lineClass, highlightColor, incrementCounter) {
    let result = "";
    let inBlock = false;
    lines1.forEach((line, index) => {
        var _a, _b;
        const indentation = (_b = (_a = line.match(/^\s*/)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "";
        if (line !== lines2[index]) {
            if (!inBlock) {
                inBlock = true;
                incrementCounter();
                result += `<div class="${lineClass}-block" data-start-index="${index}">`;
            }
            result += `<span class="${lineClass}" data-index="${index}" style="background-color: ${highlightColor};">${escapeHtml(line)}</span><br>`;
        }
        else {
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
    const lines = block.querySelectorAll(`.${currentClass}`);
    lines.forEach(line => {
        var _a, _b;
        const index = line.getAttribute('data-index');
        const targetLine = document.querySelector(`.${targetClass}[data-index="${index}"]`);
        if (line.textContent && targetLine) {
            const lineText = line.textContent.trim();
            const indentation = (_b = (_a = line.textContent.match(/^\s*/)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "";
            targetLine.textContent = indentation + lineText;
            line.removeAttribute('style');
            targetLine.removeAttribute('style');
        }
    });
    const lastLineIndex = parseInt(lines[lines.length - 1].getAttribute('data-index') || "0", 10);
    for (let i = lastLineIndex + 1; i < lines.length; i++) {
        const targetLine = document.querySelector(`.${targetClass}[data-index="${i}"]`);
        if (targetLine) {
            targetLine.textContent = "";
            targetLine.removeAttribute('style');
        }
    }
}
