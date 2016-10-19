import _ from 'lodash';
import { fetchType, receiveType, saveState } from '../utils/api';
import { RECEIVE_TIMELINE_ITEMS, ADD_TIMELINE_ITEM, REMOVE_TIMELINE_ITEM, RESIZE_TIMELINE_ITEM, MOVE_TIMELINE_ITEM } from '../constants/ActionTypes';
import { getHandler } from '../utils/api';

function dispatchAndSave(type, ...dispatchObjs) {
  return (dispatch, getState) => {
    _.each(dispatchObjs, obj => dispatch(obj));
    saveState(getState(), type);
  };
}

export function fetchTimelineItems(type) {
  console.log("fetch", type);
  return (dispatch, getState) => {
    const state = getState();
    return fetchType(type, state)
      .then(response => response.json())
      .then(json => dispatch(receiveTimelineItems(type, json)))
  }
}

function receiveTimelineItems(type, json) {
  return {
    type: RECEIVE_TIMELINE_ITEMS,
    ...receiveType(type, json)
  }
}

export function addItem(type, item) {
  return dispatchAndSave(type, {item, type: ADD_TIMELINE_ITEM});
}

export function removeItem(type, itemId) {
  return dispatchAndSave(type, {itemId, type: REMOVE_TIMELINE_ITEM});
}

export function resizeItem(type, itemId, newResizeEnd) {
  return dispatchAndSave(type, {
    type: RESIZE_TIMELINE_ITEM,
    itemId,
    newResizeEnd
  });
}

export function moveItem(type, itemId, dragTime, newGroupOrder) {
  return dispatchAndSave(type, {
    type: MOVE_TIMELINE_ITEM,
    itemId,
    dragTime,
    newGroupOrder
  });
}
