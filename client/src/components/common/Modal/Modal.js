import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Modal.scss';
import PerspectiveContainer from '../PerspectiveContainer/PerspectiveContainer';


export default function Modal({ children, className, show, showHandler }) {
  return (
    <div
      className={classnames(`modal ${className}`, {
        'modal--show': show
      })}
    >
      <div
        className="modal-background"
        onClick={showHandler ? showHandler : null}
      />
      <PerspectiveContainer>
        <div className="modal-body">
          <div className="modal-body__close">
            {showHandler && (
              <i className="material-icons" onClick={showHandler}>
                close
              </i>
            )}
          </div>
          {children}
        </div>
      </PerspectiveContainer>
    </div>
  );
}


Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
  show: PropTypes.bool.isRequired,
  showHandler: PropTypes.func
};
