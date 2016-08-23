import { SET_DRAGGING_ITEM, CLEAR_DRAGGING_ITEM } from '../constants/ActionTypes';

export function setDraggingItem(item) {
  return {
    type: SET_DRAGGING_ITEM,
    item
  };
}

export function clearDraggingItem() {
  return {
    type: CLEAR_DRAGGING_ITEM
  };
}
