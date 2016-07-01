import { expect } from 'chai';
import * as utils from '../../src/utils/hourPreferences';
import { HOUR, HALF_HOUR } from '../../src/constants/Constants';

describe('hourPreferences', () => {

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
