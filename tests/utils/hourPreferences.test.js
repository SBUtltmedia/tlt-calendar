import { expect } from 'chai';
import * as utils from '../../src/utils/hourPreferences';
import { TWO_HOURS, HOUR, HALF_HOUR } from '../../src/constants/Constants';

describe('hourPreferences', () => {

  it('gets chip counts', () => {
    expect(utils.getChipCounts({})).to.deep.equal([0, 0, 0, 0]);
    expect(utils.getChipCounts({"0": {value: 1, duration: HALF_HOUR}})).to.deep.equal([1, 0, 0, 0]);
    expect(utils.getChipCounts({"0": {value: 1, duration: HOUR}})).to.deep.equal([1, 0, 0, 0]);
    expect(utils.getChipCounts({"0": {value: 1, duration: TWO_HOURS}})).to.deep.equal([2, 0, 0, 0]);
  });

  it('gets number of open chip sets', () => {
    expect(utils.getNumOpenChipSets({"0": {value: 1, duration: HALF_HOUR}})).to.equal(1);
    expect(utils.getNumOpenChipSets({
      "0": {value: 1, duration: HOUR},
      "60": {value: 2, duration: HOUR},
      "120": {value: 3, duration: HOUR},
      "180": {value: 4, duration: HOUR}
    })).to.equal(2);
  });
});
