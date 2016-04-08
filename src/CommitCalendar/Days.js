import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
import { getDateByDays } from '../helpers/date';
import { getCount } from '../helpers/getDataFromDataset';

export default class Days extends Component {
  _mouseOverHandler = (date, left) => {
    const { mouseOverHandler } = this.props;
    const node = this.refs[date];
    mouseOverHandler(date, { left, top: node.getAttribute('y') });
  }
  _mouseOutHandler = () => {
    const { mouseOutHandler } = this.props;
    mouseOutHandler();
  }
  render() {
    const days = [];
    const { colors, dataset, daysInWeek, height, maxCount, left, startDate, type } = this.props;

    // TODO: 1. if maxCount is below specific number, let's not making any colorScale

    const colorLevels = colors.length;
    const colorScale = d3.scale.threshold()
      .domain([
        (maxCount + 1) / colorLevels,
        (maxCount + 1) * 2 / colorLevels,
        (maxCount + 1) * 3 / colorLevels
      ])
      .range(colors);
    const yScale = d3.scale.ordinal()
      .domain(d3.range(7))
      .rangeBands([0, height], 0.5, 0.8);
    for (let i = 0; i < daysInWeek; i++) {
      const date = getDateByDays(startDate, i).toJSON().slice(0, 10);
      const count = getCount(dataset, date);
      const bindMouseOver = this._mouseOverHandler.bind(this, date, left);
      days.push(
        <rect
          key={i}
          data-date={date}
          height={10}
          fill={count ? colorScale(count) : '#eee'}
          onMouseOver={bindMouseOver}
          onMouseOut={this._mouseOutHandler}
          ref={date}
          width={10}
          y={(type === 'first-week') ? yScale(7 - daysInWeek + i) : yScale(i)}
        >
        </rect>
      );
    }
    return (
      <g>
      { days }
      </g>
    );
  }
}


Days.propTypes = {
  colors: PropTypes.array,
  dataset: PropTypes.object,
  daysInWeek: PropTypes.number,
  height: PropTypes.number.isRequired,
  maxCount: PropTypes.number,
  mouseOverHandler: PropTypes.func,
  mouseOutHandler: PropTypes.func,
  left: PropTypes.number,
  startDate: PropTypes.object,
  type: PropTypes.string,
};

Days.defaultProps = {
  daysInWeek: 7,
  maxCount: 0,
  type: 'normal',
};
