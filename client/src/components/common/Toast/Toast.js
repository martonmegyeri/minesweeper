import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Toast.scss';


export default function Toast({ visible, text }) {
  return (
    <div
      className={classnames('toast', {
        'toast--visible': visible
      })}
    >
      {text}
    </div>
  )
}


Toast.propTypes = {
  visible: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};
