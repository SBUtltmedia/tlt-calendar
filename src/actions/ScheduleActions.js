require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import { DATA_PATH } from '../constants/Settings';
import { RECEIVE_SCHEDULES } from '../constants/ActionTypes';

function receiveSchedules(json) {
  return {
    type: RECEIVE_SCHEDULES,
    schedules: json
  }
}

export function fetchSchedules() {
  return dispatch => {
    return fetch(`${DATA_PATH}/schedules.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveSchedules(json)))
  }
}
