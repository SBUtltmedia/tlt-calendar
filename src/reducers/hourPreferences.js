import { RECEIVE_HOUR_PREFERENCES, ADD_HOUR_PREFERENCE, REMOVE_HOUR_PREFERENCE, REORDER_GLOBAL_LOCATIONS, CHANGE_NUM_DESIRED_HOURS, GRAVATAR_LOAD_FAILED } from '../constants/ActionTypes';
import { markGravatarLoadFailed } from '../utils/employees';
import { DEFAULT_WEEKLY_HOURS } from '../constants/Settings';
import moment from 'moment';
import * as timeline from '../utils/timeline';
import _ from 'lodash';

const initialState = {
  preferences: [
	  {id: 2, value: 2, start_time: moment().add(2, 'hour'), end_time: moment().add(4, 'hour')},
	  {id: 3, value: 3, start_time: moment().add(5, 'hour'), end_time: moment().add(7, 'hour')}
	],
  numDesiredHours: DEFAULT_WEEKLY_HOURS,
  locationOrder: null,  // default
  employee: null
};

export default function schedule(state=initialState, action) {
  switch (action.type) {
    case ADD_HOUR_PREFERENCE:
      return {...state, preferences: timeline.addItem(state.preferences, action.item)};
      case REMOVE_HOUR_PREFERENCE:
        return {...state, preferences: timeline.removeItem(state.preferences, action.itemId)};
    default: return state;
  }
}
