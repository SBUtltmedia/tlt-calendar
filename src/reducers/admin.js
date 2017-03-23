import {RECEIVE_ALL_HOUR_PREFERENCES} from '../constants/ActionTypes'

const initialState = {
  hourPreferences: []
}

export default function user(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_ALL_HOUR_PREFERENCES:
      return {...state, hourPreferences: action.preferences}
    default: return state
  }
}
