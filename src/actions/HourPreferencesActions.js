import { REORDER_GLOBAL_LOCATIONS, CHANGE_NUM_DESIRED_HOURS } from '../constants/ActionTypes';

export function reorderGlobalLocations(order) {
  dispatchAndSave({order, type: REORDER_GLOBAL_LOCATIONS});
}

export function changeNumDesiredHours(hours) {
  dispatchAndSave({hours, type: CHANGE_NUM_DESIRED_HOURS});
}
