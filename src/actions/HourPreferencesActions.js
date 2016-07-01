import { PLACE_CHIP, REMOVE_CHIP } from '../constants/ActionTypes';
import { HOUR } from '../constants/Constants';
import _ from 'lodash';

export function placeItem({value, day, hour, minute, duration=HOUR}) {
  return {
    type: PLACE_CHIP,
    value: value,
    day: day,
    hour: hour,
    minute: minute,
    duration: duration
  };
}

export function removeItem(chip) {
  return _.assign({}, chip, {type: REMOVE_CHIP});
}

export function reorderGlobalLocations(order) {

}
