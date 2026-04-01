import { Square } from '../Square/Square';
import { calculateWinner } from '../../utils/calculateWinner';
import { getStatus } from '../../utils/getStatus';
import { type Cell } from '../../utils/types';
import styles from './Board.module.css';

interface BoardProps {
  squares: Cell[];
  xIsNext: boolean;
  onPlay: (nextSquares: Cell[], index: number) => void;
  boardSize?: number;
}

export function Board({ squares, xIsNext, onPlay, boardSize = 3 }: BoardProps) {
  const result = calculateWinner(squares, boardSize);
  const winningLine = result?.line ?? [];
  const isBoardFull = squares.every((s) => s !== null);
  const status = getStatus(result, isBoardFull, xIsNext);

  function handleClick(index: number): void {
    if (squares[index] || result) return;
    const nextSquares = squares.slice() as Cell[];
    nextSquares[index] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares, index);
  }

  const rows = [];
  for (let row = 0; row < boardSize; row++) {
    const cols = [];
    for (let col = 0; col < boardSize; col++) {
      const index = row * boardSize + col;
      cols.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          highlight={winningLine.includes(index)}
        />
      );
    }
    rows.push(
      <div key={row} className={styles.row}>
        {cols}
      </div>
    );
  }

  return (
    <div className={styles.board}>
      <p className={styles.status}>{status}</p>
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
      >
        {rows}
      </div>
    </div>
  );
}
