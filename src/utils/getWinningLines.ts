export function getWinningLines(size: number): number[][] {
  const lines: number[][] = [];

  // rows
  for (let r = 0; r < size; r++) {
    const row = [];
    for (let c = 0; c < size; c++) row.push(r * size + c);
    lines.push(row);
  }

  // columns
  for (let c = 0; c < size; c++) {
    const col = [];
    for (let r = 0; r < size; r++) col.push(r * size + c);
    lines.push(col);
  }

  // diagonal top-left → bottom-right
  lines.push(Array.from({ length: size }, (_, i) => i * size + i));

  // diagonal top-right → bottom-left
  lines.push(Array.from({ length: size }, (_, i) => i * size + (size - 1 - i)));

  return lines;
}
