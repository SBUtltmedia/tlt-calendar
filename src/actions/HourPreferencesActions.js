import { RECEIVE_PREFERENCES, PLACE_CHIP, REMOVE_CHIP } from '../constants/ActionTypes';
import _ from 'lodash';

function receivePreferences(json) {
  return {
    type: RECEIVE_SCHEDULE,
    preferences: json
  }
}

export function fetchPreferences(location) {
  return dispatch => {
    return fetch(`${DATA_PATH}/preferencess/${location}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePreferences(json)))
  }
}

export function placeItem(chip) {
  return _.assign({}, chip, {type: PLACE_CHIP});
}

export function removeItem(chip) {
  return _.assign({}, chip, {type: REMOVE_CHIP});
}

export function reorderGlobalLocations(order) {

}
