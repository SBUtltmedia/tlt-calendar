import { SHOW_SLOTS, HIDE_SLOTS } from '../constants/ActionTypes';

const initialState = {
  slotsShowing: false
};

export default function slots(state=initialState, action) {
  switch (action.type) {
    case SHOW_SLOTS: return {...state, slotsShowing: true};
    case HIDE_SLOTS: return {...state, slotsShowing: false};
    default: return state;
  }
}
