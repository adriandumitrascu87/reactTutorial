import { type Cell } from '../../utils/types';
import styles from './Square.module.css';

interface SquareProps {
  value: Cell;
  onSquareClick: () => void;
  highlight: boolean;
}

export function Square({ value, onSquareClick, highlight }: SquareProps) {
  const colorClass = value === 'X' ? styles.x : value === 'O' ? styles.o : '';
  const highlightClass = highlight ? styles.highlight : '';

  return (
    <button
      className={`${styles.square} ${colorClass} ${highlightClass}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
