import { RECEIVE_SCHEDULE } from '../constants/ActionTypes'

const initialState = {}

export default function slots(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_SCHEDULE: return action.slots
    default: return state
  }
}
