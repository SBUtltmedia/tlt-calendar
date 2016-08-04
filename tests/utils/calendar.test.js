import { expect } from 'chai';
import { timeToKey, removeItem, placeItem, getItemsInSlot } from '../../src/utils/calendar';
import { HOUR, HALF_HOUR } from '../../src/constants/Constants';

describe('calendar', () => {
  it('gets the string key of a cell from day, hour, minute', () => {
    expect(timeToKey(0, 0, 0)).to.equal("0");
    expect(timeToKey(0, 0, 30)).to.equal("30");
    expect(timeToKey(0, 1, 30)).to.equal("90");
    expect(timeToKey(0, 23, 30)).to.equal("1410");
    expect(timeToKey(1, 0, 0)).to.equal("1440");
  });

  it('places an item (max = 1)', () => {
    const item1 = {value: 1, day: 0, hour: 0, minute: 0, duration: HOUR};
    const item2 = {value: 2, day: 0, hour: 0, minute: 30, duration: HALF_HOUR};
    const item3 = {value: 3, day: 0, hour: 0, minute: 60, duration: HALF_HOUR};
    expect(placeItem({}, item2)).to.deep.equal({"30": item2});
    expect(placeItem({"30": item2, "60": item3}, item1)).to.deep.equal({"0": item1, "60": item3});
  });

  it('places an item (max = 2)', () => {
    const MAX = 2;
    const item1 = {value: 1, day: 0, hour: 0, minute: 0, duration: HOUR};
    const item2 = {value: 2, day: 0, hour: 0, minute: 30, duration: HALF_HOUR};
    const item3 = {value: 3, day: 0, hour: 0, minute: 60, duration: HALF_HOUR};
    expect(placeItem({}, item2, MAX)).to.deep.equal({"30": [item2]});
    expect(placeItem({"30": [item2], "60": [item3]}, item1, MAX)).to.deep.equal({"0": [item1], "30": [item2], "60": [item3]});
  });

  it('removes an item', () => {
    const item2 = {value: 2, day: 0, hour: 0, minute: 30, duration: HALF_HOUR};
    const items = placeItem({}, item2);
    expect(removeItem(items, item2)).to.deep.equal({});
  });

  it('gets items in a slot (granularity = HOUR)', () => {
    const item2 = {value: 2, day: 0, hour: 0, minute: 30, duration: HALF_HOUR};
    const item3 = {value: 3, day: 0, hour: 1, minute: 0, duration: HALF_HOUR};
    const items = {"30": item2, "60": item3};
    expect(getItemsInSlot(items, {day: 0, hour: 0})).to.deep.equal([item2]);
    expect(getItemsInSlot(items, {day: 0, hour: 1})).to.deep.equal([item3]);
  });

  it('gets items in a slot (granularity = HALF_HOUR) 1', () => {
    const item1 = {value: 1, day: 0, hour: 0, minute: 30, duration: HOUR};
    const item2 = {value: 2, day: 0, hour: 1, minute: 30, duration: HOUR};
    const items = {"30": item1, "90": item2};
    const expected = [
      {value: 1, day: 0, hour: 1, minute: 0, duration: HALF_HOUR},
      {value: 2, day: 0, hour: 1, minute: 30, duration: HALF_HOUR}
    ];
    expect(getItemsInSlot(items, {day: 0, hour: 1, defaultGranularity: HALF_HOUR})).to.deep.equal(expected);
  });

  it('gets items in a slot (granularity = HALF_HOUR) 2', () => {
    const item1 = {value: 1, day: 0, hour: 0, minute: 30, duration: HOUR};
    const item2 = {value: 2, day: 0, hour: 1, minute: 30, duration: HOUR};
    const items = {"30": item1, "90": item2};
    const expected = [
      {value: 1, day: 0, hour: 0, minute: 30, duration: HALF_HOUR}
    ];
    expect(getItemsInSlot(items, {day: 0, hour: 0, defaultGranularity: HALF_HOUR})).to.deep.equal(expected);
  });
});
