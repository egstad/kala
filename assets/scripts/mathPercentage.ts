export function percentage(part: number, whole: number) {
  const result = part / whole;
  return Number(result.toFixed(3));
}

export function percentageReverse(part: number, whole: number) {
  const result = 1 - part / whole;
  return Number(result.toFixed(3));
}
