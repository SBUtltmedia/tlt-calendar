import { RECEIVE_HOUR_PREFERENCES, PLACE_CHIP, REMOVE_CHIP, REORDER_GLOBAL_LOCATIONS, CHANGE_NUM_DESIRED_HOURS } from '../constants/ActionTypes';
import { DATA_PATH } from '../constants/Settings';
import { dispatchAndSave } from './actionHelpers';

function receivePreferences(json) {
  return {
    type: RECEIVE_HOUR_PREFERENCES,
    preferences: json
  }
}

export function fetchPreferences(netid) {
  return dispatch => {
    return fetch(`${DATA_PATH}/preferences/${netid}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePreferences(json)))
  }
}

export function placeItem(item) {
  return dispatchAndSave({...item, type: PLACE_CHIP});
}

export function removeItem(item) {
  return dispatchAndSave({...item, type: REMOVE_CHIP});
}

export function moveItem(oldItem, newItem) {
  return dispatchAndSave({...oldItem, type: REMOVE_CHIP}, {...newItem, type: PLACE_CHIP});
}

export function reorderGlobalLocations(order) {
  return {
    type: REORDER_GLOBAL_LOCATIONS,
    order
  };
}

export function changeNumDesiredHours(hours) {
  return {
    type: CHANGE_NUM_DESIRED_HOURS,
    hours
  };
}
