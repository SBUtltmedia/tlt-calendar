import { expect } from 'chai';
import { timeToKey, removeItem, placeItem, getItemsInSlot, chopToGranularity } from '../../src/utils/calendar';
import { HOUR, HALF_HOUR } from '../../src/constants/Constants';

describe('calendar', () => {
  it('gets the string key of a cell from day, hour, minute', () => {
    expect(timeToKey({day: 0, hour: 0, minute: 0})).to.equal("0");
    expect(timeToKey({day: 0, hour: 0, minute: 30})).to.equal("30");
    expect(timeToKey({day: 0, hour: 1, minute: 30})).to.equal("90");
    expect(timeToKey({day: 0, hour: 23, minute: 30})).to.equal("1410");
    expect(timeToKey({day: 1, hour: 0, minute: 0})).to.equal("1440");
  });

  it('chops a 1 hour item to 2 half hour items', () => {
    const item = {value: 1, day: 0, hour: 0, minute: 0, duration: HOUR};
    const half1 = {value: 1, day: 0, hour: 0, minute: 0, duration: HALF_HOUR};
    const half2 = {value: 1, day: 0, hour: 0, minute: 30, duration: HALF_HOUR};
    const result = chopToGranularity([item], {day: 0, hour: 0}, {day: 0, hour: 1}, HALF_HOUR);
    expect(result).to.deep.equal([half1, half2]);
  });

  it('places an item (max = 1)', () => {
    const item1 = {value: 1, day: 0, hour: 0, minute: 0, duration: HOUR};
    const item2 = {value: 2, day: 0, hour: 0, minute: 30, duration: HALF_HOUR};
    const item3 = {value: 3, day: 0, hour: 1, minute: 0, duration: HALF_HOUR};
    expect(placeItem({}, item2)).to.deep.equal({"30": item2});
    expect(placeItem({"30": item2, "60": item3}, item1)).to.deep.equal({"0": item1, "60": item3});
  });

  it('places an item (max = 2)', () => {
    const maxItems = 2;
    const item1 = {value: 1, day: 0, hour: 0, minute: 0, duration: HOUR};
    const item2 = {value: 2, day: 0, hour: 0, minute: 30, duration: HALF_HOUR};
    const item3 = {value: 3, day: 0, hour: 1, minute: 0, duration: HALF_HOUR};
    let result = placeItem({}, item2, {maxItems});
    expect(result).to.deep.equal({"30": {...item2, value: [2]}});
    result = placeItem(result, item3, {maxItems});
    expect(result).to.deep.equal({"30": {...item2, value: [2]}, "60": {...item3, value: [3]}});
    result = placeItem(result, item1, {maxItems})
    expect(result).to.deep.equal({"0": {...item1, value: [1]}, "30": {...item2, value: [2]}, "60": {...item3, value: [3]}});
  });

  it('places an item (override multiples, full slot)', () => {
    const maxItems = 2;
    const overrideMultiplesFn = items => items[0].value === 5;
    const options = {maxItems, overrideMultiplesFn};
    const item2 = {value: 2, day: 0, hour: 0, minute: 30, duration: HALF_HOUR};
    const item3 = {value: 3, day: 0, hour: 1, minute: 0, duration: HALF_HOUR};
    const item5 = {value: 5, day: 0, hour: 0, minute: 0, duration: HOUR};
    let result = placeItem({}, item2, options);
    expect(result).to.deep.equal({"30": {...item2, value: [2]}});
    result = placeItem(result, item3, options);
    expect(result).to.deep.equal({"30": {...item2, value: [2]}, "60": {...item3, value: [3]}});
    result = placeItem(result, item5, options);
    expect(result).to.deep.equal({"0": item5, "60": {...item3, value: [3]}});
  });

  it('places an item (override multiples, half slot)', () => {
    const maxItems = 2;
    const overrideMultiplesFn = items => items[0].value === 5;
    const options = {maxItems, overrideMultiplesFn};
    const item1 = {value: 1, day: 0, hour: 0, minute: 0, duration: HOUR};
    const item5 = {value: 5, day: 0, hour: 0, minute: 0, duration: HALF_HOUR};
    const splitItem1 = {value: 1, day: 0, hour: 0, minute: 30, duration: HALF_HOUR};
    let result = placeItem({}, item1, options);
    expect(result).to.deep.equal({"0": {...item1, value: [1]}});
    result = placeItem(result, item5, options)
    expect(result).to.deep.equal({"0": item5, "30": {...splitItem1, value: [1]}});
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
    //console.log(getItemsInSlot(items, {day: 0, hour: 1, defaultGranularity: HALF_HOUR}));
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

  it('gets items in a slot (multiples)', () => {
    const item1 = {value: [1, 2], day: 0, hour: 0, minute: 30, duration: HOUR};
    const items = {"30": item1};
    const expected = [
      {value: [1, 2], day: 0, hour: 0, minute: 30, duration: HALF_HOUR}
    ];
    expect(getItemsInSlot(items, {day: 0, hour: 0, defaultGranularity: HALF_HOUR})).to.deep.equal(expected);
  });

  it('gets items in the last slot', () => {
    const item1 = {value: 1, day: 6, hour: 23, minute: 0, duration: HOUR};
    const items = {"10020": item1};
    const expected = [
      {value: 1, day: 6, hour: 23, minute: 0, duration: HALF_HOUR},
      {value: 1, day: 6, hour: 23, minute: 30, duration: HALF_HOUR}
    ];
    expect(getItemsInSlot(items, {day: 6, hour: 23, defaultGranularity: HALF_HOUR})).to.deep.equal(expected);
  });
});
