import { PLACE_CHIP, REMOVE_CHIP } from '../constants/ActionTypes';
import _ from 'lodash';

export function placeItem(location, chip) {
  return _.assign({}, chip, {type: PLACE_CHIP, location: location});
}

export function removeItem(location, chip) {
  return _.assign({}, chip, {type: REMOVE_CHIP, location: location});
}

export function reorderGlobalLocations(order) {

}
