import { RECEIVE_LOCATIONS } from '../constants/ActionTypes';

const initialState = [];

export default function locations(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_LOCATIONS: return action.locations;
    default: return state;
  }
}
