import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './SplitText.scss';


export default function SplitText({ children, size, color }) {
  if (typeof children === 'string') {
    return (
      <div
        className={classnames('split-text', {
          'split-text--small': size === 'small',
          'split-text--large': size === 'large',
          'split-text--dark': color === 'dark'
        })}
      >
        {children}
        <span className="mask">
          <span>{children}</span>
        </span>
        <span className="mask">
          <span>{children}</span>
        </span>
      </div>
    );
  } else return null;
}

SplitText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  size: PropTypes.string,
  color: PropTypes.string
};
