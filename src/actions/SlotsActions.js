require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import { DATA_PATH } from '../constants/Settings';
import { SET_LOCATION, RECEIVE_SLOTS, PLACE_SLOT, REMOVE_SLOT } from '../constants/ActionTypes';

function receiveSlots(json) {
  return {
    type: RECEIVE_SLOTS,
    slots: json
  }
}

export function fetchSlots(location) {
  return dispatch => {
    return fetch(`${DATA_PATH}/slots/${location}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveSlots(json)))
  }
}

export function placeItem(item) {
  return {...item, type: PLACE_SLOT};
}

export function removeItem(item) {
  return {...item, type: REMOVE_SLOT};
}

export const setLocation = location => ({
  type: SET_LOCATION,
  location: location
});
