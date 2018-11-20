import React from 'react';
import PropTypes from 'prop-types';

import './Header.scss';


export default function Header({ settingsClickHandler }) {
  return (
    <header>
      <nav>
        <div className="nav-item" onClick={settingsClickHandler}>
          <i className="material-icons">settings</i>
        </div>
      </nav>
    </header>
  )
}


Header.propTypes = {
  settingsClickHandler: PropTypes.func.isRequired
}
