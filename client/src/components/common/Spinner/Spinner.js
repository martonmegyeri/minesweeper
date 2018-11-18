import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Spinner.scss';


export default function Spinner({ hide, stroke, color, style }) {
  return (
    <div
      className={classnames('loader-circle fade-in', {
        hide: hide,
        dark: color === 'dark'
      })}
      style={style}
    >
      <svg className="circular" viewBox="25 25 50 50">
        <circle
          className="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth={stroke}
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};

Spinner.propTypes = {
  hide: PropTypes.bool,
  stroke: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object
};

Spinner.defaultProps = {
  hide: false,
  stroke: '3'
};
