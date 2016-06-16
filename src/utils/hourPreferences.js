import _ from 'lodash';

const isChipInSlot = (chip, day, hour) => chip.day === day && chip.hour === hour;

export function getChipInSlot(chipsPlaced, day, hour) {
  return _.find(chipsPlaced, c => isChipInSlot(c, day, hour));
}

export function clearCell(chipsPlaced, day, hour) {
  return _.filter(chipsPlaced, c => !isChipInSlot(c, day, hour));
}

export function placeChip(chipsPlaced, chip) {
  return [...clearCell(chipsPlaced, chip.day, chip.hour), chip];
}
