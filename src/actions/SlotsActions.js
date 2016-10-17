import { RECEIVE_SLOTS, ADD_SLOT, REMOVE_SLOT } from '../constants/ActionTypes';
import * as ActionHelpers from './ActionHelpers';
import { fetch } from '../utils/api';
import _ from 'lodash';

function dispatchAndSave(...dispatchObjs) {
  return ActionHelpers.dispatchAndSave(
    state => getUrl('/slots'),
    state => ({...state.slots, slots: _.values(state.slots.slots)}),
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
    return fetch('/slots')
      .then(response => response.json())
      .then(json => dispatch(receiveSlots(json)))
  }
}

export function placeItem(item) {
  return dispatchAndSave({...item, type: ADD_SLOT});
}

export function removeItem(item) {
  return dispatchAndSave({...item, type: REMOVE_SLOT});
}

export function moveItem(oldItem, newItem) {
  return dispatchAndSave({...oldItem, type: REMOVE_SLOT}, {...newItem, type: ADD_SLOT});
}
