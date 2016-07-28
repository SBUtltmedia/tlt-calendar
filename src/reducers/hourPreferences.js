import { RECEIVE_PREFERENCES, PLACE_CHIP, REMOVE_CHIP, REORDER_GLOBAL_LOCATIONS, CHANGE_NUM_DESIRED_HOURS, GRAVATAR_LOAD_FAILED } from '../constants/ActionTypes';
import { markGravatarLoadFailed } from '../utils/employees';
import { DEFAULT_WEEKLY_HOURS } from '../constants/Settings';
import * as calendar from '../utils/calendar';
import _ from 'lodash';

const initialState = {
  chipsPlaced: {},
  numDesiredHours: DEFAULT_WEEKLY_HOURS,
  locationOrder: null,  // default
  employee: null
};

export default function hourPreferences(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_PREFERENCES:
      const p = action.preferences;
      return {...p, chipsPlaced: _.reduce(p.chipsPlaced, calendar.placeItem, {})};
    case PLACE_CHIP: return {...state, chipsPlaced: calendar.placeItem(state.chipsPlaced, action)};
    case REMOVE_CHIP: return {...state, chipsPlaced: calendar.removeItem(state.chipsPlaced, action)};
    case REORDER_GLOBAL_LOCATIONS: return {...state, locationOrder: action.order};
    case CHANGE_NUM_DESIRED_HOURS: return {...state, numDesiredHours: action.hours};
    case GRAVATAR_LOAD_FAILED: return {...state, employee: markGravatarLoadFailed(state.employee)};
    default: return state;
  }
}
