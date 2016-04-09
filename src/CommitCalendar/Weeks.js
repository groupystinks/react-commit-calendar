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
  shouldComponentUpdate() {
    return false;
  }
  _renderMonthMark = (currentMonth) => {
    const marks = {
      1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
      7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
    };
    return (
      <text
        textAnchor="middle"
        fill="#ccc"
        fontFamily="Verdana"
        fontSize="11"
      >
        {marks[currentMonth]}
      </text>
    );
  };
  _renderWeeks = () => {
    let daysInWeek;
    let startDate;
    let type;
    let currentMonth;
    let monthMark;
    const { width } = this.props;
    const weeks = [];
    const xScale = d3.scale.ordinal()
      .domain(d3.range(totalWeeks))
      .rangeBands([0, width]);
    for (let i = 0; i < totalWeeks; i++) {
      if (i === 0) {
        daysInWeek = 7 - (lastYearTodayInWeek + 1) + 1;
        startDate = lastYearToday;
        currentMonth = parseInt(startDate.toJSON().slice(0, 10).split('-')[1], 10);
        monthMark = this._renderMonthMark(currentMonth, xScale(i));
        type = 'first-week';
      } else if (i === 1) {
        startDate = getDateByDays(startDate, daysInWeek);
        daysInWeek = 7;
        const month = parseInt(startDate.toJSON().slice(0, 10).split('-')[1], 10);
        if (month === currentMonth) {
          monthMark = null;
        } else {
          currentMonth = month;
          monthMark = this._renderMonthMark(currentMonth, xScale(i));
        }
      } else if (i === totalWeeks - 1) {
        daysInWeek = todayInWeek + 1;
        startDate = getDateByDays(startDate, 7);
        const month = parseInt(startDate.toJSON().slice(0, 10).split('-')[1], 10);
        if (month === currentMonth) {
          monthMark = null;
        } else {
          currentMonth = month;
          monthMark = this._renderMonthMark(currentMonth, xScale(i));
        }
        type = 'last-week';
      } else {
        daysInWeek = 7;
        startDate = getDateByDays(startDate, 7);
        const month = parseInt(startDate.toJSON().slice(0, 10).split('-')[1], 10);
        if (month === currentMonth) {
          monthMark = null;
        } else {
          currentMonth = month;
          monthMark = this._renderMonthMark(currentMonth, xScale(i));
        }
        type = 'normal';
      }
      weeks.push(
        <g
          key={i}
          transform={'translate(' + xScale(i) + ', 0)'} // eslint-disable-line
        >
          {monthMark}
          <Days
            {...this.props}
            daysInWeek={daysInWeek}
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
