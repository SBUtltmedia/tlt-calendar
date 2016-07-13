import { RECEIVE_PREFERENCES, PLACE_CHIP, REMOVE_CHIP, REORDER_GLOBAL_LOCATIONS } from '../constants/ActionTypes';
import { DATA_PATH } from '../constants/Settings';
import _ from 'lodash';

function receivePreferences(json) {
  return {
    type: RECEIVE_PREFERENCES,
    preferences: json
  }
}

export function fetchPreferences(student_id) {
  return dispatch => {
    return fetch(`${DATA_PATH}/preferences/${student_id}.json`)
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
  return {
    type: REORDER_GLOBAL_LOCATIONS,
    order: order
  };
}
