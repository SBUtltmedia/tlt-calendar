import _ from 'lodash';
import {HOUR, HALF_HOUR} from '../constants/Constants';
import {dayHourMinutesPlus30Minutes, dayHourPlus1Hour} from '../utils/time';

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

export function setValue(chips, index, value) {
  const cs = _.clone(chips);
  cs[index] = value;
  return cs;
}

export function clearIndex(chips, index) {
  return setValue(chips, index, undefined);
}

export function getChipsInSlot(chipsPlaced, day, hour) {
  const value1 = chipsPlaced[getIndex(day, hour, 0)];
  const value2 = chipsPlaced[getIndex(day, hour, 30)];
  if (value1 && value2) {
    if (value1 === value2) {
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

export function clearSlot(chipsPlaced, day, hour, minute, duration) {
  const index = getIndex(day, hour, minute);
  switch (duration) {
    case HOUR: return clearIndex(clearIndex(chipsPlaced, day, index), day, nextIndex(index));
    case HALF_HOUR: return clearIndex(chipsPlaced, day, index);
    default: throw new Error(`Invalid duration ${duration}`);
  }
}

export function placeChip(chipsPlaced, {value, day, hour, minute, duration=HOUR}) {
  const index = getIndex(day, hour, minute);
  switch (duration) {
    case HALF_HOUR: return setValue(chipsPlaced, index, value);
    case HOUR: return setValue(setValue(chipsPlaced, index, value), nextIndex(index), value);
    default: throw new Error(`Invalid duration ${duration}`);
  }
}
