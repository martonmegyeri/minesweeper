import React from 'react';
import PropTypes from 'prop-types';

import BoardField from './BoardField/BoardField';


export default function BoardRow({ row, rowIndex, onLeftClickHandler, onRightClickHandler }) {
  return row.map((item, colIndex) => (
    <BoardField
      text={item.text}
      mine={item.mine}
      flagged={item.flagged}
      revealed={item.revealed}
      rowIndex={rowIndex}
      colIndex={colIndex}
      onLeftClickHandler={onLeftClickHandler}
      onRightClickHandler={onRightClickHandler}
      key={colIndex}
    />
  ));
}

BoardRow.propTypes = {
  row: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onLeftClickHandler: PropTypes.func.isRequired,
  onRightClickHandler: PropTypes.func.isRequired
};
