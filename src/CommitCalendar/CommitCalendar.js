import React, { Component, PropTypes } from 'react';
import Weeks from './Weeks';
import { getMaxCount } from '../helpers/getDataFromDataset';

export default class CommitCalendar extends Component {
  constructor() {
    super();
    this.state = {
      isTipShown: false,
      date: '',
      position: {
        left: 0,
        top: 0
      }
    };
  }
  mouseOverHandler = (date, position) => {
    this.setState({
      isTipShown: true,
      date,
      position: {
        left: position.left,
        top: position.top,
      }
    });
  }
  mouseOutHandler = () => {
    this.setState({ isTipShown: false });
  }
  _rendertip = () => {
    if (!this.state.isTipShown) { return null; }
    const { dataset, unit } = this.props;
    const { date, position } = this.state;
    const count = dataset[date] ? dataset[date].count : 0;
    const tipText = date.concat(' ').concat(count).concat(' ').concat(unit);
    return (
      <g>
        <rect
          fill={'black'}
          width={200}
          height={30}
          y={`${position.top - 30}`}
          x={`${position.left - 50}`}
        >
        </rect>
        <text
          fill={'#fff'}
          y={`${position.top - 15}`}
          x={`${position.left - 50}`}
        >
          {tipText}
        </text>
      </g>
    );
  }
  render() {
    const maxCount = getMaxCount(this.props.dataset);
    const tip = this._rendertip();
    return (
      <svg
        height={this.props.height}
        width={this.props.width}
      >
        <Weeks
          dataset={this.props.dataset}
          height={this.props.height}
          maxCount={maxCount}
          mouseOverHandler={this.mouseOverHandler}
          mouseOutHandler={this.mouseOutHandler}
          width={this.props.width}
        />
        {tip}
      </svg>
    );
  }
}

CommitCalendar.propTypes = {
  dataset: PropTypes.object.isRequired,
  fromColor: PropTypes.string,
  height: PropTypes.number,
  mouseOverHandler: PropTypes.func,
  mouseOutHandler: PropTypes.func,
  toColor: PropTypes.string,
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
