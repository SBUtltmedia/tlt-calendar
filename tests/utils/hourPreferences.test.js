import { expect } from 'chai';
import * as utils from '../../src/utils/hourPreferences';

describe('getIndex', () => {
  it('gets the index of a cell from day, hour, minutes', () => {
    expect(utils.getIndex(0, 0, 0)).to.deep.equal(0);
    expect(utils.getIndex(0, 0, 30)).to.deep.equal(1);
    expect(utils.getIndex(0, 1, 30)).to.deep.equal(3);
    expect(utils.getIndex(1, 0, 0)).to.deep.equal(48);
  });
});
