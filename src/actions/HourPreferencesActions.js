import { RECEIVE_HOUR_PREFERENCES, REORDER_GLOBAL_LOCATIONS, CHANGE_NUM_DESIRED_HOURS, HOUR_PREFERENCES_CELL_CLICK } from '../constants/ActionTypes'
import { fetch, save } from '../utils/api'

const path = (netId) => `/employees/${netId}/hour-preferences`

const dispatchAndSave = (data, type) => (dispatch, getState) => {
  const netId = getState().user.netId
  dispatch({...data, type})
  save(path(netId), getState().hourPreferences)
}

const receiveTimelineItems = (json) => ({
  type: RECEIVE_HOUR_PREFERENCES,
  ...json
})

export const fetchHourPreferences = (netId) => (dispatch, getState) =>
  fetch(path(netId))
    .then(response => response.json())
    .then(json => dispatch(receiveTimelineItems(json)))

export const reorderGlobalLocations = (order) =>
    dispatchAndSave({order}, REORDER_GLOBAL_LOCATIONS)

export const changeNumDesiredHours = (hours) =>
    dispatchAndSave({hours}, CHANGE_NUM_DESIRED_HOURS)

export const onCellClick = (index) =>
    dispatchAndSave({index}, HOUR_PREFERENCES_CELL_CLICK)
