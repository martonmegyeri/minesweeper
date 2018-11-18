import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './BoardField.scss';
import getRandom from '../../../../../utils/getRandom';


export default function BoardField({
  text,
  mine,
  flagged,
  revealed,
  rowIndex,
  colIndex,
  onLeftClickHandler,
  onRightClickHandler
}) {
  const mineColors = [
    'board__item--mine--red',
    'board__item--mine--green',
    'board__item--mine--blue',
    'board__item--mine--pink',
    'board__item--mine--yellow',
    'board__item--mine--violet'
  ];

  return (
    <div
      className={classnames('board__item', {
        'board__item--mine': mine,
        [mineColors[getRandom(0, mineColors.length - 1)]]: mine,
        'board__item--flagged': flagged,
        'board__item--revealed': revealed,
        'board__item--color-blue': parseInt(text) === 1,
        'board__item--color-green': parseInt(text) === 2,
        'board__item--color-red': parseInt(text) >= 3
      })}
      onClick={event => onLeftClickHandler(event, rowIndex, colIndex)}
      onContextMenu={event => onRightClickHandler(event, rowIndex, colIndex)}
    >
      {text}
    </div>
  );
}


BoardField.propTypes = {
  text: PropTypes.string.isRequired,
  mine: PropTypes.bool.isRequired,
  flagged: PropTypes.bool.isRequired,
  revealed: PropTypes.bool.isRequired,
  rowIndex: PropTypes.number.isRequired,
  colIndex: PropTypes.number.isRequired,
  onLeftClickHandler: PropTypes.func.isRequired,
  onRightClickHandler: PropTypes.func.isRequired
};
