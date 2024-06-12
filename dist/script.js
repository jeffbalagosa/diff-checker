"use strict";
var _a;
(_a = document.getElementById('compareButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const originalText = document.getElementById('original').value;
    const changedText = document.getElementById('changed').value;
    const result = compareTexts(originalText, changedText);
    document.getElementById('results').innerHTML = result;
});
function compareTexts(original, changed) {
    const originalLines = original.split('\n');
    const changedLines = changed.split('\n');
    let addedLines = 0;
    let removedLines = 0;
    let diffResult = originalLines.map((line, index) => {
        if (line !== changedLines[index]) {
            removedLines++;
            return `<span style="color: red; text-decoration: line-through;">${line}</span>`;
        }
        return `<span>${line}</span>`;
    }).join('<br>');
    const additionalLines = changedLines.slice(originalLines.length);
    if (additionalLines.length > 0) {
        addedLines += additionalLines.length;
        additionalLines.forEach(line => {
            diffResult += `<br><span style="color: green;">${line}</span>`;
        });
    }
    return `
        ${diffResult}
        <br><br>
        <strong>Lines Removed:</strong> ${removedLines}<br>
        <strong>Lines Added:</strong> ${addedLines}
    `;
}
