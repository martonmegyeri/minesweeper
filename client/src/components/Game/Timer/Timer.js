import React from 'react';
import PropTypes from 'prop-types';

import './Timer.scss';
import clock from '../../../assets/images/clock.svg';

const Timer = ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - (minutes * 60);
  const formattedTime = `${minutes}:${seconds > 9 ? seconds : '0' + seconds}`;

  return (
    <div className="timer">
      <img src={clock} alt="clock" />
      <div className="timer__time">{formattedTime}</div>
    </div>
  );
}

Timer.propTypes = {
  time: PropTypes.number.isRequired
};


export default Timer;
