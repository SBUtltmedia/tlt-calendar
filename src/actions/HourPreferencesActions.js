import { PLACE_CHIP, REMOVE_CHIP } from '../constants/ActionTypes';
import _ from 'lodash';

export function placeItem(chip) {
  return _.assign({}, chip, {type: PLACE_CHIP});
}

export function removeItem(chip) {
  return _.assign({}, chip, {type: REMOVE_CHIP});
}

export function reorderGlobalLocations(order) {

}
