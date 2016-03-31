import expect from 'expect';
import { getDateByDays } from '../src/helpers/date';

describe('functionality should be cool', () => {
  it('should return correct date by adding', () => {
    const today = new Date();
    const actual = getDateByDays(today, 1).toJSON().slice(0, 10);
    const expected = new Date('2016-04-01').toJSON().slice(0, 10);
    expect(actual).toEqual(expected);
  });
});
