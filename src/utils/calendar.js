import _ from 'lodash';
import { HOUR, HALF_HOUR } from '../constants/Constants';
import { RANKS, MINIMUM_ITEM_DURATION } from '../constants/Settings';
import { dayHourMinutesPlus30Minutes, dayHourPlus1Hour } from '../utils/time';
import { roundUpToNearest } from '../utils/numbers';
import './array';

export function timeToKey(day, hour, minute) {
  return String(day * 1440 + hour * 60 + minute);
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
  key = parseInt(key);
  return clearAllBetween(is, key + 1, key + duration);
}

export function clearIndex(items, key, duration) {
  key = parseInt(key);
  return clearAllBetween(items, key, key + duration);
}

export function getItemsInSlot(items, day, hour) {
  const item1 = items[timeToKey(day, hour, 0)];
  const item2 = items[timeToKey(day, hour, 30)];
  if (item1 && item2) {
    if (_.isEqual(item1.value, item2.value)) {
        return [item1];
    } else {
      return [item1, item2];
    }
  } else if (item1) {
    return [item1];
  } else if (item2) {
    return [item2];
  } else {
    return [];
  }
}

export function removeItem(items, {day, hour, minute, duration}) {
  return clearIndex(items, timeToKey(day, hour, minute), duration);
}

export function placeItem(items, {value, day, hour, minute, duration=HOUR}) {
  return setItem(items, timeToKey(day, hour, minute), duration, {value, day, hour, minute, duration});
}
