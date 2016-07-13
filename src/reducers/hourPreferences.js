import { RECEIVE_PREFERENCES, PLACE_CHIP, REMOVE_CHIP, REORDER_GLOBAL_LOCATIONS, CHANGE_DESIRED_WEEKLY_HOURS } from '../constants/ActionTypes';
import { LOCATIONS, DEFAULT_WEEKLY_HOURS } from '../constants/Settings';
import * as calendar from '../utils/calendar';
import _ from 'lodash';

const initialState = {
  chipsPlaced: [],  // Array of integers (values)
  locationOrder: _.map(LOCATIONS, loc => loc.name),
  desiredWeeklyHours: DEFAULT_WEEKLY_HOURS
};

export default function hourPreferences(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_PREFERENCES: return action.preferences;
    case PLACE_CHIP: return {...state, chipsPlaced: calendar.placeItem(action, state.chipsPlaced)};
    case REMOVE_CHIP: return {...state, chipsPlaced: calendar.removeItem(action, state.chipsPlaced)};
    case REORDER_GLOBAL_LOCATIONS: return {...state, locationOrder: action.order};
    case CHANGE_DESIRED_WEEKLY_HOURS: return {...state, desiredWeeklyHours: action.hours};
    default: return state;
  }
}
