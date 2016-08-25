import { RECEIVE_SLOTS, PLACE_SLOT, REMOVE_SLOT } from '../constants/ActionTypes';
import * as calendar from '../utils/calendar';
import { placeItem } from '../utils/slots';

const initialState = {
  slots: {},
  location: undefined
};

export default function slots(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_SLOTS: return {...state, slots: calendar.putIntoBuckets(action.slots), location: action.location};
    case PLACE_SLOT: return {...state, slots: placeItem(state.slots, action)};
    case REMOVE_SLOT: return {...state, slots: calendar.removeItem(state.slots, action)};
    default: return state;
  }
}
