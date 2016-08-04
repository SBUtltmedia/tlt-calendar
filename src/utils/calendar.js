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

// key may be (and usually is) a string (a key in the items object)
export function setItem(items, key, duration, item) {
  const is = _.clone(items);
  is[key] = item;
  const i = parseInt(key);
  return clearAllBetween(is, i + 1, i + duration);
}

export function clearIndex(items, key, duration) {
  const i = parseInt(key);
  return clearAllBetween(items, i, i + duration);
}

export function getAllItemsThatStartBetween(items, start, end) {
  let foundItems = [];
  for (let t = start; t.day <= end.day && t.hour <= end.hour; t = dayHourMinutePlus30Minutes(t.day, t.hour, t.minute)) {
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

function chopToGranularity(items, slotStart, slotEnd, baseGranularity, granularityFn) {
  const choppedItems = _.flatten(_.map(items, item => {
    const granularity = granularityFn ? granularityFn(items) : baseGranularity;
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
 * granularityFn: Takes the cell items and returns the granularity of the cell
 * (usually the base granularity, but this provides the ability to make exceptions)
 */
export function getItemsInSlot(items, {day, hour, baseGranularity=HOUR, granularityFn=undefined, maxDuration=HOUR}) {
  if (baseGranularity === HOUR) {  // default is HOUR, so no chopping up needed
    return getItemsWithinSlot(items, {day, hour});
  }
  else if (baseGranularity === HALF_HOUR) {
    const slotStart = {day, hour};
    const slotEnd = dayHourPlus1Hour(day, hour);
    const lookbackHours = Math.max(maxDuration / 60);
    const beforeItems = getAllItemsThatStartBetween(items, dayHourMinusXHours(day, hour, lookbackHours), slotStart);
    const beforeItemsInSlot = _.filter(beforeItems, item => {
      const itemEnd = dayHourMinutePlusXMinutes(item.day, item.hour, item.minute, item.duration);
      return compareTimes(itemEnd, slotStart) > 0;
    });
    const withinItems = getItemsWithinSlot(items, slotStart);
    return chopToGranularity([...beforeItemsInSlot, ...withinItems], slotStart, slotEnd, baseGranularity, granularityFn);
  }
  else {
    throw new Error("Invalid baseGranularity: " + baseGranularity);
  }
}

export function removeItem(items, {day, hour, minute, duration}) {
  return clearIndex(items, timeToKey(day, hour, minute), duration);
}

export function placeItem(items, {value, day, hour, minute, duration=HOUR}, maxItems=1) {
  return setItem(items, timeToKey(day, hour, minute), duration, {value, day, hour, minute, duration});
}
