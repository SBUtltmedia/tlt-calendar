import { PLACE_CHIP, REMOVE_CHIP } from '../constants/ActionTypes';
import * as calendar from '../utils/calendar';

const initialState = {
  chipsPlaced: []  // Array of integers (values)
};

export default function hourPreferences(state=initialState, action) {
  switch (action.type) {
    case PLACE_CHIP: return {...state, chipsPlaced: calendar.placeItem(action, state.chipsPlaced)};
    case REMOVE_CHIP: return {...state, chipsPlaced: calendar.removeItem(action, state.chipsPlaced)};
    default: return state;
  }
}
