import { RECEIVE_PREFERENCES, PLACE_CHIP, REMOVE_CHIP, REORDER_GLOBAL_LOCATIONS, CHANGE_NUM_DESIRED_HOURS } from '../constants/ActionTypes';
import { DATA_PATH } from '../constants/Settings';

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
  return {...chip, type: PLACE_CHIP};
}

export function removeItem(chip) {
  return {...chip, type: REMOVE_CHIP};
}

export function reorderGlobalLocations(order) {
  return {
    type: REORDER_GLOBAL_LOCATIONS,
    order: order
  };
}

export function changeNumDesiredHours(hours) {
  return {
    type: CHANGE_NUM_DESIRED_HOURS,
    hours: hours
  };
}
