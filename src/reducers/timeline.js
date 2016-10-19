import { ADD_TIMELINE_ITEM, REMOVE_TIMELINE_ITEM, MOVE_TIMELINE_ITEM, RESIZE_TIMELINE_ITEM } from '../constants/ActionTypes';
import * as timeline from '../utils/timeline';
import moment from 'moment';

const initialState = {
  items: []
};

export default function slots(state=initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {...state, shifts: timeline.addItem(state.items, action.item)};
    case RESIZE_ITEM:
      return {...state, shifts: timeline.updateItem(state.items, action.itemId, {end_time: moment(action.newResizeEnd)})};
    case MOVE_ITEM:
      return {...state, shifts: timeline.moveItem(state.items, action.itemId, action.dragTime, action.newGroupOrder)};
    case REMOVE_ITEM:
      return {...state, shifts: timeline.removeItem(state.items, action.itemId)};
    default: return state;
  }
}
