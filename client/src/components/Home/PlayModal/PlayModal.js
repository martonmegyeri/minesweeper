import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './PlayModal.scss';
import { setGameOptions } from '../../../actions/gameActions';
import Modal from '../../common/Modal/Modal';
import SplitText from '../../common/SplitText/SplitText';


class PlayModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    showHandler: PropTypes.func.isRequired,
    showLevels: PropTypes.func.isRequired
  };

  state = {
    beginner: {
      width: 9,
      height: 9,
      mines: 10
    },
    intermediate: {
      width: 16,
      height: 16,
      mines: 40
    },
    expert: {
      width: 30,
      height: 16,
      mines: 99
    }
  };

  onLevelClick = level => {
    const options = {
      width: this.state[level].width,
      height: this.state[level].height,
      mines: this.state[level].mines
    };

    this.props.setGameOptions(options);

    this.props.history.push(`/game/${level}`);
  };

  render() {
    return (
      <Modal
        className="play-modal"
        show={this.props.show}
        showHandler={this.props.showHandler}
      >
        <ul>
          <li>
            <div onClick={this.onLevelClick.bind(this, 'beginner')}>
              <SplitText size="small" color="dark">
                Beginner
              </SplitText>
            </div>
          </li>
          <li>
            <div onClick={this.onLevelClick.bind(this, 'intermediate')}>
              <SplitText size="small" color="dark">
                Intermediate
              </SplitText>
            </div>
          </li>
          <li>
            <div onClick={this.onLevelClick.bind(this, 'expert')}>
              <SplitText size="small" color="dark">
                Expert
              </SplitText>
            </div>
          </li>
          <li>
            <div onClick={this.props.showLevels}>
              <SplitText size="small" color="dark">
                Custom
              </SplitText>
            </div>
          </li>
        </ul>
      </Modal>
    );
  }
}


export default withRouter(
  connect(
    null,
    { setGameOptions }
  )(PlayModal)
);
