import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
import { getDateByDays } from '../helpers/date';

export default class Days extends Component {
  render() {
    const days = [];
    const { daysInWeek, height, startDate, type } = this.props;
    const yScale = d3.scale.ordinal()
      .domain(d3.range(7))
      .rangeBands([0, height], 0.5, 0.8);
    for (let i = 0; i < daysInWeek; i++) {
      days.push(
        <rect
          key={i}
          data-date={getDateByDays(startDate, i).toJSON().slice(0, 10)}
          height={10}
          fill="grey"
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
  daysInWeek: PropTypes.number,
  height: PropTypes.number.isRequired,
  startDate: PropTypes.object,
  type: PropTypes.string,
};

Days.defaultProps = {
  daysInWeek: 7,
  type: 'normal',
};
