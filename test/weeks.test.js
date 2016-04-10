import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import Weeks from '../src/CommitCalendar/Weeks';
import expectJSX from 'expect-jsx';
import { lastYearToday } from '../src/helpers/date';
expect.extend(expectJSX);

describe('rendering Weeks', () => {
  it('should include last year today', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Weeks height={110} width={720} />);
    const actual = renderer.getRenderOutput();
    const expected = lastYearToday.toString();
    expect(actual).toIncludeJSX(expected);
  });
  it('should contain 365 days', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Weeks height={110} width={720} />);
    const actual = renderer.getRenderOutput().props.children.reduce(
      (acc, previous) => acc + previous.props.children[1].props.daysInWeek
    , 0);
    const expected = 365;
    expect(actual).toEqual(expected);
  });
});
