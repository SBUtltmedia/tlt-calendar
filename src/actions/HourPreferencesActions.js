import { RECEIVE_HOUR_PREFERENCES, REORDER_GLOBAL_LOCATIONS, CHANGE_NUM_DESIRED_HOURS, HOUR_PREFERENCES_CELL_CLICK } from '../constants/ActionTypes';
import { HOUR_PREFERENCES } from '../constants/Constants';
import { dispatchAndSave } from '../utils/api';

export function fetchHourPreferences(netId) {
  const type = HOUR_PREFERENCES;
  return (dispatch, getState) => {
    const state = getState();
    return fetchType(type, state)
      .then(response => response.json())
      .then(json => dispatch(receiveTimelineItems(type, json)))
  }
}

function receiveTimelineItems(json) {
  return {
    type: RECEIVE_HOUR_PREFERENCES,
    ...receiveType(HOUR_PREFERENCES, json)
  }
}

export const reorderGlobalLocations = order => dispatchAndSave(HOUR_PREFERENCES, {order, type: REORDER_GLOBAL_LOCATIONS});
export const changeNumDesiredHours = hours => dispatchAndSave(HOUR_PREFERENCES, {hours, type: CHANGE_NUM_DESIRED_HOURS});
export const onCellClick = params => dispatchAndSave(HOUR_PREFERENCES, {...params, type: HOUR_PREFERENCES_CELL_CLICK});
