import { expect } from 'chai';
import * as utils from '../../src/utils/hourPreferences';
import { HOUR, HALF_HOUR } from '../../src/constants/Constants';

describe('hourPreferences', () => {

  it('removes a chip', () => {
    expect(utils.removeChip([1, 1], {day: 0, hour: 0, minute: 0, duration: HOUR})).to.deep.equal([undefined, undefined]);
    expect(utils.removeChip([1, 1], {day: 0, hour: 0, minute: 0, duration: HALF_HOUR})).to.deep.equal([undefined, 1]);
    expect(utils.removeChip([1, 1], {day: 0, hour: 0, minute: 30, duration: HALF_HOUR})).to.deep.equal([1, undefined]);
  });

  it('places a chip', () => {
    const chip1 = {value: 1, day: 0, hour: 0, minute: 0};
    const chip2 = {value: 2, day: 0, hour: 0, minute: 30};
    const chip3 = {value: 3, day: 0, hour: 0, minute: 60};
    expect(utils.placeChip([], chip2)).to.deep.equal([undefined, 2, 2]);
    expect(utils.placeChip([1, 1], chip2)).to.deep.equal([1, 2, 2]);
    expect(utils.placeChip([1, 1, 3, 3], chip2)).to.deep.equal([1, 2, 2, 3]);
  });

  it('gets chip counts', () => {
    expect(utils.getChipCounts([])).to.deep.equal([0, 0, 0, 0]);
    expect(utils.getChipCounts([undefined])).to.deep.equal([0, 0, 0, 0]);
    expect(utils.getChipCounts([1])).to.deep.equal([1, 0, 0, 0]);
    expect(utils.getChipCounts([1, 1])).to.deep.equal([1, 0, 0, 0]);
    expect(utils.getChipCounts([1, 1, 2, 2, 3, 3, 4, 4])).to.deep.equal([1, 1, 1, 1]);
    expect(utils.getChipCounts([1, 1, 2, 2, 3, 3, 4, 4, 1])).to.deep.equal([2, 1, 1, 1]);
  });

  it('gets number of open chip sets', () => {
    expect(utils.getNumOpenChipSets([])).to.equal(1);
    expect(utils.getNumOpenChipSets([undefined])).to.equal(1);
    expect(utils.getNumOpenChipSets([1])).to.equal(1);
    expect(utils.getNumOpenChipSets([1, 1, 2, 2, 3, 3, 4, 4])).to.equal(2);
  });
});
