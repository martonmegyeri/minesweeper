import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './PerspectiveContainer.scss';


class PerspectiveContainer extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
    mode3D: PropTypes.bool.isRequired
  };

  state = {
    counter: 0,
    updateRate: 10,
    originX: 0,
    originY: 0,
    x: 0,
    y: 0,
    style: {}
  };

  componentDidMount() {
    if (this.props.mode3D) {
      const innerElement = this.inner.current;
      var viewportOffset = innerElement.getBoundingClientRect();
      var top = viewportOffset.top;
      var left = viewportOffset.left;

      this.setState({
        originX: left + Math.floor(innerElement.offsetWidth / 2),
        originY: top + Math.floor(innerElement.offsetHeight / 2)
      });
    }
  }

  inner = React.createRef();

  isTimeToUpdate = () => {
    return new Promise((resolve, reject) => {
      this.setState({ counter: this.state.counter + 1 }, () => {
        resolve(this.state.counter % this.state.updateRate === 0);
      });
    });
  };

  updatePosition = (clientX, clientY) => {
    this.setState({
      x: clientX - this.state.originX,
      y: (clientY - this.state.originY) * -1
    });
  };

  update = (clientX, clientY) => {
    this.updatePosition(clientX, clientY);

    this.updateTransformStyle(
      (this.state.y / this.inner.current.offsetHeight / 2).toFixed(2),
      (this.state.x / this.inner.current.offsetWidth / 2).toFixed(2)
    );
  };

  updateTransformStyle = (x, y) => {
    var style = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
    this.setState({
      style: {
        transform: style,
        WebkitTransform: style,
        MozTransform: style,
        msTransform: style,
        OTransform: style
      }
    });
  };

  onMouseEnterHandler = event => {
    this.update(event);
  };

  onMouseLeaveHandler = () => {
    this.setState({
      counter: 0,
      style: {}
    });
  };

  onMouseMoveHandler = async event => {
    const clientX = event.clientX;
    const clientY = event.clientY;

    const timeToUpdate = await this.isTimeToUpdate();

    if (timeToUpdate) {
      this.update(clientX, clientY);
    }
  };

  render() {
    if (this.props.mode3D) {
      return (
        <div
          className="perspective-container"
          onMouseEnter={this.onMouseEnterHandler}
          onMouseLeave={this.onMouseLeaveHandler}
          onMouseMove={this.onMouseMoveHandler}
        >
          <div
            className="perspective-container-inner"
            style={this.state.style}
            ref={this.inner}
          >
            {this.props.children}
          </div>
        </div>
      );
    } else {
      return (
        this.props.children
      );
    }
  }
}


const mapStateToProps = (state) => ({
  mode3D: state.layout.mode3D
});

export default connect(mapStateToProps, null)(PerspectiveContainer);
