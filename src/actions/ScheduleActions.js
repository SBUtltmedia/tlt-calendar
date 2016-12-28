import { RECEIVE_SCHEDULE } from '../constants/ActionTypes';
import { fetch } from '../utils/api';

export function receiveSchedule(json) {
  return {
    type: RECEIVE_SCHEDULE,
    schedule: json
  }
}

export function fetchSchedule(location) {
  return dispatch => {
    return fetch('/schedule')
      .then(response => response.json())
      .then(json => dispatch(receiveSchedule(json)))
  }
}
