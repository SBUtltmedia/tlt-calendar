import { expect } from 'chai';
import * as utils from '../../src/utils/hourPreferences';
import { HOUR, HALF_HOUR } from '../../src/constants/Constants';

describe('getIndex', () => {
  it('gets the index of a cell from day, hour, minute', () => {
    expect(utils.getIndex(0, 0, 0)).to.equal(0);
    expect(utils.getIndex(0, 0, 30)).to.equal(1);
    expect(utils.getIndex(0, 1, 30)).to.equal(3);
    expect(utils.getIndex(0, 23, 30)).to.equal(47);
    expect(utils.getIndex(1, 0, 0)).to.equal(48);
  });

  it('clears a slot', () => {
    expect(utils.clearSlot([1, 1], 0, 0, 0, HOUR)).to.deep.equal([undefined, undefined]);
    expect(utils.clearSlot([1, 1], 0, 0, 0, HALF_HOUR)).to.deep.equal([undefined, 1]);
    expect(utils.clearSlot([1, 1], 0, 0, 30, HALF_HOUR)).to.deep.equal([1, undefined]);
  });

  it('places a chip', () => {
    const chip1 = {value: 1, day: 0, hour: 0, minute: 0};
    const chip2 = {value: 2, day: 0, hour: 0, minute: 30};
    const chip3 = {value: 3, day: 0, hour: 0, minute: 60};
    expect([1, 2, 2]).to.deep.equal(utils.placeChip([1, 1], chip2));
    expect([1, 2, 2, 3]).to.deep.equal(utils.placeChip([1, 1, 3, 3], chip2));
  });

  it('gets chip counts', () => {
    expect([0, 0, 0, 0]).to.deep.equal(utils.getChipCounts([]));
    expect([0, 0, 0, 0]).to.deep.equal(utils.getChipCounts([undefined]));
    expect([1, 0, 0, 0]).to.deep.equal(utils.getChipCounts([1]));
    expect([1, 0, 0, 0]).to.deep.equal(utils.getChipCounts([1, 1]));
    expect([1, 1, 1, 1]).to.deep.equal(utils.getChipCounts([1, 1, 2, 2, 3, 3, 4, 4]));
    expect([2, 1, 1, 1]).to.deep.equal(utils.getChipCounts([1, 1, 2, 2, 3, 3, 4, 4, 1]));
  });

  it('gets number of open chip sets', () => {
    expect(1).to.equal(utils.getNumOpenChipSets([]));
    expect(1).to.equal(utils.getNumOpenChipSets([undefined]));
    expect(1).to.equal(utils.getNumOpenChipSets([1]));
    expect(2).to.equal(utils.getNumOpenChipSets([1, 1, 2, 2, 3, 3, 4, 4]));
  });
});
