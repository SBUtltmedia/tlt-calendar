import { SET_DRAGGING_ITEM, CLEAR_DRAGGING_ITEM } from '../constants/ActionTypes';

const initialState = {
  draggingItem: null
};

export default function dnd(state=initialState, action) {
  switch (action.type) {
    case SET_DRAGGING_ITEM: return {...state, draggingItem: action.item};
    case CLEAR_DRAGGING_ITEM: return {...state, draggingItem: null};
    default: return state;
  }
}
