import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useReducer, useState } from 'react';
import { Level, LEVELS } from '~/config/levels';
import { Status, useGame } from '~/stores/game';
import { getRandom } from '~/utils/get-random';
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
    const filledBoard = getFilledBoard(selectedLevel);
    setBoard(filledBoard);
  }, []);

  useEffect(() => {
    onPlaceFlag(placedFlags);
  }, [placedFlags]);

  const flagField = (flagged: boolean, row: number, col: number) => {
    const boardCopy = [...board];
    boardCopy[row][col].flagged = flagged;
    setBoard(boardCopy);
    dispatchFlagAction(flagged ? 'increment' : 'decrement');
  };

  const revealField = (row: number, col: number) => {
    const boardCopy = [...board];
    boardCopy[row][col].revealed = true;
    setBoard(boardCopy);
  };

  const revealFields = (row: number, col: number) => {
    const outOfBounds = row < 0 || row >= levelDetails.height || col < 0 || col >= levelDetails.width;
    if (outOfBounds) return;
    if (board[row][col].revealed) return;
    if (board[row][col].mine) return;

    revealField(row, col);

    if (board[row][col].text !== '') return;

    revealFields(row + 1, col);
    revealFields(row + 1, col + 1);
    revealFields(row, col + 1);
    revealFields(row - 1, col + 1);
    revealFields(row - 1, col);
    revealFields(row - 1, col - 1);
    revealFields(row, col - 1);
    revealFields(row + 1, col - 1);
  };

  const revealAllFields = () => {
    const boardCopy = [...board];

    for (let row = 0; row < levelDetails.height; row++) {
      for (let col = 0; col < levelDetails.width; col++) {
        boardCopy[row][col].revealed = true;
      }
    }

    setBoard(boardCopy);
  };

  const checkWin = () => {
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

  const gameOver = () => {
    onStopTimer();
    shakeField();
    revealAllFields();
    setStatus(Status.GameOver);
  };

  const handleFieldLeftClick = (row: number, col: number) => {
    const field = board[row][col];

    if (status === Status.Win || status === Status.GameOver || field.flagged || field.revealed) {
      return;
    }

    if (!started) {
      onStartTimer();
      setStarted(true);
    }

    onMove();

    if (field.mine) {
      gameOver();
      return;
    }

    // If field is empty - then recursively reveal the nearest empty and numbered fields
    if (field.text === '') {
      shakeField();
      revealFields(row, col);
    }

    // If field is numbered - then reveal it
    if (field.text !== '') {
      revealField(row, col);
    }

    if (checkWin()) {
      revealAllFields();
      setStatus(Status.Win);
      onStopTimer();
    }
  };

  const handleFieldRightClick = (row: number, col: number) => {
    if (status === Status.Win || status === Status.GameOver) return;

    const flagged = board[row][col].flagged;
    if (!flagged && placedFlags === levelDetails.mines) {
      shakeField();
      return;
    }

    onMove();
    flagField(!flagged, row, col);
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
            onLeftClick={() => handleFieldLeftClick(rowIndex, colIndex)}
            onRightClick={() => handleFieldRightClick(rowIndex, colIndex)}
          />
        ))
      )}
    </motion.div>
  );
}

const getFilledBoard = (selectedLevel: Level) => {
  const levelDetails = LEVELS[selectedLevel];

  const createBoardAndFillWithInitialValues = () => {
    const newBoard: Board = [];

    for (let i = 0; i < levelDetails.height; i++) {
      newBoard[i] = [];
      for (let j = 0; j < levelDetails.width; j++) {
        newBoard[i][j] = {
          text: '',
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

    count += isMineAt(board, row + 1, col);
    count += isMineAt(board, row + 1, col + 1);
    count += isMineAt(board, row, col + 1);
    count += isMineAt(board, row - 1, col + 1);
    count += isMineAt(board, row - 1, col);
    count += isMineAt(board, row - 1, col - 1);
    count += isMineAt(board, row, col - 1);
    count += isMineAt(board, row + 1, col - 1);

    return count;
  };

  const isMineAt = (board: Board, row: number, col: number) => {
    if (row >= 0 && row < levelDetails.height && col >= 0 && col < levelDetails.width) {
      if (board[row] && board[row][col] && board[row][col].mine) {
        return 1;
      } else return 0;
    } else return 0;
  };

  const filledBoard = createBoardAndFillWithInitialValues();
  const boardWithMines = fillBoardWithMines(filledBoard);
  const boardWithNumbers = fillBoardWithMineIndicatorNumbers(boardWithMines);
  return boardWithNumbers;
};
