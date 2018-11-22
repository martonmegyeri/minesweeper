import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Confetties.scss';


class Confetties extends Component {
  static defaultProps = {
    number: 250
  };

  static propTypes = {
    number: PropTypes.number
  };

  renderConfetties = () => {
    const confetties = [];

    for (let i = 0; i < this.props.number; i++) {
      confetties.push(
        <div className={`confetti confetti-${i}`} key={i}></div>
      );
    }

    return confetties;
  }

  render () {
    return (
      <div className="confetties">
        {this.renderConfetties()}
      </div>
    )
  }
}

export default Confetties;
