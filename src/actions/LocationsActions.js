import { RECEIVE_LOCATIONS } from '../constants/ActionTypes';
import { fetch } from '../utils/api';

function receiveLocations(json) {
  return {
    type: RECEIVE_LOCATIONS,
    locations: json
  }
}

export function fetchLocations() {
  return dispatch => {
    return fetch('/locations')
      .then(response => response.json())
      .then(json => dispatch(receiveLocations(json)))
  }
}
