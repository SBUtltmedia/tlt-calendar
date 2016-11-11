import { timeToIndex } from './time';
import { NUM_RANKS } from '../constants/Settings';
import _ from 'lodash';

export function initializeCells() {
  const n = timeToIndex({day: 7});
  return Array.apply(null, Array(n)).map(Number.prototype.valueOf, 0);
}

export function toggleCell(cells, time) {
  const index = timeToIndex(time);
  const cell = cells[index];
  return [...cells.slice(0, index), cell >= NUM_RANKS ? 0 : cell + 1, ...cells.slice(index + 1)];
}

export function getCellValue(cells, time) {
  const index = timeToIndex(time);
  return cells[index];
}

export function getAverageCellValue(cells) {
  return _.mean(_.filter(cells, _.identity));
}
