import { type Cell, type Player } from './types';
import { getWinningLines } from './getWinningLines';

export interface WinResult {
  winner: Player;
  line: number[];
}

export function calculateWinner(squares: Cell[], size = 3): WinResult | null {
  const lines = getWinningLines(size);

  for (const line of lines) {
    const [first, ...rest] = line;
    if (
      squares[first] !== null &&
      rest.every(i => squares[i] === squares[first])
    ) {
      return { winner: squares[first] as Player, line };
    }
  }

  return null;
}