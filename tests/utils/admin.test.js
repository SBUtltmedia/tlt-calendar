import { expect } from 'chai';
import * as utils from '../../src/utils/admin';
import { HOUR, HALF_HOUR, RESERVED } from '../../src/constants/Constants';

const R = { name: RESERVED };

describe('admin', () => {

  it('removes a reserve', () => {
    expect(utils.removeItem([R, R], {day: 0, hour: 0, minute: 0, duration: HOUR})).to.deep.equal([undefined, undefined]);
    expect(utils.removeItem([R, R], {day: 0, hour: 0, minute: 0, duration: HALF_HOUR})).to.deep.equal([undefined, R]);
    expect(utils.removeItem([R, R], {day: 0, hour: 0, minute: 30, duration: HALF_HOUR})).to.deep.equal([R, undefined]);
  });

  it('places a reserve', () => {
    const reserve1 = {day: 0, hour: 0, minute: 0};
    const reserve2 = {day: 0, hour: 0, minute: 30};
    const reserve3 = {day: 0, hour: 0, minute: 60};
    expect(utils.placeReserve([], reserve2)).to.deep.equal([undefined, R, R]);
    expect(utils.placeReserve([R, R], reserve2)).to.deep.equal([R, R, R]);
    expect(utils.placeReserve([R, R, R, R], reserve2)).to.deep.equal([R, R, R, R]);
  });
});
