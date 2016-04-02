import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
import Days from './Days';
import {
  totalWeeks,
  lastYearToday,
  today,
  todayInWeek,
  lastYearTodayInWeek
} from 'helpers/date';

export default class Weeks extends Component {
  _renderWeeks = () => {
    let daysInWeek;
    let type;
    const { height, width } = this.props;
    const weeks = [];
    const xScale = d3.scale.ordinal()
      .domain(d3.range(totalWeeks))
      .rangeBands([0, width]);
    for (let i = 0; i < totalWeeks; i++) {
      if (i === 0) {
        daysInWeek = lastYearTodayInWeek + 1;
        type = 'first-week';
      } else if (i === totalWeeks - 1) {
        daysInWeek = todayInWeek + 1;
        type = 'last-week';
      } else {
        daysInWeek = 7;
        type = 'normal';
      }
      weeks.push(
        <g
          key={i}
          transform={'translate(' + xScale(i) + ', 0)'} // eslint-disable-line
        >
          <Days
            daysInWeek={daysInWeek}
            height={height}
            type={type}
          />
        </g>
      );
    }
    return weeks;
  }
  render() {
    const weeks = this._renderWeeks();
    return (
      <g>
        {weeks}
      </g>
    );
  }
}

Weeks.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};
