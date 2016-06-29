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

export function removeChip(chipsPlaced, {day, hour, minute, duration}) {
  return placeChip(chipsPlaced, {value: undefined, day, hour, minute, duration});
}

export function placeChip(chipsPlaced, {value, day, hour, minute, duration=HOUR}) {
  const index = getIndex(day, hour, minute);
  switch (duration) {
    case HALF_HOUR: return setValue(chipsPlaced, index, value);
    case HOUR: return setValue(setValue(chipsPlaced, index, value), nextIndex(index), value);
    default: throw new Error(`Invalid duration ${duration}`);
  }
}

export function getChipCounts(chipsPlaced) {
  const chips = _.filter(chipsPlaced, c => c);
  return _.map(RANKS, rank => Math.ceil(_.size(_.filter(chips, c => c === rank)) / 2));
}

export function getNumOpenChipSets(chipsPlaced) {
  return getChipCounts(chipsPlaced).min() + 1;
}

export function isValueAvailable(chipsPlaced, value) {
  const counts = getChipCounts(chipsPlaced);
  return counts[value - 1] <= counts.min();
}
