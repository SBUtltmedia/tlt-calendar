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
    const chip1 = {value: 1, day: 0, hour: 0, minute: 0, duration: HOUR};
    expect([undefined]).to.deep.equal(utils.clearSlot([chip1], 0, 0, 0, HOUR));
    expect([undefined]).to.deep.equal(utils.clearSlot([chip1], 0, 0, 0, HALF_HOUR));
    expect([undefined]).to.deep.equal(utils.clearSlot([chip1], 0, 0, 30, HALF_HOUR));
  });

  it('places a chip', () => {
    const chip1 = {value: 1, day: 0, hour: 0, minute: 0};
    const chip2 = {value: 2, day: 0, hour: 0, minute: 30};
    const chip3 = {value: 3, day: 0, hour: 0, minute: 60};
    expect([1, 2, 2]).to.deep.equal(utils.placeChip([1, 1], chip2));
    expect([1, 2, 2, 3]).to.deep.equal(utils.placeChip([1, 1, 3, 3], chip2));
  });
});
