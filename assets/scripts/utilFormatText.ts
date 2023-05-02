export function capitalizeFirstLetter(text: string) {
  return text.replace(/(^|\s)\S/g, (l) => l.toUpperCase());
}

export function replaceHyphensWithSpaces(text: string) {
  return text.replace(/-/g, " ");
}

export function formatPageTitle(text: string) {
  let formattedText = replaceHyphensWithSpaces(text);

  return capitalizeFirstLetter(formattedText);
}
