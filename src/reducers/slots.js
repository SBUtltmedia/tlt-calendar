import { SET_LOCATION, RECEIVE_SLOTS, PLACE_SLOT, REMOVE_SLOT } from '../constants/ActionTypes';
import * as calendar from '../utils/calendar';

const initialState = {
  slots: {}
};

export default function slots(state=initialState, action) {
  switch (action.type) {
    case SET_LOCATION: return {...state, location: action.location};
    case RECEIVE_SLOTS: return {...state, slots: calendar.putIntoBuckets(action.slots)};
    case PLACE_SLOT: return {...state, slots: calendar.placeItem(state.slots, action)};
    case REMOVE_SLOT: return {...state, slots: calendar.removeItem(state.slots, action)};
    default: return state;
  }
}
