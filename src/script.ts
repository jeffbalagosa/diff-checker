document.getElementById('compareButton')?.addEventListener('click', () => {
    const originalText = (document.getElementById('original') as HTMLTextAreaElement).value;
    const changedText = (document.getElementById('changed') as HTMLTextAreaElement).value;

    const result = compareTexts(originalText, changedText);
    document.getElementById('results')!.innerHTML = result;
});

function compareTexts(original: string, changed: string): string {
    const originalLines = original.split('\n');
    const changedLines = changed.split('\n');

    let addedLines = 0;
    let removedLines = 0;

    const originalHighlighted = originalLines.map((line, index) => {
        if (line !== changedLines[index]) {
            removedLines++;
            return `<span style="background-color: rgba(245,61,61,.4);">${line}</span>`;
        }
        return `<span>${line}</span>`;
    }).join('<br>');

    const changedHighlighted = changedLines.map((line, index) => {
        if (line !== originalLines[index]) {
            addedLines++;
            return `<span style="background-color: rgba(0,194,129,.4);">${line}</span>`;
        }
        return `<span>${line}</span>`;
    }).join('<br>');

    return `
        <div>
            <h3>Original Text</h3>
            <pre>${originalHighlighted}</pre>
        </div>
        <br>
        <div>
            <h3>Changed Text</h3>
            <pre>${changedHighlighted}</pre>
        </div>
        <br>
        <strong>Lines Removed:</strong> ${removedLines}<br>
        <strong>Lines Added:</strong> ${addedLines}
    `;
}
