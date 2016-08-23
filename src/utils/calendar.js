import _ from 'lodash';
import { HOUR, HALF_HOUR } from '../constants/Constants';
import { RANKS, MINIMUM_ITEM_DURATION, MAXIMUM_ITEM_DURATION } from '../constants/Settings';
import { dayHourMinuteInMinutes, compareTimes, dayHourPlus1Hour, dayHourMinutePlus30Minutes, dayPlus1, dayMinus1,
  dayHourMinutePlusXMinutes, dayHourMinuteMinusXMinutes, getItemEndTime, timeToKey, timeToKeyInt } from '../utils/time';
import { roundUpToNearest } from '../utils/numbers';
import './array';

export const getDefaultGranularity = coverage => coverage > 1 ? HALF_HOUR : HOUR;
export const itemToTime = item => _.pick(item, ['day', 'hour', 'minute']);

/**
 * Returns a bool of whether the item has any part between slotStart and slotEnd
 * Accounts for wrapping
 */
export function overlapsSlot(itemStart, itemEnd, slotStart, slotEnd) {
  const f = () => compareTimes(slotStart, slotEnd) < 0 ?
                  compareTimes(itemStart, slotEnd) < 0 :
                  compareTimes(itemStart, slotEnd) > 0;
  if (compareTimes(itemStart, itemEnd) < 0) {
    return compareTimes(itemEnd, slotStart) > 0 && f();
  }
  else if (compareTimes(itemStart, itemEnd) > 0) {
    return compareTimes(itemEnd, slotStart) < 0 && f();
  }
  else {
    throw new Error('itemStart == itemEnd. Why!?!');
  }
}

/**
 * Takes an array of items (no object keys) and returns an object with keys and the original items as values.
 */
export function putIntoBuckets(items) {
  const buckets = {};
  _.each(items, item => buckets[timeToKey(item)] = item);
  return buckets;
}

function forEachItemBetween(items, time1, time2, fn) {
  const startKey = Math.max(timeToKeyInt(time1), 0);
  const endKey = timeToKeyInt(time2);
  _.each(_.range(roundUpToNearest(startKey, MINIMUM_ITEM_DURATION), endKey, MINIMUM_ITEM_DURATION), i => {
    const key = String(i);
    const item = items[key];
    if (item) {
      fn(item, key);
    }
  });
}

export function clearAllBetween(items, time1, time2) {
  let is = _.clone(items);
  const startTime = dayHourMinuteMinusXMinutes(time1.day, time1.hour, time1.minute, MAXIMUM_ITEM_DURATION, false);
  forEachItemBetween(is, startTime, time2, (item, key) => {
    const itemEnd = getItemEndTime(item);
    if (overlapsSlot(item, itemEnd, time1, time2)) {
      delete is[key];


      // TODO: We don't want to chop up items with a defined duration like slots!
      if (compareTimes(item, time1) < 0) {    // if this item has chunk before start, replace with shorter piece
        is = placeItem(is, {...item, duration: compareTimes(time1, item)});
      }
      if (compareTimes(itemEnd, time2) > 0) { // if this item goes beyond the end, replace with shorter piece
        is = placeItem(is, {...item, ...time2, duration: compareTimes(time2, item)});
      }


    }
  });
  return is;
}

export function getAllItemsThatStartBetween(items, start, end) {
  let foundItems = [];
  for (let t = start; compareTimes(t, end) !== 0; t = dayHourMinutePlus30Minutes(t.day, t.hour, t.minute)) {
    const item = items[timeToKey(t)];
    if (item) {
      item.visibleDuration = item.duration;  // by default the entire item is shown in one block
      foundItems.push(item);
    }
  }
  return foundItems;
}

/**
 * Takes an array of items (no object keys) and returns an array of items chopped according to the given granularity.
 */
export function chopToGranularity(items, slotStart, slotEnd, granularity) {
  const choppedItems = _.flatten(_.map(items, item => {
    if (item.duration > granularity) {
      const pieces = item.duration / granularity;
      return _.map(_.range(pieces), i => {
        const time = dayHourMinutePlusXMinutes(item.day, item.hour, item.minute, i * granularity);
        return {...item, ...time, duration: granularity};
      });
    }
    else {
      return item;
    }
  }));
  return _.filter(choppedItems, item => overlapsSlot(item, getItemEndTime(item), slotStart, slotEnd));
}

export function itemSpansPastEndOfDay(item) {
  const itemEnd = getItemEndTime(item);
  return itemEnd.day !== item.day && !(itemEnd.hour === 0 && itemEnd.minute === 0);
}

/**
 * Takes an array of items (no object keys) and returns an array of items with the items that span past today chopped.
 * This function only returns the first piece of those items (the second piece appears in a different slot).
 * Also adds the connectedItem attribute to those items that were chopped.
 */
export function chopItemsThatSpanPastEndOfDay(items) {
  return _.map(items, item => {
    const dayCrossover = {day: dayPlus1(item.day), hour: 0, minute: 0};
    if (itemSpansPastEndOfDay(item)) {
      return {...item, visibleDuration: compareTimes(dayCrossover, item), connectedItem: dayCrossover};
    }
    else {
      return item;
    }
  });
}

/**
 * Takes the items object (with keys) and returns only items from the end of previous day that were chopped.
 * This function returns the second piece of the item returned by the `chopItemsThatSpanPastEndOfDay` function.
 * Also adds the connectedItem attribute to those items that were chopped.
 */
export function getChoppedItemsFromYesterday(items, today) {
  const spanStart = {day: dayMinus1(today), hour: 24 - MAXIMUM_ITEM_DURATION / 60, minute: 0};  // Look back N hours
  const startOfToday = {day: today, hour: 0, minute: 0};
  const foundItems = [];
  forEachItemBetween(items, spanStart, startOfToday, (item, key) => {
    if (itemSpansPastEndOfDay(item)) {
      const itemEnd = getItemEndTime(item);
      const visibleDuration = compareTimes(itemEnd, startOfToday);
      foundItems.push({...item, ...startOfToday, visibleDuration, connectedItem: itemToTime(item)});
    }
  });
  return foundItems;
}

/**
 * Returns the items within a 1 hour slot.
 */
export function getItemsInSlot(items, {day, hour, minute=0}) {
  const startTime = {day, hour, minute};
  const endTime = dayHourMinutePlusXMinutes(day, hour, minute, 60);
  const slotItems = chopItemsThatSpanPastEndOfDay(getAllItemsThatStartBetween(items, startTime, endTime));
  return hour === 0 && minute === 0 ? [...getChoppedItemsFromYesterday(items, day), ...slotItems] : slotItems;
}

export function removeItem(items, {day, hour, minute, duration, value=undefined}) {
  const is = _.clone(items);
  const key = timeToKey({day, hour, minute});
  if (value && _.isArray(is[key].value)) {  // If value was specified and this slot contains multiple values
    is[key].value = _.reject(is[key].value, v => _.isEqual(v, value));  // filter out the specified value
    if (_.isEmpty(is[key].value)) {
      delete is[key];  // delete the entire item if there are no more values inside
    }
  }
  else {  // If no value was specified or the slot contains a single item just delete the whole item
    delete is[key];
  }
  return is;
}

/**
 * Options:
 *   maxItems:
 *     The maximum number if items a slot can hold (ex. Main Library is 4)
 *   defaultGranularity:
 *     The usual size of items in the grid
 *     (for full icons this is HOUR, for multiple employee 'ticks' this is HALF_HOUR)
 *   overrideMultiplesFn:
 *     Takes a list of cell items as a parameter.
 *     Returns a bool representing whether or not multiples behavior should be overridden.
 */
export function placeItem(items, item, {maxItems=1, defaultGranularity=undefined, overrideMultiplesFn=undefined}={}) {
  let is = _.clone(items);
  const strippedItem = _.pick(item, ['value', 'duration', 'day', 'hour', 'minute']);
  const key = timeToKey(strippedItem);
  const itemEndTime = getItemEndTime(strippedItem);
  const override = !!overrideMultiplesFn && overrideMultiplesFn([strippedItem]);
  if (!override && defaultGranularity && strippedItem.duration > defaultGranularity) {
    const choppedItems = chopToGranularity([strippedItem], strippedItem, itemEndTime, defaultGranularity);
    return _.reduce(choppedItems, (items, item) => placeItem(items, item, {maxItems, defaultGranularity}), is);
  }
  if (maxItems === 1 || override) {
    is = clearAllBetween(is, strippedItem, itemEndTime);
    is[key] = strippedItem;
  }
  else {
    if (!is[key] || !_.isArray(is[key].value)) {
      is[key] = {...strippedItem, value: []};
    }
    is[key].value.push(item.value);
    return is;
  }
  return is;
}
