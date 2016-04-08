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
    const { dataset, unit, marginLeft, marginTop } = this.props;
    const { date, position } = this.state;
    const count = dataset[date] ? dataset[date].count : 0;
    const tipText = date.concat(' ').concat(count).concat(' ').concat(unit);
    return (
        <div style={{
          backgroundColor: 'rgba(80, 80, 80, 0.8)',
          borderRadius: '2px',
          color: '#fff',
          position: 'absolute',
          top: position.top - 21 + marginTop + 'px', // eslint-disable-line
          left: position.left - 80 + marginLeft + 'px', // eslint-disable-line
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
    const { marginBottom, marginLeft, marginRight, marginTop, height, width } = this.props;
    const svgHeight = height + marginTop + marginBottom;
    const svgWidth = width + marginLeft + marginRight;
    const maxCount = getMaxCount(this.props.dataset);
    const tip = this._rendertip();
    return (
      <div>
        <svg
          height={svgHeight}
          width={svgWidth}
        >
          <g
            transform={'translate(' + marginLeft + ', ' + marginTop + ')'} // eslint-disable-line
          >
            <Weeks
              {...this.props}
              maxCount={maxCount}
              mouseOverHandler={this.mouseOverHandler}
              mouseOutHandler={this.mouseOutHandler}
            />
          </g>
        </svg>
        {tip}
      </div>
    );
  }
}

CommitCalendar.propTypes = {
  dataset: PropTypes.object.isRequired,
  colors: PropTypes.array,
  height: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  mouseOverHandler: PropTypes.func,
  mouseOutHandler: PropTypes.func,
  width: PropTypes.number,
  unit: PropTypes.string,
};

CommitCalendar.defaultProps = {
  height: 110,
  width: 720,
  colors: ['#d6e685', '#8cc665', '#44a340', '#1e6823'],
  marginBottom: 0,
  marginLeft: 80,
  marginRight: 0,
  marginTop: 20,
  unit: 'contributions',
};
