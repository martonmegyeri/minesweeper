import React, { Component } from 'react';

import './Game.scss';
import Timer from './Timer/Timer';
import Board from './Board/Board';
import GameOverButton from './GameOverButton/GameOverButton';
import Confetties from './Confetties';


class Game extends Component {
  state = {
    time: 0,
    win: false,
    gameOver: false
  };

  componentWillUnmount() {
    this.stopTimer();
  }

  setTime = () => {
    this.setState({ time: this.state.time + 1 });
  };

  startTimer = () => {
    this.interval = setInterval(this.setTime, 1000);
  }

  stopTimer = () => {
    clearInterval(this.interval);
  };

  setWin = () => {
    this.setState({ win: true });
  }

  setGameOver = () => {
    this.setState({ gameOver: true });
  }

  render() {
    const { win, gameOver } = this.state;

    return (
      <div className="game">
        {win && (
          <Confetties />
        )}
        <div className="content">
          <Timer time={this.state.time} />
          <Board
            stopTimer={this.stopTimer}
            startTimer={this.startTimer}
            win={win}
            setWin={this.setWin}
            gameOver={gameOver}
            setGameOver={this.setGameOver}
          />
          <GameOverButton show={gameOver || win} win={win} lose={gameOver} />
        </div>
      </div>
    );
  }
}


export default Game;
