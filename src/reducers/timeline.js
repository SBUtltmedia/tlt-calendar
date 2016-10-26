import { RECEIVE_TIMELINE_ITEMS, ADD_TIMELINE_ITEM, REMOVE_TIMELINE_ITEM, MOVE_TIMELINE_ITEM, RESIZE_TIMELINE_ITEM } from '../constants/ActionTypes';
import * as utils from '../utils/timeline';
import moment from 'moment';

const initialState = {
  items: []
};

export default function timeline(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_TIMELINE_ITEMS:
      return {...state};
    case ADD_TIMELINE_ITEM:
      return {...state, items: utils.addItem(state.items, action.item)};
    case RESIZE_TIMELINE_ITEM:
      return {...state, items: utils.updateItem(state.items, action.itemId, {end_time: moment(action.newResizeEnd)})};
    case MOVE_TIMELINE_ITEM:
      return {...state, items: utils.moveItem(state.items, action.itemId, action.dragTime, action.newGroupOrder)};
    case REMOVE_TIMELINE_ITEM:
      return {...state, items: utils.removeItem(state.items, action.itemId)};
    default: return state;
  }
}
