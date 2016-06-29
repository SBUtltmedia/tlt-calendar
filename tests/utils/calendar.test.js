import { expect } from 'chai';
import * as utils from '../../src/utils/calendar';
import { HOUR, HALF_HOUR } from '../../src/constants/Constants';

describe('calendar', () => {
  it('gets the index of a cell from day, hour, minute', () => {
    expect(utils.getIndex(0, 0, 0)).to.equal(0);
    expect(utils.getIndex(0, 0, 30)).to.equal(1);
    expect(utils.getIndex(0, 1, 30)).to.equal(3);
    expect(utils.getIndex(0, 23, 30)).to.equal(47);
    expect(utils.getIndex(1, 0, 0)).to.equal(48);
  });

});