import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
import Days from './Days';
import {
  getDateByDays,
  totalWeeks,
  lastYearToday,
  todayInWeek,
  lastYearTodayInWeek
} from '../helpers/date';

export default class Weeks extends Component {
  _renderWeeks = () => {
    let daysInWeek;
    let startDate;
    let type;
    const { dataset, maxCount, mouseOverHandler, mouseOutHandler, height, width } = this.props;
    const weeks = [];
    const xScale = d3.scale.ordinal()
      .domain(d3.range(totalWeeks))
      .rangeBands([0, width]);
    for (let i = 0; i < totalWeeks; i++) {
      if (i === 0) {
        daysInWeek = lastYearTodayInWeek + 1;
        startDate = lastYearToday;
        type = 'first-week';
      } else if (i === totalWeeks - 1) {
        daysInWeek = todayInWeek + 1;
        startDate = getDateByDays(startDate, 7);
        type = 'last-week';
      } else {
        daysInWeek = 7;
        startDate = getDateByDays(startDate, 7);
        type = 'normal';
      }
      weeks.push(
        <g
          key={i}
          transform={'translate(' + xScale(i) + ', 0)'} // eslint-disable-line
        >
          <Days
            dataset={dataset}
            daysInWeek={daysInWeek}
            height={height}
            maxCount={maxCount}
            mouseOverHandler={mouseOverHandler}
            mouseOutHandler={mouseOutHandler}
            startDate={startDate}
            type={type}
            left={xScale(i)}
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
  dataset: PropTypes.object,
  maxCount: PropTypes.number,
  mouseOverHandler: PropTypes.func,
  mouseOutHandler: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
};
