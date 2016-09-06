import _ from 'lodash';
import { fetch } from '../utils/api';
import { HOUR } from '../constants/Constants';
import { RECEIVE_SCHEDULE, PLACE_ITEM, REMOVE_ITEM } from '../constants/ActionTypes';
import * as ActionHelpers from './ActionHelpers';

function dispatchAndSave(...dispatchObjs) {
  return ActionHelpers.dispatchAndSave(
    state => `/schedules/${state.schedule.location.id}`,
    state => state.schedule,
    ...dispatchObjs
  );
}

function receiveSchedule(json) {
  return {
    type: RECEIVE_SCHEDULE,
    ...json
  }
}

export function fetchSchedule(location) {
  return dispatch => {
    return fetch(`/schedules/${location}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSchedule(json)))
  }
}

export function placeItem(item) {
  return dispatchAndSave({...item, type: PLACE_ITEM});
}

export function removeItem(item) {
  return dispatchAndSave({...item, type: REMOVE_ITEM});
}

export function moveItem(oldItem, newItem) {
  return dispatchAndSave({...oldItem, type: REMOVE_ITEM}, {...newItem, type: PLACE_ITEM});
}
