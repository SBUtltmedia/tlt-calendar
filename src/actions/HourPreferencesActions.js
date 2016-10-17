import { RECEIVE_HOUR_PREFERENCES, ADD_HOUR_PREFERENCE, REMOVE_HOUR_PREFERENCE, REORDER_GLOBAL_LOCATIONS, CHANGE_NUM_DESIRED_HOURS } from '../constants/ActionTypes';
import { fetch } from '../utils/api';
import * as ActionHelpers from './ActionHelpers';
import _ from 'lodash';

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

export function addItem(item) {
  return dispatchAndSave({item, type: ADD_HOUR_PREFERENCE});
}

export function removeItem(item) {
  return dispatchAndSave({item, type: REMOVE_HOUR_PREFERENCE});
}

export function reorderGlobalLocations(order) {
  dispatchAndSave({order, type: REORDER_GLOBAL_LOCATIONS});
}

export function changeNumDesiredHours(hours) {
  dispatchAndSave({hours, type: CHANGE_NUM_DESIRED_HOURS});
}
