import _ from 'lodash';
import { fetch } from '../utils/api';
import { HOUR } from '../constants/Constants';
import { RECEIVE_SCHEDULE, ADD_TIMELINE_ITEM, REMOVE_TIMELINE_ITEM, RESIZE_TIMELINE_ITEM, MOVE_TIMELINE_ITEM } from '../constants/ActionTypes';
import * as ActionHelpers from './ActionHelpers';

function dispatchAndSave(...dispatchObjs) {
  return ActionHelpers.dispatchAndSave(
    state => '/schedules',
    state => ({...state.schedule, shifts: _.values(state.schedule.shifts)}),
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
    return fetch('/schedules')
      .then(response => response.json())
      .then(json => dispatch(receiveSchedule(json)))
  }
}

export function addItem(item) {
  return dispatchAndSave({item, type: ADD_ITEM});
}

export function removeItem(itemId) {
  return dispatchAndSave({itemId, type: REMOVE_ITEM});
}

export function resizeItem(itemId, newResizeEnd) {
  return dispatchAndSave({
    type: RESIZE_ITEM,
    itemId,
    newResizeEnd
  });
}

export function moveItem(itemId, dragTime, newGroupOrder) {
  return dispatchAndSave({
    type: MOVE_ITEM,
    itemId,
    dragTime,
    newGroupOrder
  });
}
