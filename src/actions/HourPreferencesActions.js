import { PLACE_CHIP } from '../constants/ActionTypes';
import { HOUR } from '../constants/Constants';

export function placeChip(value, day, hour, minute) {
  return {
    type: PLACE_CHIP,
    value: value,
    day: day,
    hour: hour,
    minute: minute,
    duration: HOUR
  };
}
