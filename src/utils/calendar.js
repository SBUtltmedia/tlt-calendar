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
  const value1 = items[getIndex(day, hour, 0)];
  const value2 = items[getIndex(day, hour, 30)];
  if (value1 && value2) {
    if (_.isEqual(value1, value2)) {
        return [{value: value1, day, hour, minute: 0, duration: HOUR}];
    }
    else {
      return [
        {value: value1, day, hour, minute: 0, duration: HALF_HOUR},
        {value: value2, day, hour, minute: 30, duration: HALF_HOUR}
      ];
    }
  }
  else if (value1) {
    return [{value: value1, day, hour, minute: 0, duration: HALF_HOUR}];
  }
  else if (value2) {
    return [{value: value2, day, hour, minute: 30, duration: HALF_HOUR}];
  }
  else {
    return [];
  }
}

export function removeItem(items, {day, hour, minute, duration}) {
  return clearIndex(items, timeToKey(day, hour, minute), duration);
}

export function placeItem(items, {value, day, hour, minute, duration=HOUR}) {
  return setItem(items, timeToKey(day, hour, minute), duration, {value, day, hour, minute, duration});
}
