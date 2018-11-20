import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Settings.scss';
import { setTheme, set3D } from '../../../actions/layoutActions';
import Modal from '../../common/Modal/Modal';
import InputSwitch from '../../common/InputSwitch/InputSwitch';


class Settings extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    showHandler: PropTypes.func.isRequired
  }

  state = {
    darkTheme: true,
    mode3D: true
  }

  componentDidUpdate(prevProps, prevState) {
    const { darkTheme, mode3D } = this.state;

    if (prevState.darkTheme !== darkTheme)
      this.props.setTheme(darkTheme ? 'dark' : 'light');

    if (prevState.mode3D !== mode3D)
      this.props.set3D(mode3D);
  }

  checkHandler = (e) => {
    this.setState({ [e.target.name]: e.target.checked });
  }

  render() {
    return (
      <Modal
        className="settings-modal"
        show={this.props.show}
        showHandler={this.props.showHandler}
      >
        <div className="settings-row">
          <InputSwitch
            name="darkTheme"
            label="Dark mode"
            checked={this.state.darkTheme}
            onChange={this.checkHandler}
          />
        </div>
        <div className="settings-row">
          <InputSwitch
            name="mode3D"
            label="3D Effect"
            checked={this.state.mode3D}
            onChange={this.checkHandler}
          />
        </div>
      </Modal>
    )
  }
}


const mapStateToProps = (state) => ({
  theme: state.layout.theme,
  mode3D: state.layout.mode3D
});

export default connect(mapStateToProps, { setTheme, set3D })(Settings);
