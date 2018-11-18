import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';
import SplitText from '../common/SplitText/SplitText';
import PlayModal from './PlayModal/PlayModal';
import LevelsModal from './LevelsModal/LevelsModal';


class Home extends Component {
  state = {
    playModal: false,
    levelsModal: false
  };

  playClickHandler = () => {
    this.setState({ playModal: !this.state.playModal });
  };

  levelsClickHandler = () => {
    this.setState({
      levelsModal: !this.state.levelsModal,
      playModal: false
    });
  };

  render() {
    return (
      <div className="home">
        <div className="content justify-content-center">
          <nav>
            <ul className="nav-list">
              <div onClick={this.playClickHandler}>
                <SplitText size="large">Play</SplitText>
              </div>
              <Link to="/about">
                <SplitText size="large">About</SplitText>
              </Link>
            </ul>
          </nav>
        </div>

        <PlayModal
          show={this.state.playModal}
          showHandler={this.playClickHandler}
          showLevels={this.levelsClickHandler}
        />
        <LevelsModal
          show={this.state.levelsModal}
          showHandler={this.levelsClickHandler}
        />
      </div>
    );
  }
}


export default Home;
