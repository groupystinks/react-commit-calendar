import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
import { getDateByDays } from '../helpers/date';
import { getCount, getMaxCount } from '../helpers/getDataFromDataset';

export default class Days extends Component {
  render() {
    const days = [];
    const { dataset, daysInWeek, height, maxCount, startDate, type } = this.props;
    const yScale = d3.scale.ordinal()
      .domain(d3.range(7))
      .rangeBands([0, height], 0.5, 0.8);
    for (let i = 0; i < daysInWeek; i++) {
      const date = getDateByDays(startDate, i).toJSON().slice(0, 10);
      const count = getCount(dataset, date);
      const colorScale = d3.scale.threshold(0.5)
        .domain([1, (maxCount + 1) / 2, maxCount]) // range should come from dataset
        .range(['#F2D5B2', '#F6BD77', '#FAA43B', '#FF8C00']);
      days.push(
        <rect
          key={i}
          data-date={date}
          height={10}
          fill={count ? colorScale(count) : '#eee'}
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
  dataset: PropTypes.object,
  daysInWeek: PropTypes.number,
  height: PropTypes.number.isRequired,
  maxCount: PropTypes.number,
  startDate: PropTypes.object,
  type: PropTypes.string,
};

Days.defaultProps = {
  daysInWeek: 7,
  maxCount: 0,
  type: 'normal',
};
