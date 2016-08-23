import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import { DATA_PATH } from '../constants/Settings';
import { HOUR } from '../constants/Constants';
import { SET_LOCATION, RECEIVE_SCHEDULE, PLACE_ITEM, REMOVE_ITEM } from '../constants/ActionTypes';
import { dispatchAndSave } from './actionHelpers';

function receiveSchedule(json) {
  return {
    type: RECEIVE_SCHEDULE,
    schedule: json
  }
}

export function fetchSchedule(location) {
  return dispatch => {
    return fetch(`${DATA_PATH}/schedules/${location}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveSchedule(json)))
  }
}

export function placeItem(item) {
  return dispatchAndSave({...item, type: PLACE_ITEM});
}

export function removeItem(item) {
  return dispatchAndSave({...item, type: REMOVE_ITEM});
}

export function moveItem(oldItem, newItem) {
  return dispatchAndSave({...olditem, type: REMOVE_ITEM}, {...newItem, type: PLACE_ITEM});
}

export const setLocation = location => (dispatch, getState) => dispatch({
  type: SET_LOCATION,
  location: _.find(getState().locations, loc => loc.id === location)
});
