import React from 'react';
import './GameOverButton.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

function GameOverButton({ show, win, lose }) {
  let text = ' ';

  if (win) text = 'You Won!';
  if (lose) text = 'Game Over';

  return (
    <div
      className={classnames('game-over-button-wrap', {
        'game-over-button-wrap--show': show
      })}
    >
      <h1>{text}</h1>
      <Link to="/" className="game-over-button button">
        Back to the main menu
      </Link>
    </div>
  );
}

GameOverButton.propTypes = {
  show: PropTypes.bool.isRequired,
  win: PropTypes.bool.isRequired,
  lose: PropTypes.bool.isRequired
};

export default GameOverButton;
