import {
  RECEIVE_HOUR_PREFERENCES, RECEIVE_ALL_HOUR_PREFERENCES,
  REORDER_GLOBAL_LOCATIONS, CHANGE_NUM_DESIRED_HOURS,
  HOUR_PREFERENCES_CELL_CLICK, CLEAR_HOUR_PREFERENCES
} from '../constants/ActionTypes'
import { fetch, save } from '../utils/api'

const userPath = (netId) => `/employees/${netId}/hour-preferences`

const dispatchAndSave = (data, type) => (dispatch, getState) => {
  const netId = getState().user.netId
  dispatch({...data, type})
  save(userPath(netId), getState().hourPreferences)
}

const receiveHourPreferences = (json) => (dispatch, getState) => {
  const state = getState()
  dispatch({
    type: RECEIVE_HOUR_PREFERENCES,
    ...json,
    locations: state.locations
  })
}

const receiveAllHourPreferences = (json) => ({
  type: RECEIVE_ALL_HOUR_PREFERENCES,
  preferences: json
})

const clearHourPreferences = () => ({
  type: CLEAR_HOUR_PREFERENCES
})

export const fetchHourPreferences = (netId) => (dispatch, getState) =>
  fetch(userPath(netId))
    .then(response => response.json())
    .then(json => dispatch(receiveHourPreferences(json)))
    //.catch(dispatch(clearHourPreferences()))

export const fetchAllHourPreferences = () => (dispatch, getState) =>
  fetch('/employees/hour-preferences')
    .then(response => response.json())
    .then(json => dispatch(receiveAllHourPreferences(json)))

export const reorderGlobalLocations = (order) =>
    dispatchAndSave({order}, REORDER_GLOBAL_LOCATIONS)

export const changeNumDesiredHours = (hours) =>
    dispatchAndSave({hours}, CHANGE_NUM_DESIRED_HOURS)

export const onCellClick = (index) =>
    dispatchAndSave({index}, HOUR_PREFERENCES_CELL_CLICK)
