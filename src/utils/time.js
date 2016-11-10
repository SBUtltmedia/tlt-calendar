import { MINIMUM_ITEM_DURATION } from '../constants/Settings';

export function timeToIndex({day, hour=0, minute=0}) {
  return day * (24 * 60 / MINIMUM_ITEM_DURATION) +
    Math.floor(hour * 60 / MINIMUM_ITEM_DURATION) +
    Math.floor(minute / MINIMUM_ITEM_DURATION);
}

export function getHourLabel(hour) {
  if (hour === 0) {
    return 12;
  }
  else if (hour > 12) {
    return hour - 12;
  }
  else {
    return hour;
  }
}
