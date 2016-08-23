import fetch from 'isomorphic-fetch';
import { DATA_PATH } from '../constants/Settings';
import { RECEIVE_LOCATIONS } from '../constants/ActionTypes';

function receiveLocations(json) {
  return {
    type: RECEIVE_LOCATIONS,
    locations: json
  }
}

export function fetchLocations() {
  return dispatch => {
    return fetch(`${DATA_PATH}/locations.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveLocations(json)))
  }
}
