import React, { Component, PropTypes } from 'react';
import Weeks from './Weeks';
import { getMaxCount } from '../helpers/getDataFromDataset';

export default class CommitCalendar extends Component {
  render() {
    const maxCount = getMaxCount(this.props.dataset);
    return (
      <svg
        height={this.props.height}
        width={this.props.width}
      >
        <Weeks
          dataset={this.props.dataset}
          height={this.props.height}
          maxCount={maxCount}
          width={this.props.width}
        />
      </svg>
    );
  }
}

CommitCalendar.propTypes = {
  dataset: PropTypes.object.isRequired,
  fromColor: PropTypes.string,
  toColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  unit: PropTypes.string,
};

CommitCalendar.defaultProps = {
  height: 110,
  width: 720,
  fromColor: '00ff00',
  toColor: '#00b300',
  unit: 'contributions',
};
