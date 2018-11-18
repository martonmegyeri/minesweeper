import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import './Board.scss';
import { setGameOptions } from '../../../actions/gameActions';
import BoardRow from './BoardRow/BoardRow';
import Spinner from '../../common/Spinner/Spinner';
import getRandom from '../../../utils/getRandom';
import PerspectiveContainer from '../../common/PerspectiveContainer/PerspectiveContainer';


class Board extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    mines: PropTypes.number,
    history: PropTypes.object.isRequired,
    stopTimer: PropTypes.func.isRequired,
    startTimer: PropTypes.func.isRequired,
    win: PropTypes.bool.isRequired,
    setWin: PropTypes.func.isRequired,
    gameOver: PropTypes.bool.isRequired,
    setGameOver: PropTypes.func.isRequired
  };

  state = {
    board: [],
    win: false,
    gameOver: false,
    started: false,
    shakeTheField: 0
  };

  componentDidMount() {
    const { width, height, mines } = this.props;
    if (width === 0 || height === 0 || mines === 0) {
      this.props.history.push('/');
    }

    const filledBoard = this.fillBoard(this.state.board);
    const boardWithMines = this.generateMines(filledBoard);
    const boardWithNumbers = this.generateNumbers(boardWithMines);
    this.setState({ board: boardWithNumbers });
  }

  fillBoard = board => {
    const { width, height } = this.props;
    const boardCopy = [...board];

    for (let i = 0; i < height; i++) {
      boardCopy[i] = [];
      for (let j = 0; j < width; j++) {
        boardCopy[i][j] = {
          text: '1',
          mine: false,
          flagged: false,
          revealed: false
        };
      }
    }

    return boardCopy;
  };

  generateMines = board => {
    const { width, height, mines } = this.props;
    const boardCopy = [...board];

    for (let i = 0; i < mines; i++) {
      let row = getRandom(0, height - 1);
      let col = getRandom(0, width - 1);

      if (!boardCopy[row][col].mine) {
        boardCopy[row][col].mine = true;
        boardCopy[row][col].text = '';
      } else {
        i--;
      }
    }

    return boardCopy;
  };

  /**
   * Generate the neighbour mine texts
   */
  generateNumbers = board => {
    const boardCopy = [...board];

    for (let row = 0; row < this.props.height; row++) {
      for (let col = 0; col < this.props.width; col++) {
        if (boardCopy[row][col].mine !== true) {
          const neighbourMines = this.neighbourMines(board, row, col);
          const mineCount = neighbourMines !== 0 ? neighbourMines + '' : null;
          boardCopy[row][col].text = mineCount || '';
        }
      }
    }

    return boardCopy;
  };

  /**
   * Returns the count of neighbour mines for a coordinate
   */
  neighbourMines = (board, row, col) => {
    let count = 0;

    count += this.mineAt(board, row - 1, col - 1);
    count += this.mineAt(board, row - 1, col);
    count += this.mineAt(board, row - 1, col + 1);
    count += this.mineAt(board, row, col - 1);
    count += this.mineAt(board, row, col + 1);
    count += this.mineAt(board, row + 1, col - 1);
    count += this.mineAt(board, row + 1, col);
    count += this.mineAt(board, row + 1, col + 1);

    return count;
  };

  /**
   * Checks if is there mine at the coordinate and if item is on the board
   */
  mineAt = (board, row, col) => {
    if (
      row >= 0 &&
      row < this.props.height &&
      col >= 0 &&
      col < this.props.width
    ) {
      if (board[row] && board[row][col] && board[row][col].mine) {
        return 1;
      } else return 0;
    } else return 0;
  };

  /** Recursively reveal the map
   */
  handleClickOnEmpty(board, row, col) {
    const { width, height } = this.props;

    if (row < 0 || row >= height || col < 0 || col >= width) return;
    if (!board[row] || !board[row][col]) return;
    if (board[row][col].revealed) return;
    if (board[row][col].mine) return;

    board[row][col].revealed = true;

    if (board[row][col].text !== '') return;

    this.handleClickOnEmpty(board, row + 1, col + 1);
    this.handleClickOnEmpty(board, row - 1, col - 1);
    this.handleClickOnEmpty(board, row + 1, col - 1);
    this.handleClickOnEmpty(board, row - 1, col + 1);
    this.handleClickOnEmpty(board, row, col + 1);
    this.handleClickOnEmpty(board, row - 1, col);
    this.handleClickOnEmpty(board, row + 1, col);
    this.handleClickOnEmpty(board, row, col - 1);
  }

  /**
   * Reveal all items on the board
   */
  revealAll = board => {
    const boardCopy = [...board];

    for (let row = 0; row < this.props.height; row++) {
      for (let col = 0; col < this.props.width; col++) {
        boardCopy[row][col].revealed = true;
      }
    }

    return boardCopy;
  };

  /**
   * Check if the player won the game
   */
  checkWin() {
    const { width, height, mines } = this.props;
    const { board } = this.state;
    const fieldsWithoutMines = width * height - mines;
    let counter = 0;

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (board[row][col].revealed) counter++;
        if (counter === fieldsWithoutMines) return true;
        else if (counter > fieldsWithoutMines) return true;
      }
    }
    return false;
  }

  /**
   * Handles the left clicks on board items
   */
  onLeftClickHandler = (event, row, col) => {
    const { board, started } = this.state;
    const { win, gameOver } = this.props;

    // If player not clicked yet - start the timer
    if (!started) {
      this.props.startTimer();
      this.setState({ started: true });
    }

    // If game is already over, or the field is flagged, then disable left clicks on it
    if (win || gameOver || board[row][col].flagged) return;

    // If field is a mine - Game Over
    if (board[row][col].mine) {
      this.setState({ board: this.revealAll(board) });
      this.props.setGameOver();
      this.props.stopTimer();
      this.shakeTheField();
      return;
    // If field is empty - then recursively reveal the nearest empty and numbered fields
  } else if (board[row][col].text === '' && !board[row][col].revealed) {
      this.handleClickOnEmpty(board, row, col);
      this.forceUpdate();
      this.shakeTheField();
    // If field is numbered - then reveal it
  } else if (board[row][col].text !== '') {
      const boardCopy = [...board];
      boardCopy[row][col].flagged = false;
      boardCopy[row][col].revealed = true;
      this.setState({ board: boardCopy });
    }

    // Check if the player win the game
    if (this.checkWin()) {
      this.setState({ board: this.revealAll(board) });
      this.props.setWin();
      this.props.stopTimer();
    }
  };

  shakeTheField = () => {
    const { shakeTheField } = this.state;
    this.setState({ shakeTheField: (shakeTheField === 0 || shakeTheField === 2) ? 1 : 2});
  }

  /**
   * Handles the right clicks on board items
   */
  onRightClickHandler = (event, row, col) => {
    event.preventDefault();

    const { board } = this.state;
    const {  win, gameOver } = this.props;
    if (win || gameOver) return;

    const boardCopy = [...board];
    boardCopy[row][col].flagged = !boardCopy[row][col].flagged;

    this.setState({ board: boardCopy });
  };

  renderBoard = () => {
    return this.state.board.map((item, rowIndex) => (
      <div className="board__row d-flex" key={rowIndex}>
        <BoardRow
          row={item}
          rowIndex={rowIndex}
          onLeftClickHandler={this.onLeftClickHandler}
          onRightClickHandler={this.onRightClickHandler}
        />
      </div>
    ));
  };

  render() {
    const { board } = this.state;

    if (board.length !== 0) {
      return (
        <div className="board">
          <PerspectiveContainer>
            <div className={classnames('board__inner', {
              'shake-1': this.state.shakeTheField === 1,
              'shake-2': this.state.shakeTheField === 2
            })}>{this.renderBoard()}</div>
          </PerspectiveContainer>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}


const mapStateToProps = state => ({
  width: state.game.width,
  height: state.game.height,
  mines: state.game.mines
});

export default withRouter(
  connect(
    mapStateToProps,
    { setGameOptions }
  )(Board)
);
