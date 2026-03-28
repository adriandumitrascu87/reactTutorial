import { useState } from "react";

const boardSize = 3;

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [locations, setLocations] = useState<number[]>([-1]);

  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: any, index: number) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setLocations([...locations.slice(0, currentMove + 1), index]);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: any) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const isCurrentMove = move === history.length - 1;
    // for current move don't show button, just show text;

    const index = locations[move];
    const row = Math.floor(index / boardSize) + 1;
    const col = (index % 3) + 1;
    const location = move > 0 ? `(${row}, ${col})` : "";

    if (isCurrentMove) {
      return (
        <li key={move}>
          {move === 0
            ? "You are at game start"
            : `You are at move #${move} ${location}`}
        </li>
      );
    }
    let description =
      move === 0 ? "Go to game start" : `Go to move #${move} ${location}`;
    if (move > 0) {
      description = "Go to move#" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const sortedMoves = sortAsc ? moves : [...moves].reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <button
          onClick={() => {
            setSortAsc(!sortAsc);
          }}
        >
          Sort:{sortAsc ? "Ascending" : "Descending"}
        </button>
        <ol> {sortedMoves}</ol>
      </div>
    </div>
  );
}

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[], index: number) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  }

  const result = calculateWinner(squares);
  const winnigLine = result?.line ?? [];
  const isBoardFull = squares.every((s) => s !== null);

  //possible outcomes
  let status;
  if (result) {
    status = `Winner:  ${result?.winner}`;
  } else if (isBoardFull) {
    status = "It's a DRAW!"
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const boardRows = [];

  for (let row = 0; row < boardSize; row++) {
    const boardCols = [];

    for (let col = 0; col < boardSize; col++) {
      const squareIndex = row * boardSize + col;

      boardCols.push(
        <Square
          key={squareIndex}
          value={squares[squareIndex]}
          onSquareClick={() => handleClick(squareIndex)}
          highlight = {winnigLine.includes(squareIndex)}
        />,
      );
    }
    boardRows.push(
      <div key={row} className="board-row">
        {boardCols}
      </div>,
    );
  }
  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

interface SquareProps {
  value: string|null;
  onSquareClick: () => void;
  highlight: boolean;
}

function Square({ value, onSquareClick, highlight }: SquareProps) {
  return (
    <button
      className={`square ${highlight ? "highlight" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

interface WinResult {
  winner: string;
  line: number[];
}

function calculateWinner(squares: (string | null)[]): WinResult | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a] as string,
        line: [a, b, c],
      };
    }
  }

  return null;
}
