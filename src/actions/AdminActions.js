import { PLACE_ITEM, REMOVE_ITEM } from '../constants/ActionTypes';
import { HOUR } from '../constants/Constants';
import _ from 'lodash';

export function placeItem({value, day, hour, minute, duration=HOUR}) {
  return {
    type: PLACE_ITEM,
    value: value,
    day: day,
    hour: hour,
    minute: minute,
    duration: duration
  };
}

export function removeItem(item) {
  return _.assign({}, item, {type: REMOVE_ITEM});
}
