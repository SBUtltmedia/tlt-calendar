import fetch from 'isomorphic-fetch';
import { DATA_PATH } from '../constants/Settings';
import { RECEIVE_USER, CHANGE_SETTINGS } from '../constants/ActionTypes';

function receiveUser(json) {
  return {
    type: RECEIVE_USER,
    user: json
  }
}

export function fetchUser(netid) {
  return dispatch => {
    return fetch(`${DATA_PATH}/users/${netid}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveUser(json)))
  }
}

export function fetchThisUser() {
  return dispatch => {
    return fetch(`${DATA_PATH}/user.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveUser(json)))
  }
}

export function changeSettings(newSettings) {
  return {
    type: CHANGE_SETTINGS,
    settings: newSettings
  }
}
