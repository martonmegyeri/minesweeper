import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { LEVELS } from '../../../config/levels';
import { Status, useGame } from '../../../stores/game';
import getRandom from '../../../utils/get-random';
import PerspectiveContainer from '../../PerspectiveContainer';
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
};

export default function Board({ onStartTimer, onStopTimer }: Props) {
  const [selectedLevel, status, setStatus] = useGame(state => [state.selectedLevel, state.status, state.setStatus]);
  const [started, setStarted] = useState(false);
  const levelDetails = LEVELS[selectedLevel];
  const [board, setBoard] = useState<Board>([]);

  useEffect(() => {
    const filledBoard = createBoard();
    const boardWithMines = fillBoardWithMines(filledBoard);
    const boardWithNumbers = fillBoardWithMineIndicatorNumbers(boardWithMines);
    setBoard(boardWithNumbers);
  }, []);

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
      setBoard(revealAllFields(board));
      setStatus(Status.GameOver);
      onStopTimer();
      shakeTheField();
      return;
    }

    // If field is empty - then recursively reveal the nearest empty and numbered fields
    if (board[row][col].text === '' && !board[row][col].revealed) {
      revealFields(board, row, col);
      shakeTheField();
    }

    // If field is numbered - then reveal it
    if (board[row][col].text !== '') {
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

  const shakeTheField = () => {
    // const { shakeTheField } = this.state;
    // this.setState({ shakeTheField: shakeTheField === 0 || shakeTheField === 2 ? 1 : 2 });
  };

  /**
   * Handles the right clicks on board items
   */
  const handleRightClick = (row: number, col: number) => {
    if (status === Status.Win || status === Status.GameOver) return;

    const boardCopy = [...board];
    boardCopy[row][col].flagged = !boardCopy[row][col].flagged;

    setBoard(boardCopy);
  };

  return (
    <div>
      <PerspectiveContainer>
        <div
          className={classNames(styles.board, {
            // [styles.shake1]: this.state.shakeTheField === 1, // TODO:
            // [styles.shake2]: this.state.shakeTheField === 2,
          })}
        >
          {board.map((row, rowIndex) => (
            <div className={styles.row} key={rowIndex}>
              {row.map((item, colIndex) => (
                <Field
                  text={item.text}
                  mine={item.mine}
                  flagged={item.flagged}
                  revealed={item.revealed}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  onLeftClick={handleLeftClick}
                  onRightClick={handleRightClick}
                  key={colIndex}
                  alternateColoring={rowIndex % 2 === 0}
                />
              ))}
            </div>
          ))}
        </div>
      </PerspectiveContainer>
    </div>
  );
}
