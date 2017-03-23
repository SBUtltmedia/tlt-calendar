import {
  HOUR_PREFERENCES_CELL_CLICK, REORDER_GLOBAL_LOCATIONS,
  CHANGE_NUM_DESIRED_HOURS, RECEIVE_HOUR_PREFERENCES, CLEAR_HOUR_PREFERENCES
} from '../constants/ActionTypes';
import * as utils from '../utils/hourPreferences';
import { DEFAULT_WEEKLY_HOURS } from '../constants/Settings';
import _ from 'lodash';

const initialState = {
  numDesiredHours: DEFAULT_WEEKLY_HOURS,
  locationOrder: null,  // default
  employee: null,
  items: utils.initializeCells()
};

export default function schedule(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_HOUR_PREFERENCES:
      return {
        ...state,
        ..._.pick(action, [
          'items', 'numDesiredHours', 'locationOrder', 'employee'
        ])
      };
    case CLEAR_HOUR_PREFERENCES:
      return initialState
    case HOUR_PREFERENCES_CELL_CLICK:
      return {
        ...state,
        items: utils.toggleCell(state.items, action.index)
      };
    case REORDER_GLOBAL_LOCATIONS:
      return {...state, locationOrder: action.order};
    case CHANGE_NUM_DESIRED_HOURS:
      return {...state, numDesiredHours: action.hours};
    default: return state;
  }
}
