import _ from 'lodash';
import { RANKS } from '../constants/Settings';

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
