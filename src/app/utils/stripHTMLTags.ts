export function stripHTMLTags(input: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");
  return doc.body.textContent || "";
}
