import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useReducer, useState } from 'react';
import { LEVELS } from '../../../config/levels';
import { Status, useGame } from '../../../stores/game';
import { getRandom } from '../../../utils/get-random';
import styles from './Board.module.scss';
import Field from './Field/Field';

type Field = {
  text: string;
  mine: boolean;
  flagged: boolean;
  revealed: boolean;
};
type Row = Field[];
type Board = Row[];

type Props = {
  onStartTimer: () => void;
  onStopTimer: () => void;
  onMove: () => void;
  onPlaceFlag: (placedFlags: number) => void;
};

export default function Board({ onStartTimer, onStopTimer, onMove, onPlaceFlag }: Props) {
  const [selectedLevel, status, setStatus] = useGame(state => [state.selectedLevel, state.status, state.setStatus]);
  const [started, setStarted] = useState(false);
  const levelDetails = LEVELS[selectedLevel];
  const [board, setBoard] = useState<Board>([]);
  const boardAnimationControls = useAnimationControls();
  const [placedFlags, dispatchFlagAction] = useReducer((prevValue: number, action: 'increment' | 'decrement') => {
    switch (action) {
      case 'increment':
        return Math.min(levelDetails.mines, prevValue + 1);
      case 'decrement':
        return Math.max(0, prevValue - 1);
    }
  }, 0);

  useEffect(() => {
    const filledBoard = createBoard();
    const boardWithMines = fillBoardWithMines(filledBoard);
    const boardWithNumbers = fillBoardWithMineIndicatorNumbers(boardWithMines);
    setBoard(boardWithNumbers);
  }, []);

  useEffect(() => {
    onPlaceFlag(placedFlags);
  }, [placedFlags]);

  const createBoard = () => {
    const newBoard: Board = [];

    for (let i = 0; i < levelDetails.height; i++) {
      newBoard[i] = [];
      for (let j = 0; j < levelDetails.width; j++) {
        newBoard[i][j] = {
          text: '1',
          mine: false,
          flagged: false,
          revealed: false,
        };
      }
    }

    return newBoard;
  };

  const fillBoardWithMines = (board: Board) => {
    const boardCopy = [...board];

    for (let i = 0; i < levelDetails.mines; i++) {
      const row = getRandom(0, levelDetails.height - 1);
      const col = getRandom(0, levelDetails.width - 1);

      if (!boardCopy[row][col].mine) {
        boardCopy[row][col].mine = true;
        boardCopy[row][col].text = '';
      } else {
        i--;
      }
    }

    return boardCopy;
  };

  const fillBoardWithMineIndicatorNumbers = (board: Board) => {
    const boardCopy = [...board];

    for (let row = 0; row < levelDetails.height; row++) {
      for (let col = 0; col < levelDetails.width; col++) {
        if (boardCopy[row][col].mine !== true) {
          const numberOfNeighbourMines = getNeighbourMines(board, row, col);
          const mineCount = numberOfNeighbourMines !== 0 ? `${numberOfNeighbourMines}` : null;
          boardCopy[row][col].text = mineCount || '';
        }
      }
    }

    return boardCopy;
  };

  const getNeighbourMines = (board: Board, row: number, col: number) => {
    let count = 0;

    count += isMineAt(board, row - 1, col - 1);
    count += isMineAt(board, row - 1, col);
    count += isMineAt(board, row - 1, col + 1);
    count += isMineAt(board, row, col - 1);
    count += isMineAt(board, row, col + 1);
    count += isMineAt(board, row + 1, col - 1);
    count += isMineAt(board, row + 1, col);
    count += isMineAt(board, row + 1, col + 1);

    return count;
  };

  const isMineAt = (board: Board, row: number, col: number) => {
    if (row >= 0 && row < levelDetails.height && col >= 0 && col < levelDetails.width) {
      if (board[row] && board[row][col] && board[row][col].mine) {
        return 1;
      } else return 0;
    } else return 0;
  };

  const revealFields = (board: Board, row: number, col: number) => {
    if (row < 0 || row >= levelDetails.height || col < 0 || col >= levelDetails.width) return;
    if (!board[row] || !board[row][col]) return;
    if (board[row][col].revealed) return;
    if (board[row][col].mine) return;

    board[row][col].revealed = true;

    if (board[row][col].text !== '') return;

    revealFields(board, row + 1, col + 1);
    revealFields(board, row - 1, col - 1);
    revealFields(board, row + 1, col - 1);
    revealFields(board, row - 1, col + 1);
    revealFields(board, row, col + 1);
    revealFields(board, row - 1, col);
    revealFields(board, row + 1, col);
    revealFields(board, row, col - 1);
  };

  const revealAllFields = (board: Board) => {
    const boardCopy = [...board];

    for (let row = 0; row < levelDetails.height; row++) {
      for (let col = 0; col < levelDetails.width; col++) {
        boardCopy[row][col].revealed = true;
      }
    }

    return boardCopy;
  };

  const checkIfPlayerWon = () => {
    const fieldsWithoutMines = levelDetails.width * levelDetails.height - levelDetails.mines;
    let revealedCounter = 0;

    for (let row = 0; row < levelDetails.height; row++) {
      for (let col = 0; col < levelDetails.width; col++) {
        if (board[row][col].revealed) revealedCounter++;
      }
    }

    if (revealedCounter === fieldsWithoutMines) return true;

    return false;
  };

  /**
   * Handles the left clicks on board items
   */
  const handleLeftClick = (row: number, col: number) => {
    // If player not clicked yet - start the timer
    if (!started) {
      onStartTimer();
      setStarted(true);
    }

    // If game is already over, or the field is flagged, then disable left clicks on it
    if (status === Status.Win || status === Status.GameOver || board[row][col].flagged) return;

    // If field is a mine - Game Over
    if (board[row][col].mine) {
      onMove();
      shakeField();
      setBoard(revealAllFields(board));
      setStatus(Status.GameOver);
      onStopTimer();
      return;
    }

    // If field is empty - then recursively reveal the nearest empty and numbered fields
    if (board[row][col].text === '' && !board[row][col].revealed) {
      onMove();
      shakeField();
      revealFields(board, row, col);
    }

    // If field is numbered - then reveal it
    if (board[row][col].text !== '') {
      onMove();
      const boardCopy = [...board];
      boardCopy[row][col].flagged = false;
      boardCopy[row][col].revealed = true;
      setBoard(boardCopy);
    }

    // Check if the player have won the game
    if (checkIfPlayerWon()) {
      setBoard(revealAllFields(board));
      setStatus(Status.Win);
      onStopTimer();
    }
  };

  /**
   * Handles the right clicks on board items
   */
  const handleRightClick = (row: number, col: number) => {
    if (status === Status.Win || status === Status.GameOver) return;

    const flagged = board[row][col].flagged;
    if (!flagged && placedFlags === levelDetails.mines) {
      shakeField();
      return;
    }

    const boardCopy = [...board];
    boardCopy[row][col].flagged = !flagged;
    setBoard(boardCopy);
    onMove();
    dispatchFlagAction(flagged ? 'decrement' : 'increment');
  };

  const shakeField = () => {
    boardAnimationControls.start({
      rotate: [-0.15, 0.15, -0.15, 0.15, 0],
      y: [2, -2, 1, -2, 0],
      x: [-2, 1, -2, -1, 0],
      transition: { type: 'spring', damping: 15, stiffness: 350 },
    });
  };

  return (
    <motion.div
      className={styles.board}
      animate={boardAnimationControls}
      style={{ gridTemplateColumns: `repeat(${levelDetails.width}, minmax(0, 5vmin))` }}
    >
      {board.map((row, rowIndex) =>
        row.map((item, colIndex) => (
          <Field
            key={`${rowIndex}${colIndex}`}
            text={item.text}
            isMine={item.mine}
            isFlagged={item.flagged}
            isRevealed={item.revealed}
            onLeftClick={() => handleLeftClick(rowIndex, colIndex)}
            onRightClick={() => handleRightClick(rowIndex, colIndex)}
          />
        ))
      )}
    </motion.div>
  );
}
