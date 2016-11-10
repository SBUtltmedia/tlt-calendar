import { SET_EMPLOYEE, HOUR_PREFERENCES_CELL_CLICK, REORDER_GLOBAL_LOCATIONS, CHANGE_NUM_DESIRED_HOURS, GRAVATAR_LOAD_FAILED, RECEIVE_HOUR_PREFERENCES } from '../constants/ActionTypes';
import { markGravatarLoadFailed } from '../utils/employees';
import * as utils from '../utils/hourPreferences';
import { DEFAULT_WEEKLY_HOURS } from '../constants/Settings';
import _ from 'lodash';

const initialState = {
  numDesiredHours: DEFAULT_WEEKLY_HOURS,
  locationOrder: null,  // default
  employee: null,
  preferences: utils.initializeCells()
};

export default function schedule(state=initialState, action) {
  switch (action.type) {
    case SET_EMPLOYEE:
      return {...state, employee: action.employee};
    case RECEIVE_HOUR_PREFERENCES:
      return {...state, ..._.pick(action, ['preferences', 'numDesiredHours', 'locationOrder', 'employee'])};
    case HOUR_PREFERENCES_CELL_CLICK:
      return {...state, preferences: utils.toggleCell(state.preferences, action)};
    case REORDER_GLOBAL_LOCATIONS:
      return {...state, locationOrder: action.order};
    case CHANGE_NUM_DESIRED_HOURS:
      return {...state, numDesiredHours: action.hours};
    default: return state;
  }
}
