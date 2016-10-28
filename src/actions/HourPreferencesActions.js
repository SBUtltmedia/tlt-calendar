import { REORDER_GLOBAL_LOCATIONS, CHANGE_NUM_DESIRED_HOURS } from '../constants/ActionTypes';
import { HOUR_PREFERENCES } from '../constants/Constants';
import { dispatchAndSave } from '../utils/api';

export const reorderGlobalLocations = order => dispatchAndSave(HOUR_PREFERENCES, {order, type: REORDER_GLOBAL_LOCATIONS});
export const changeNumDesiredHours = hours => dispatchAndSave(HOUR_PREFERENCES, {hours, type: CHANGE_NUM_DESIRED_HOURS});
