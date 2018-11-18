import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import './LevelsModal.scss';
import { setGameOptions } from '../../../actions/gameActions';
import Modal from '../../common/Modal/Modal';
import InputField from '../../common/InputField/InputField';
import validateLevelInput from '../../../validation/levels';


class LevelsModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    showHandler: PropTypes.func.isRequired,
    setGameOptions: PropTypes.func.isRequired
  };

  state = {
    width: '',
    height: '',
    mines: '',
    errors: {}
  }

  onChange = (e) => {
    if (e.target.validity.valid) {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { isValid, errors } = validateLevelInput(this.state);
    if (!isValid) return this.setState({ errors });

    const options = {
      width: parseInt(this.state.width),
      height: parseInt(this.state.height),
      mines: parseInt(this.state.mines)
    };

    this.props.setGameOptions(options);

    this.props.history.push('/game/custom');
  }

  render () {
    return (
      <Modal
        className="levels-modal"
        show={ this.props.show }
        showHandler={ this.props.showHandler }
      >
        <ul>
          <li>
            <InputField
              type="text"
              name="width"
              placeholder="Width"
              value={this.state.width}
              pattern="[0-9]*"
              onChange={this.onChange}
              error={this.state.errors.width}
              used={this.state.width.length > 0}
            />
          </li>
          <li>
            <InputField
              type="text"
              name="height"
              placeholder="Height"
              value={this.state.height}
              pattern="[0-9]*"
              onChange={this.onChange}
              error={this.state.errors.height}
              used={this.state.height.length > 0}
            />
          </li>
          <li>
            <InputField
              type="text"
              name="mines"
              placeholder="Mines"
              value={this.state.mines}
              pattern="[0-9]*"
              onChange={this.onChange}
              error={this.state.errors.mines}
              used={this.state.mines.length > 0}
            />
          </li>
          <li>
            <button className="button w-100" onClick={this.onSubmit}>Ok</button>
          </li>
        </ul>
      </Modal>
    );
  }
}


export default withRouter(connect(null, { setGameOptions })(LevelsModal));
