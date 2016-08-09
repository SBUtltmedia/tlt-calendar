import _ from 'lodash';
import { HOUR, HALF_HOUR } from '../constants/Constants';
import { RANKS, MINIMUM_ITEM_DURATION } from '../constants/Settings';
import { dayHourMinuteInMinutes, compareTimes, dayHourMinusXHours, dayHourPlus1Hour, dayHourMinutePlus30Minutes,
  dayHourMinutePlusXMinutes, getItemEndTime } from '../utils/time';
import { roundUpToNearest } from '../utils/numbers';
import './array';

function timeToKeyInt({day, hour, minute}) {
  return dayHourMinuteInMinutes(day, hour, minute);
}

export function timeToKey(time) {
  return String(timeToKeyInt(time));
}

export function clearAllBetween(items, time1, time2) {
  let is = _.clone(items);
  const key1 = timeToKeyInt(time1);
  const key2 = timeToKeyInt(time2);
  for (let i = roundUpToNearest(key1, MINIMUM_ITEM_DURATION); i < key2; i += MINIMUM_ITEM_DURATION) {
    const item = is[String(i)];
    if (item) {
      delete is[String(i)];
      if (compareTimes(getItemEndTime(item), time2) > 0) {                             // if this item goes beyond the end
        is = placeItem(is, {...item, ...time2, duration: compareTimes(time2, item)});  // replace with a new shorter item
      }
    }
  }
  return is;
}

export function getAllItemsThatStartBetween(items, start, end) {
  let foundItems = [];
  for (let t = start; compareTimes(t, end) < 0; t = dayHourMinutePlus30Minutes(t.day, t.hour, t.minute)) {
    foundItems.push(items[timeToKey(t)]);
  }
  return _.filter(foundItems);  // filters out null and undefined
}

/**
 * Gets items between slot start (specified by {day, hour}) and 1 hour from then
 */
function getItemsWithinSlot(items, {day, hour}) {
  const item1 = items[timeToKey({day, hour, minute: 0})];
  const item2 = items[timeToKey({day, hour, minute: 30})];
  return _.filter([item1, item2]);  // filters out null and undefined
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
  return _.filter(choppedItems, item => compareTimes(item, slotStart) >= 0 && compareTimes(item, slotEnd) < 0);
}

/**
 * overrideMultiplesFn:
 *   Takes a list of cell items as a parameter.
 *   Returns a bool representing whether or not multiples behavior should be overridden.
 */
export function getItemsInSlot(items, {day, hour, defaultGranularity=HOUR, overrideMultiplesFn=undefined, maxDuration=HOUR}) {
  if (defaultGranularity === HOUR) {  // default is HOUR, so no chopping up needed
    return getItemsWithinSlot(items, {day, hour});
  }
  else if (defaultGranularity === HALF_HOUR) {
    const slotStart = {day, hour};
    const slotEnd = dayHourPlus1Hour(day, hour);
    const lookbackHours = Math.max(maxDuration / 60);
    const beforeItems = getAllItemsThatStartBetween(items, dayHourMinusXHours(day, hour, lookbackHours), slotStart);
    const beforeItemsInSlot = _.filter(beforeItems, item => compareTimes(getItemEndTime(item), slotStart) > 0);
    const withinItems = getItemsWithinSlot(items, slotStart);
    const slotItems = [...beforeItemsInSlot, ...withinItems];
    const shouldChop = (!overrideMultiplesFn || !overrideMultiplesFn(slotItems));
    return shouldChop ? chopToGranularity(slotItems, slotStart, slotEnd, defaultGranularity) : slotItems;
  }
  else {
    throw new Error("Invalid defaultGranularity: " + defaultGranularity);
  }
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

export function placeItem(items, item, {maxItems=1, overrideMultiplesFn=undefined}={}) {
  let is = _.clone(items);
  const key = timeToKey(item);
  const strippedItem = _.pick(item, ['value', 'duration', 'day', 'hour', 'minute']);
  if (maxItems === 1 || (overrideMultiplesFn && overrideMultiplesFn([item]))) {
    is = clearAllBetween(is, item, getItemEndTime(item));
    is[key] = strippedItem;
  }
  else {
    if (!is[key] || !_.isArray(is[key].value)) {  // If maxItems > 1 then we don't clear anything.
      is[key] = {...strippedItem, value:[]};      // We won't choose what item to delete for them,
    }                                             // instead we disable placing items into a full slot inside the UI.
    is[key].value.push(strippedItem.value);
  }
  return is;
}
