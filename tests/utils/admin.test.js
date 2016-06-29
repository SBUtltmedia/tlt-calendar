import { expect } from 'chai';
import * as utils from '../../src/utils/admin';
import { HOUR, HALF_HOUR } from '../../src/constants/Constants';

describe('admin', () => {

  it('removes a reserve', () => {
    expect(utils.removeReserve([true, true], {day: 0, hour: 0, minute: 0, duration: HOUR})).to.deep.equal([undefined, undefined]);
    expect(utils.removeReserve([true, true], {day: 0, hour: 0, minute: 0, duration: HALF_HOUR})).to.deep.equal([undefined, true]);
    expect(utils.removeReserve([true, true], {day: 0, hour: 0, minute: 30, duration: HALF_HOUR})).to.deep.equal([true, undefined]);
  });

  it('places a reserve', () => {
    const reserve1 = {day: 0, hour: 0, minute: 0};
    const reserve2 = {day: 0, hour: 0, minute: 30};
    const reserve3 = {day: 0, hour: 0, minute: 60};
    expect(utils.placeReserve([], reserve2)).to.deep.equal([undefined, true, true]);
    expect(utils.placeReserve([true, true], reserve2)).to.deep.equal([true, true, true]);
    expect(utils.placeReserve([true, true, true, true], reserve2)).to.deep.equal([true, true, true, true]);
  });
});
