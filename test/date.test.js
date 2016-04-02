import expect from 'expect';
import { getDateByDays } from '../src/helpers/date';

describe('functionality should be cool', () => {
  it('should return correct date by adding/substracting days', () => {
    const testDate = new Date('2016-03-31');
    const actual = getDateByDays(testDate, 1).toJSON().slice(0, 10);
    const expected = new Date('2016-04-01').toJSON().slice(0, 10);
    expect(actual).toEqual(expected);
  });
});
