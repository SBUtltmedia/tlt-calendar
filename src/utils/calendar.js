import _ from 'lodash';
import { HOUR, HALF_HOUR } from '../constants/Constants';
import { RANKS, MINIMUM_ITEM_DURATION } from '../constants/Settings';
import { dayHourMinuteInMinutes, compareTimes, dayHourMinusXHours, dayHourPlus1Hour, dayHourMinutePlus30Minutes,
  dayHourMinutePlusXMinutes } from '../utils/time';
import { roundUpToNearest } from '../utils/numbers';
import './array';

export function timeToKey(day, hour, minute) {
  return String(dayHourMinuteInMinutes(day, hour, minute));
}

// key1 and key2 are integers here
export function clearAllBetween(items, key1, key2) {
  const is = _.clone(items);
  for (let i = roundUpToNearest(key1, MINIMUM_ITEM_DURATION); i < key2; i += MINIMUM_ITEM_DURATION) {
    delete is[String(i)];
  }
  return is;
}

export function clearIndex(items, key, duration) {
  const i = parseInt(key);
  return clearAllBetween(items, i, i + duration);
}

export function getAllItemsThatStartBetween(items, start, end) {
  let foundItems = [];
  for (let t = start; compareTimes(t, end) < 0; t = dayHourMinutePlus30Minutes(t.day, t.hour, t.minute)) {
    foundItems.push(items[timeToKey(t.day, t.hour, t.minute)]);
  }
  return _.filter(foundItems);  // filters out null and undefined
}

/**
 * Gets items between slot start (specified by {day, hour}) and 1 hour from then
 */
function getItemsWithinSlot(items, {day, hour}) {
  const item1 = items[timeToKey(day, hour, 0)];
  const item2 = items[timeToKey(day, hour, 30)];
  return _.filter([item1, item2]);  // filters out null and undefined
}

function chopToGranularity(items, slotStart, slotEnd, granularity) {
  if (_.isEmpty(items)) {
    return items;
  }
  if (_.isArray(items[0])) {
    return _.map(items, item => chopToGranularity(item, slotStart, slotEnd, granularity));
  }
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
    const beforeItemsInSlot = _.filter(beforeItems, item => {
      const itemEnd = dayHourMinutePlusXMinutes(item.day, item.hour, item.minute, item.duration);
      return compareTimes(itemEnd, slotStart) > 0;
    });
    const withinItems = getItemsWithinSlot(items, slotStart);
    const slotItems = [...beforeItemsInSlot, ...withinItems];
    const shouldChop = (!overrideMultiplesFn || !overrideMultiplesFn(slotItems));
    return shouldChop ? chopToGranularity(slotItems, slotStart, slotEnd, defaultGranularity) : slotItems;
  }
  else {
    throw new Error("Invalid defaultGranularity: " + defaultGranularity);
  }
}

export function removeItem(items, {day, hour, minute, duration}) {
  return clearIndex(items, timeToKey(day, hour, minute), duration);
}

export function placeItem(items, item, maxItems=1) {
  const key = timeToKey(item.day, item.hour, item.minute);
  const is = _.clone(items);
  const strippedItem = _.pick(item, ['value', 'duration', 'day', 'hour', 'minute']);
  const i = parseInt(key);
  if (maxItems === 1) {
    is[key] = strippedItem;                                // Replace previous item if it exists
    return clearAllBetween(is, i + 1, i + item.duration);  // Clear any previous items that would overlap
  }
  else {
    if (!is[key]) {  // If maxItems > 1 then we don't clear anything.
      is[key] = [];  // We won't choose what item to delete for them,
    }                // instead we disable placing new items into a full slot inside the UI.
    is[key].push(strippedItem);
    return is;
  }
}
