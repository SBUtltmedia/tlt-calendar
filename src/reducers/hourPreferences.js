import { SET_EMPLOYEE, RECEIVE_TIMELINE_ITEMS, REORDER_GLOBAL_LOCATIONS, CHANGE_NUM_DESIRED_HOURS, GRAVATAR_LOAD_FAILED } from '../constants/ActionTypes';
import { markGravatarLoadFailed } from '../utils/employees';
import { DEFAULT_WEEKLY_HOURS } from '../constants/Settings';
import _ from 'lodash';

const initialState = {
  numDesiredHours: DEFAULT_WEEKLY_HOURS,
  locationOrder: null,  // default
  employee: null
};

export default function schedule(state=initialState, action) {
  switch (action.type) {
    case SET_EMPLOYEE: return {...state, employee: action.employee};
    case RECEIVE_TIMELINE_ITEMS: return {...state, ..._.pick(action, ['numDesiredHours', 'locationOrder', 'employee'])};
    case REORDER_GLOBAL_LOCATIONS: return {...state, locationOrder: action.order};
    case CHANGE_NUM_DESIRED_HOURS: return {...state, numDesiredHours: action.hours};
    default: return state;
  }
}
