/**
 * Adds an event listener to the "compareButton" element. When the button is clicked,
 * it retrieves the text from the "original" and "changed" textarea elements, compares
 * them using the compareTexts function, and then displays the comparison result in the
 * "results" element.
 */
document.getElementById("compareButton")?.addEventListener("click", () => {
  // Retrieve the text from the "original" textarea.
  const originalText = (
    document.getElementById("original") as HTMLTextAreaElement
  ).value;
  // Retrieve the text from the "changed" textarea.
  const changedText = (
    document.getElementById("changed") as HTMLTextAreaElement
  ).value;

  // Compare the original and changed texts.
  const result = compareTexts(originalText, changedText);
  // Display the comparison result in the "results" element.
  document.getElementById("results")!.innerHTML = result;
});

/**
 * Compares two strings, representing original and changed texts, line by line. It highlights
 * the differences between them by wrapping added lines in a green background and removed lines
 * in a red background. It returns a string containing HTML markup with both versions of the text
 * and annotations indicating the number of additions and removals.
 *
 * @param original The original text as a string.
 * @param changed The changed text as a string.
 * @returns A string containing HTML markup with the original and changed texts, including
 *          highlights for differences and annotations for the number of added and removed lines.
 */
function compareTexts(original: string, changed: string): string {
  const originalLines = original.split("\n");
  const changedLines = changed.split("\n");

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
