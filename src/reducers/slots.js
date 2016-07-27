import { SET_LOCATION, RECEIVE_SLOTS, PLACE_ITEM, REMOVE_ITEM } from '../constants/ActionTypes';
import * as calendar from '../utils/calendar';

const initialState = {};

export default function slots(state=initialState, action) {
  switch (action.type) {
    case SET_LOCATION: return {...state, location: action.location};
    case RECEIVE_SLOTS: return action.schedule;
    case PLACE_ITEM: return {...state, slots: calendar.placeItem(action, state.slots || [])};
    case REMOVE_ITEM: return {...state, slots: calendar.removeItem(action, state.slots || [])};
    default: return state;
  }
}
