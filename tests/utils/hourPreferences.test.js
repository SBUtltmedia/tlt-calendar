import * as utils from '../../src/utils/hourPreferences';

describe('hour preferences utils', () => {
  it('initializes cells to zero', () => {
    const result = utils.initializeCells();
    expect(result.length).toBe(48 * 7);
    expect(result[50]).toBe(0);
  });

  it('toggles cell', () => {
    expect(utils.toggleCell([1, 2, 3], {day: 0, hour: 0, minute: 0})).toEqual([2, 2, 3]);
    expect(utils.toggleCell([1, 2, 4], {day: 0, hour: 1, minute: 0})).toEqual([1, 2, 0]);
  });

  it('gets cell value', () => {
    expect(utils.getCellValue([1, 2, 3], {day: 0, hour: 0, minute: 30})).toBe(2);
  });

  it('gets average value', () => {
    expect(utils.getAverageCellValue([1, 2, 3])).toBe(2);
    expect(utils.getAverageCellValue([0, 0, 0, 1, 2, 3])).toBe(2);
  })
});
