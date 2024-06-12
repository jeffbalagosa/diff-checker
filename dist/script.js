"use strict";
var _a;
(_a = document.getElementById("compareButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const originalText = document.getElementById("original").value;
    const changedText = document.getElementById("changed").value;
    const result = compareTexts(originalText, changedText);
    document.getElementById("results").innerHTML = result;
});
function trimWhitespace(str) {
    return str.replace(/^\s+|\s+$/g, "");
}
function compareTexts(original, changed) {
    const originalLines = trimWhitespace(original).split("\n");
    const changedLines = trimWhitespace(changed).split("\n");
    let addedLines = 0;
    let removedLines = 0;
    const originalHighlighted = originalLines
        .map((line, index) => {
        if (line !== changedLines[index]) {
            removedLines++;
            return `<span style="background-color: rgba(245,61,61,.4);">${line}</span>`;
        }
        return `<span>${line}</span>`;
    })
        .join("<br>");
    const changedHighlighted = changedLines
        .map((line, index) => {
        if (line !== originalLines[index]) {
            addedLines++;
            return `<span style="background-color: rgba(0,194,129,.4);">${line}</span>`;
        }
        return `<span>${line}</span>`;
    })
        .join("<br>");
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
