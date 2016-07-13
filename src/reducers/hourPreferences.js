import { RECEIVE_PREFERENCES, PLACE_CHIP, REMOVE_CHIP, REORDER_GLOBAL_LOCATIONS } from '../constants/ActionTypes';
import { LOCATIONS } from '../constants/Settings';
import * as calendar from '../utils/calendar';
import _ from 'lodash';

const initialState = {
  chipsPlaced: [],  // Array of integers (values)
  locationOrder: _.map(LOCATIONS, loc => loc.name)
};

export default function hourPreferences(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_PREFERENCES: return action.preferences;
    case PLACE_CHIP: return {...state, chipsPlaced: calendar.placeItem(action, state.chipsPlaced)};
    case REMOVE_CHIP: return {...state, chipsPlaced: calendar.removeItem(action, state.chipsPlaced)};
    case REORDER_GLOBAL_LOCATIONS: return {...state, locationOrder: action.order};
    default: return state;
  }
}
