import { PLACE_RESERVE, REMOVE_RESERVE } from '../constants/ActionTypes';
import { HOUR } from '../constants/Constants';
import _ from 'lodash';

export function placeReserve({day, hour, minute, duration=HOUR}) {
  return {
    type: PLACE_RESERVE,
    day: day,
    hour: hour,
    minute: minute,
    duration: duration
  };
}

export function removeItem(reserve) {
  return _.assign({}, reserve, {type: REMOVE_RESERVE});
}