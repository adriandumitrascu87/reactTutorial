import { type WinResult } from './calculateWinner';

export function getStatus(
  result: WinResult | null,
  isBoardFull: boolean,
  xIsNext: boolean,
): string {
  if (result) return `Winner: ${result.winner}`;
  if (isBoardFull) return "It's a draw!";
  return `Next player: ${xIsNext ? 'X' : 'O'}`;
}
