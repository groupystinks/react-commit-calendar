import React, { Component, PropTypes } from 'react';

export default class CommitCalendar extends Component {
  render() {
    return (
      <svg
        height={this.props.height}
        width={this.props.width}
      >
        <g><rect fill="black" width={10} height={10} x={10} y={10} /></g>
      </svg>
    );
  }
}

CommitCalendar.propTypes = {
  data: PropTypes.object.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  unit: PropTypes.string,
};

CommitCalendar.defaultProps = {
  height: 110,
  width: 720,
  unit: 'contributions',
};
