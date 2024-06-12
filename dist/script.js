"use strict";
var _a;
(_a = document.getElementById('compareButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const originalText = document.getElementById('original').value;
    const changedText = document.getElementById('changed').value;
    const result = compareTexts(originalText, changedText);
    document.getElementById('results').innerHTML = result;
});
function compareTexts(original, changed) {
    return 'Comparison result will be displayed here.';
}
