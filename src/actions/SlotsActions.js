import { RECEIVE_SLOTS } from '../constants/ActionTypes';
import { fetch } from '../utils/api';

function receiveSlots(json) {
  return {
    type: RECEIVE_SLOTS,
    slots: json
  }
}

export function fetchSlots(location) {
  return dispatch => {
    return fetch('/slots')
      .then(response => response.json())
      .then(json => dispatch(receiveSlots(json)))
  }
}
