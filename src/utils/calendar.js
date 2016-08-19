import _ from 'lodash';
import { HOUR, HALF_HOUR } from '../constants/Constants';
import { RANKS, MINIMUM_ITEM_DURATION, MAXIMUM_ITEM_DURATION } from '../constants/Settings';
import { dayHourMinuteInMinutes, compareTimes, dayHourPlus1Hour, dayHourMinutePlus30Minutes,
  dayHourMinutePlusXMinutes, dayHourMinuteMinusXMinutes, getItemEndTime, timeToKey, timeToKeyInt } from '../utils/time';
import { roundUpToNearest } from '../utils/numbers';
import './array';

export const getDefaultGranularity = coverage => coverage > 1 ? HALF_HOUR : HOUR;

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

export function clearAllBetween(items, time1, time2) {
  let is = _.clone(items);
  const startTime = dayHourMinuteMinusXMinutes(time1.day, time1.hour, time1.minute, MAXIMUM_ITEM_DURATION, false);
  const startKey = Math.max(timeToKeyInt(startTime), 0);
  const endKey = timeToKeyInt(time2);
  const slots = _.range(roundUpToNearest(startKey, MINIMUM_ITEM_DURATION), endKey, MINIMUM_ITEM_DURATION);

  _.each(slots, i => {
    const item = is[String(i)];
    if (item) {
      const itemEnd = getItemEndTime(item);
      if (overlapsSlot(item, itemEnd, time1, time2)) {
        delete is[String(i)];
        if (compareTimes(item, time1) < 0) {    // if this item has chunk before start, replace with shorter piece
          is = placeItem(is, {...item, duration: compareTimes(time1, item)});
        }

        if (compareTimes(itemEnd, time2) > 0) { // if this item goes beyond the end, replace with shorter piece
          is = placeItem(is, {...item, ...time2, duration: compareTimes(time2, item)});
        }
      }
    }
  });
  return is;
}

function putIntoBaskets(items) {
  const baskets = {};
  _.each(items, item => {
    const key = timeToKey(item);
    if (!baskets[key]) {
      baskets[key] = [];
    }
    baskets[key].push(item);
  });
  return baskets;
}

/**
 * Takes an array of items (no object keys) and returns an array of items chopped according to the given granularity
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

export function getAllItemsThatStartBetween(items, start, end) {
  let foundItems = [];
  for (let t = start; compareTimes(t, end) !== 0; t = dayHourMinutePlus30Minutes(t.day, t.hour, t.minute)) {
    foundItems.push(items[timeToKey(t)]);
  }
  return _.filter(foundItems);  // filters out null and undefined
}

/**
 * Returns the items within a 1 hour slot.
 */
export function getItemsInSlot(items, {day, hour, minute=0}) {
  return getAllItemsThatStartBetween(items, {day, hour, minute}, dayHourMinutePlusXMinutes(day, hour, minute, 60));
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
export function placeItem(items, item, {maxItems=1, defaultGranularity=HOUR, overrideMultiplesFn=undefined}={}) {
  let is = _.clone(items);
  const strippedItem = _.pick(item, ['value', 'duration', 'day', 'hour', 'minute']);
  const key = timeToKey(strippedItem);
  const itemEndTime = getItemEndTime(strippedItem);
  const override = !!overrideMultiplesFn && overrideMultiplesFn([strippedItem]);
  if (!override && strippedItem.duration > defaultGranularity) {
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
