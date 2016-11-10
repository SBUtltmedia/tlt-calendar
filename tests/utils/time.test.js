import * as utils from '../../src/utils/time';

describe('time utils', () => {
  it('gets the index of a cell from day, hour, minute', () => {
    expect(utils.timeToIndex({day: 0, hour: 0, minute: 0})).toBe(0);
    expect(utils.timeToIndex({day: 0, hour: 0, minute: 30})).toBe(1);
    expect(utils.timeToIndex({day: 0, hour: 1, minute: 30})).toBe(3);
    expect(utils.timeToIndex({day: 0, hour: 20, minute: 30})).toBe(41);
    expect(utils.timeToIndex({day: 0, hour: 23, minute: 30})).toBe(47);
    expect(utils.timeToIndex({day: 1, hour: 0, minute: 0})).toBe(48);
  });
});
