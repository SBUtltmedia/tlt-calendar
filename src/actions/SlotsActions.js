import { RECEIVE_SLOTS, PLACE_SLOT, REMOVE_SLOT } from '../constants/ActionTypes';
import * as ActionHelpers from './ActionHelpers';
import { fetch } from '../utils/api';

const getUrl = locationId => `/locations/${locationId}/slots`;

function dispatchAndSave(...dispatchObjs) {
  return ActionHelpers.dispatchAndSave(
    state => getUrl(state.slots.location.id),
    state => state.slots,
    ...dispatchObjs
  );
}

function receiveSlots(json) {
  return {
    type: RECEIVE_SLOTS,
    ...json
  }
}

export function fetchSlots(location) {
  return dispatch => {
    return fetch(getUrl(location))
      .then(response => response.json())
      .then(json => dispatch(receiveSlots(json)))
  }
}

export function placeItem(item) {
  return dispatchAndSave({...item, type: PLACE_SLOT});
}

export function removeItem(item) {
  return dispatchAndSave({...item, type: REMOVE_SLOT});
}

export function moveItem(oldItem, newItem) {
  return dispatchAndSave({...oldItem, type: REMOVE_SLOT}, {...newItem, type: PLACE_SLOT});
}
