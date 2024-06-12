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

  let addedLines = 0;
  let removedLines = 0;

  const originalHighlighted = originalLines
    .map((line, index) => {
      if (line !== changedLines[index]) {
        removedLines++;
        return `<span class="original-line" data-index="${index}" style="background-color: rgba(245,61,61,.4);">${line}</span>`;
      }
      return `<span class="original-line" data-index="${index}">${line}</span>`;
    })
    .join("<br>");

  const changedHighlighted = changedLines
    .map((line, index) => {
      if (line !== originalLines[index]) {
        addedLines++;
        return `<span class="changed-line" data-index="${index}" style="background-color: rgba(0,194,129,.4);">${line}</span>`;
      }
      return `<span class="changed-line" data-index="${index}">${line}</span>`;
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

function addClickListeners() {
  const originalLines = document.querySelectorAll('.original-line');
  const changedLines = document.querySelectorAll('.changed-line');

  originalLines.forEach(line => {
    line.addEventListener('click', () => synchronizeLines(line, 'original-line', 'changed-line'));
  });

  changedLines.forEach(line => {
    line.addEventListener('click', () => synchronizeLines(line, 'changed-line', 'original-line'));
  });
}

function synchronizeLines(line: Element, currentClass: string, targetClass: string) {
  const index = line.getAttribute('data-index');
  const targetLine = document.querySelector(`.${targetClass}[data-index="${index}"]`);

  if (line.textContent && targetLine) {
    targetLine.textContent = line.textContent;

    line.removeAttribute('style');
    targetLine.removeAttribute('style');
  }
}
