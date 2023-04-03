export function getVariable(
  cssVariableName: string,
  htmlElementNode: HTMLElement
) {
  const node = !htmlElementNode ? document.documentElement : htmlElementNode;
  return getComputedStyle(node).getPropertyValue(cssVariableName);
}
