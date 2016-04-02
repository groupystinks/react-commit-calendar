import React, { Component, PropTypes } from 'react';
import Weeks from './Weeks';

export default class CommitCalendar extends Component {
  render() {
    return (
      <svg
        height={this.props.height}
        width={this.props.width}
      >
        <Weeks
          height={this.props.height}
          width={this.props.width}
        />
      </svg>
    );
  }
}

CommitCalendar.propTypes = {
  data: PropTypes.object.isRequired,
  fromColor: PropTypes.string,
  toColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  unit: PropTypes.string,
};

CommitCalendar.defaultProps = {
  height: 110,
  width: 720,
  unit: 'contributions',
};
