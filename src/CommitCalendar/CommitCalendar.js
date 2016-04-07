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
        <div style={{
          backgroundColor: 'rgba(80, 80, 80, 0.8)',
          borderRadius: '2px',
          color: '#fff',
          position: 'absolute',
          top: position.top - 21 + 'px', // eslint-disable-line
          left: position.left - 80 + 'px', // eslint-disable-line
          height: '20px',
          width: '200px',
          textAlign: 'center' }}
        >
          {tipText}
          <div style={{
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid rgba(40, 40, 40, 1)',
            height: '0px',
            width: '0px',
            margin: '3px',
            position: 'absolute',
            top: 18 + 'px', // eslint-disable-line
            left: 85 + 'px'}} // eslint-disable-line
          >
          </div>
        </div>
    );
  }
  render() {
    const maxCount = getMaxCount(this.props.dataset);
    const tip = this._rendertip();
    return (
      <div>
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
        </svg>
        {tip}
      </div>
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
