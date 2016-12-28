import { RECEIVE_SLOTS } from '../constants/ActionTypes'

const initialState = {}

export default function slots(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_SLOTS: return action.slots
    default: return state
  }
}
