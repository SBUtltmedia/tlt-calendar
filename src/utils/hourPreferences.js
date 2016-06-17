import _ from 'lodash';
import {HOUR, HALF_HOUR} from '../constants/Constants';
import {dayHourMinutesPlus30Minutes} from '../utils/time';

const GREATEST_INDEX = getIndex(6, 23, 30);

export function getIndex(day, hour, minutes) {
  return day * 48 + hour * 2 + !!minutes;
}

export function nextIndex(index) {
  return index === GREATEST_INDEX ? 0 : index + 1;
}

export function clearIndex(chips, day, index) {
  return [...chips.slice(0, index), ...chips.slice(nextIndex(index))];
}

export function getChipsInSlot(chipsPlaced, day, hour) {
  const index = getIndex(day, hour, 0);
  return _.filter([chipsPlaced[index], chipsPlaced[nextIndex(index)]], x => x);  // filter out undefined
}

export function clearCell(chipsPlaced, day, hour, minutes, duration) {
  const index = getIndex(day, hour, minutes);
  switch (duration) {
    case HOUR: return clearIndex(clearIndex(chipsPlaced, day, index), day, nextIndex(index));
    case HALF_HOUR: return clearIndex(chipsPlaced, day, index);
    default: throw new Error(`Invalid duration ${duration}`);
  }
}

export function placeChip(chipsPlaced, chip) {
  const chips = clearCell(chipsPlaced, chip.day, chip.hour, chip.minutes, chip.duration);
  chips[getIndex(chip.day, chip.hour, chip.minutes)] = chip;
  return chips;
}
