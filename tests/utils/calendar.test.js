import { expect } from 'chai';
import { print } from '../helpers.js';
import _ from 'lodash';
import { timeToKey, clearAllBetween, removeItem, placeItem, getItemsInSlot, chopToGranularity,
  itemToTime, itemSpansPastEndOfDay } from '../../src/utils/calendar';
import { TWO_HOURS, HOUR, HALF_HOUR } from '../../src/constants/Constants';

describe('calendar', () => {
  it('clears an area between two times (A)', () => {
    const item1 = {value: 1, day: 0, hour: 0, minute: 0, duration: HOUR};
    const time1 = {day: 0, hour: 0, minute: 0};
    const time2 = {day: 0, hour: 0, minute: 30};
    const splitItem1 = {value: 1, day: 0, hour: 0, minute: 30, duration: HALF_HOUR}
    expect(clearAllBetween({"0": item1}, time1, time2)).to.deep.equal({"30": splitItem1});
  });

  it('clears an area between two times (B)', () => {
    const item1 = {value: 1, day: 0, hour: 0, minute: 0, duration: HOUR};
    const time1 = {day: 0, hour: 0, minute: 30};
    const time2 = {day: 0, hour: 1, minute: 0};
    const splitItem1 = {value: 1, day: 0, hour: 0, minute: 0, duration: HALF_HOUR}
    expect(clearAllBetween({"0": item1}, time1, time2)).to.deep.equal({"0": splitItem1});
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
    //expect(placeItem({}, item2)).to.deep.equal({"30": item2});
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

  it('places a 1 hour item and creates two 30 minute items', () => {
    const options = {defaultGranularity: HALF_HOUR};
    const item = {value: 1, day: 0, hour: 0, minute: 0, duration: HOUR};
    const splitItem1 = {value: 1, day: 0, hour: 0, minute: 0, duration: HALF_HOUR};
    const splitItem2 = {value: 1, day: 0, hour: 0, minute: 30, duration: HALF_HOUR};
    expect(placeItem({}, item, options)).to.deep.equal({"0": splitItem1, "30": splitItem2});
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

  it('places an item and chops it according to granularity', () => {
    const options = {defaultGranularity: HALF_HOUR};
    const item = {value: 1, day: 0, hour: 0, minute: 0, duration: HOUR};
    const choppedItem1 = {...item, duration: HALF_HOUR};
    const choppedItem2 = {...item, duration: HALF_HOUR, minute: 30};
    const items = placeItem({}, item, options);
    expect(items).to.deep.equal({"0": choppedItem1, "30": choppedItem2});
  });

  it('places a two hour item', () => {
    const item = {value: 1, day: 0, hour: 0, minute: 0, duration: TWO_HOURS};
    const items = placeItem({}, item);
    expect(items).to.deep.equal({"0": item});
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
    const options = {defaultGranularity: HALF_HOUR};
    let items = placeItem({}, item1, options);
    expect(items).to.deep.equal({"30": {...item1, duration: HALF_HOUR},
                                 "60": {...item1, hour:1, minute: 0, duration: HALF_HOUR}});
    items = placeItem(items, item2, options);
    expect(items).to.deep.equal({"30": {...item1, duration: HALF_HOUR},
                                 "60": {...item1, hour:1, minute: 0, duration: HALF_HOUR},
                                 "90": {...item2, duration: HALF_HOUR},
                                "120": {...item2, hour:2, minute: 0, duration: HALF_HOUR}});
    const expected = [
      {value: 1, day: 0, hour: 1, minute: 0, duration: HALF_HOUR, visibleDuration: HALF_HOUR},
      {value: 2, day: 0, hour: 1, minute: 30, duration: HALF_HOUR, visibleDuration: HALF_HOUR}
    ];
    expect(getItemsInSlot(items, {day: 0, hour: 1})).to.deep.equal(expected);
  });

  it('gets items in a slot (granularity = HALF_HOUR) 2', () => {
    const item1 = {value: 1, day: 0, hour: 0, minute: 30, duration: HOUR};
    const item2 = {value: 2, day: 0, hour: 1, minute: 30, duration: HOUR};
    const options = {defaultGranularity: HALF_HOUR};
    const items = placeItem(placeItem({}, item1, options), item2, options);
    const expected = [
      {value: 1, day: 0, hour: 0, minute: 30, duration: HALF_HOUR, visibleDuration: HALF_HOUR}
    ];
    expect(getItemsInSlot(items, {day: 0, hour: 0})).to.deep.equal(expected);
  });

  it('gets items in a slot (multiples)', () => {
    const item1 = {value: [1, 2], day: 0, hour: 0, minute: 30, duration: HOUR};
    const options = {defaultGranularity: HALF_HOUR};
    const items = placeItem({}, item1, options);
    const expected = [
      {value: [1, 2], day: 0, hour: 0, minute: 30, duration: HALF_HOUR, visibleDuration: HALF_HOUR}
    ];
    expect(getItemsInSlot(items, {day: 0, hour: 0})).to.deep.equal(expected);
  });

  it('gets items in the last slot', () => {
    const item1 = {value: 1, day: 6, hour: 23, minute: 0, duration: HOUR};
    const options = {defaultGranularity: HALF_HOUR};
    const items = placeItem({}, item1, options);
    const expected = [
      {value: 1, day: 6, hour: 23, minute: 0, duration: HALF_HOUR, visibleDuration: HALF_HOUR},
      {value: 1, day: 6, hour: 23, minute: 30, duration: HALF_HOUR, visibleDuration: HALF_HOUR}
    ];
    expect(getItemsInSlot(items, {day: 6, hour: 23})).to.deep.equal(expected);
  });

  it('does not return an extra item in the subsequent hour when there is a full hour item on the half hour', () => {
    const options = {defaultGranularity: HALF_HOUR, overrideMultiplesFn: items => true};
    const item = {value: 1, day: 0, hour: 1, minute: 30, duration: HOUR};
    const items = {"90": item};
    const expected = [
      {value: 1, day: 0, hour: 1, minute: 30, duration: HOUR}
    ];
    expect(getItemsInSlot(items, {day: 0, hour: 2}, options)).to.deep.equal([]);
  });

  it('correctly handles RESERVED', () => {
    const item1 = {value: 'RESERVED', day: 0, hour: 0, minute: 0, duration: HOUR};
    let result = placeItem({}, item1, {overrideMultiplesFn: items => true, defaultGranularity: HALF_HOUR});
    expect(result).to.deep.equal({"0": item1});
  });

  it('correctly handles RESERVED overlapping', () => {
    const overrideMultiplesFn = items => true;
    const options = {overrideMultiplesFn, defaultGranularity: HALF_HOUR};
    const item1 = {value: 'RESERVED', day: 0, hour: 0, minute: 0, duration: HOUR};
    const item2 = {value: 'RESERVED', day: 0, hour: 0, minute: 30, duration: HOUR};
    const splitItem1 = {value: 'RESERVED', day: 0, hour: 0, minute: 0, duration: HALF_HOUR};
    let result = placeItem({"0": item1}, item2, options);
    expect(result).to.deep.equal({"0": splitItem1, "30": item2});
  });

  it('knows if an item spans past the end of the day', () => {
    expect(itemSpansPastEndOfDay({day: 0, hour: 23, minute: 30, duration: HOUR})).to.be.true;
    expect(itemSpansPastEndOfDay({day: 0, hour: 23, minute: 30, duration: HALF_HOUR})).to.be.false;
  });

  it('splits items when they wrap across days (piece 1)', () => {
    const item = {value: 'RESERVED', day: 0, hour: 23, minute: 30, duration: HOUR};
    const piece1 = {...item, visibleDuration: HALF_HOUR, connectedItem: {day: 1, hour: 0, minute: 0}};
    const items = placeItem({}, item);
    expect(getItemsInSlot(items, {day: 0, hour: 23})).to.deep.equal([piece1]);
  });

  it('splits items when they wrap across days (piece 2)', () => {
    const item = {value: 'RESERVED', day: 0, hour: 23, minute: 30, duration: HOUR};
    const piece2 = {...item, day: 1, hour: 0, minute: 0, visibleDuration: HALF_HOUR, connectedItem: itemToTime(item)};
    const items = placeItem({}, item);
    print(getItemsInSlot(items, {day: 1, hour: 0}));
    expect(getItemsInSlot(items, {day: 1, hour: 0})).to.deep.equal([piece2]);
  });
});
