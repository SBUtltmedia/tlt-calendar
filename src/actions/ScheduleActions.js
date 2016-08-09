require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import { DATA_PATH } from '../constants/Settings';
import { SET_LOCATION, RECEIVE_SCHEDULE, PLACE_ITEM, REMOVE_ITEM } from '../constants/ActionTypes';

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
  return _.assign({}, item, {type: PLACE_ITEM});
}

export function removeItem(item) {
  return _.assign({}, item, {type: REMOVE_ITEM});
}

export const setLocation = location => (dispatch, getState) => dispatch({
  type: SET_LOCATION,
  location: _.find(getState().locations, loc => loc.id === location)
});
