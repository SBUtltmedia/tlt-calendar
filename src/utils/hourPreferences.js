import _ from 'lodash';
import { RANKS } from '../constants/Settings';
import { HOUR } from '../constants/Constants';

export function getChipCounts(chipsPlaced) {
  const chips = _.values(chipsPlaced);
  return _.map(RANKS, rank => {
    const rankChips = _.filter(chips, c => c.value === rank);
    const totalDuration = _.reduce(rankChips, (t, c) => t + c.duration, 0);
    return Math.ceil(totalDuration / HOUR);
  });
}

export function getNumOpenChipSets(chipsPlaced) {
  return getChipCounts(chipsPlaced).min() + 1;
}

export function isValueAvailable(chipsPlaced, value) {
  const counts = getChipCounts(chipsPlaced);
  return counts[value - 1] <= counts.min();
}
