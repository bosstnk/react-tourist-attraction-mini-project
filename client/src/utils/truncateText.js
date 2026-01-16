export function truncateText(text, maxText = 100) {
  if (text === "") {
    return "";
  }
  return text.length > maxText ? text.slice(0, maxText) + "..." : text;
}
