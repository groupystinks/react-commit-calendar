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
  _renderIndicator = () => {
    const { colors, marginLeft, isRenderIndicator } = this.props;
    if (!isRenderIndicator) {return null;}
    const colorStrips = [];
    colors.forEach((color, idx) =>
      colorStrips.push(
        <li
          key={idx}
          style={{ backgroundColor: color,
            marginLeft: '3px',
            width: '10px',
            display: 'inline-block',
            height: '10px' }}
        >
        </li>
      )
    );
    return (
      <div
        style={{ marginLeft }}
      >
        <span>Less</span>
        <ul style={{ display: 'inline', padding: '3px' }}>
          <li
            style={{ backgroundColor: '#eee',
              marginLeft: '3px',
              width: '10px',
              display: 'inline-block',
              height: '10px' }}
          >
          </li>
          {colorStrips}
        </ul>
        <span>More</span>
      </div>
    );
  }
  _renderWeekMark = () => {
    const weekMarks = [];
    const { marginLeft, marginTop } = this.props;
    const marks = ['Sun', 'M', 'Tue', 'W', 'Thu', 'F', 'Sat'];
    marks.forEach((mark, idx) => {
      if (idx % 2 === 1) {
        weekMarks.push(
          <text
            textAnchor="middle"
            dx={marginLeft - 10}
            dy={marginTop + 20 + (13.5 * idx)}
            fill="#ccc"
            fontFamily="Verdana"
            fontSize="11"
            key={idx}
          >
            {mark}
          </text>
        );
      }
    });
    return weekMarks;
  }
  _rendertip = () => {
    if (!this.state.isTipShown) { return null; }
    const containerNode = this.refs.svgContainer;
    const rect = containerNode.getBoundingClientRect();
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
          top: position.top - 28 + rect.top + marginTop + 'px', // eslint-disable-line
          left: position.left - 89 + rect.left + marginLeft + 'px', // eslint-disable-line
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
    const weekMarks = this._renderWeekMark();
    const indicator = this._renderIndicator();
    return (
      <div
        ref={'svgContainer'}
      >
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
          {weekMarks}
        </svg>
        {tip}
        {indicator}
      </div>
    );
  }
}

CommitCalendar.propTypes = {
  dataset: PropTypes.object.isRequired,
  colors: PropTypes.array,
  height: PropTypes.number,
  isRenderIndicator: PropTypes.bool,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  width: PropTypes.number,
  unit: PropTypes.string,
};

CommitCalendar.defaultProps = {
  height: 110,
  width: 720,
  colors: ['#d6e685', '#8cc665', '#44a340', '#1e6823'],
  isRenderIndicator: true,
  marginBottom: 0,
  marginLeft: 80,
  marginRight: 0,
  marginTop: 20,
  unit: 'contributions',
};
