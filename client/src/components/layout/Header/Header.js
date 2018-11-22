import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import './Header.scss';


const Header = ({ history, settingsClickHandler }) => {
  let backButton = null;
  if (history.location.pathname !== '/') {
    backButton = (
      <Link to="/" className="nav-item">
        <i className="material-icons">arrow_back</i>
      </Link>
    );
  }

  return (
    <header>
      <nav className="nav--left">
        {backButton}
      </nav>
      <nav className="nav--right">
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

export default withRouter(Header);
