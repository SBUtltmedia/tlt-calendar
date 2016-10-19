import { REORDER_GLOBAL_LOCATIONS, CHANGE_NUM_DESIRED_HOURS, GRAVATAR_LOAD_FAILED } from '../constants/ActionTypes';
import { markGravatarLoadFailed } from '../utils/employees';
import { DEFAULT_WEEKLY_HOURS } from '../constants/Settings';

const initialState = {
  numDesiredHours: DEFAULT_WEEKLY_HOURS,
  locationOrder: null,  // default
  employee: null
};

export default function schedule(state=initialState, action) {
  switch (action.type) {
    default: return state;
  }
}
