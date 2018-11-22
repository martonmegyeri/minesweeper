import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Toast from './Toast';
import { hideMessage } from '../../../actions/layoutActions';


class ToastContainer extends Component {
  componentDidUpdate() {
    if (this.props.message.visible) {
      if (this.timeout) clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this.props.hideMessage();
      }, 4000);
    }
  }

  render() {
    const { message } = this.props;

    return (
      <Toast visible={message.visible} text={message.text} />
    )
  }
}


ToastContainer.propTypes = {
  message: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  message: state.layout.message
});

export default connect(mapStateToProps, { hideMessage })(ToastContainer);
