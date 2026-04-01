import { useState } from 'react';
import { Board } from '../Board/Board';
import { type Cell } from '../../utils/types';
import styles from './Game.module.css';

const BOARD_SIZE = 3;
const INITIAL_SQUARES: Cell[] = Array(BOARD_SIZE * BOARD_SIZE).fill(null);

export function Game() {
  const [history, setHistory] = useState<Cell[][]>([INITIAL_SQUARES]);
  const [locations, setLocations] = useState<number[]>([-1]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Derived state — no need to store in useState
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares: Cell[], index: number): void {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextLocations = [...locations.slice(0, currentMove + 1), index];
    setHistory(nextHistory);
    setLocations(nextLocations);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move: number): void {
    setCurrentMove(move);
  }

  const moves = history.map((_squares: Cell[], move: number) => {
    const index = locations[move];
    const row = Math.floor(index / BOARD_SIZE) + 1;
    const col = (index % BOARD_SIZE) + 1;
    const location = move > 0 ? ` (${row}, ${col})` : '';
    const isCurrentMove = move === currentMove;

    if (isCurrentMove) {
      return (
        <li key={move} className={styles.currentMove}>
          {move === 0 ? 'You are at game start' : `You are at move #${move}${location}`}
        </li>
      );
    }

    const description = move === 0
      ? 'Go to game start'
      : `Go to move #${move}${location}`;

    return (
      <li key={move}>
        <button
          className={styles.moveButton}
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  const sortedMoves = sortAsc ? moves : [...moves].reverse();

  return (
    <div className={styles.game}>
      <h1 className={styles.title}>Tic-tac-toe</h1>
      <div className={styles.board}>
        <Board
          squares={currentSquares}
          xIsNext={xIsNext}
          onPlay={handlePlay}
          boardSize={BOARD_SIZE}
        />
      </div>
      <div className={styles.history}>
        <div className={styles.historyHeader}>
          <p className={styles.historyTitle}>Move history</p>
          <button
            className={styles.sortButton}
            onClick={() => setSortAsc(!sortAsc)}
          >
            {sortAsc ? 'Oldest first' : 'Newest first'}
          </button>
        </div>
        <ol className={styles.moveList}>
          {sortedMoves}
        </ol>
      </div>
    </div>
  );
}