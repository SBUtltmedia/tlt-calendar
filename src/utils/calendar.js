import _ from 'lodash';
import { HOUR, HALF_HOUR } from '../constants/Constants';
import { RANKS } from '../constants/Settings';
import { dayHourMinutesPlus30Minutes, dayHourPlus1Hour } from '../utils/time';
import './array';

const GREATEST_INDEX = getIndex(6, 23, 30);

export function getIndex(day, hour, minute) {
  return day * 48 + hour * 2 + !!minute;
}

export function prevIndex(index) {
  return index === 0 ? GREATEST_INDEX : index - 1;
}

export function nextIndex(index) {
  return index === GREATEST_INDEX ? 0 : index + 1;
}

export function setValue(items, index, value) {
  const is = _.clone(items);
  is[index] = value;
  return is;
}

export function clearIndex(items, index) {
  return setValue(items, index, undefined);
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

export function removeItem({day, hour, minute, duration}, items) {
  return placeItem({value: undefined, day, hour, minute, duration}, items);
}

export function placeItem({value, day, hour, minute, duration=HOUR}, items) {
  const index = getIndex(day, hour, minute);
  switch (duration) {
    case HALF_HOUR: return setValue(items, index, value);
    case HOUR: return setValue(setValue(items, index, value), nextIndex(index), value);
    default: throw new Error(`Invalid duration ${duration}`);
  }
}
