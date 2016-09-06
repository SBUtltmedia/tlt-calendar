import { RECEIVE_HOUR_PREFERENCES, PLACE_CHIP, REMOVE_CHIP, REORDER_GLOBAL_LOCATIONS, CHANGE_NUM_DESIRED_HOURS } from '../constants/ActionTypes';
import { fetch } from '../utils/api';
import * as ActionHelpers from './ActionHelpers';

const getUrl = netId => `/employees/${netId}/hour-preferences`;

function dispatchAndSave(...dispatchObjs) {
  return ActionHelpers.dispatchAndSave(
    state => getUrl(state.user.netId),
    state => state.hourPreferences,
    ...dispatchObjs
  );
}

function receivePreferences(json) {
  return {
    type: RECEIVE_HOUR_PREFERENCES,
    preferences: json
  }
}

export function fetchPreferences(netId) {
  return dispatch => {
    return fetch(getUrl(netId))
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
  dispatchAndSave({order, type: REORDER_GLOBAL_LOCATIONS});
}

export function changeNumDesiredHours(hours) {
  dispatchAndSave({hours, type: CHANGE_NUM_DESIRED_HOURS});
}
