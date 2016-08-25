import { RECEIVE_SCHEDULE, PLACE_ITEM, REMOVE_ITEM } from '../constants/ActionTypes';
import * as calendar from '../utils/calendar';
import { placeItem } from '../utils/schedule';

const initialState = {
  shifts: {},
  location: undefined
};

export default function schedule(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_SCHEDULE: return {...state, shifts: calendar.putIntoBuckets(action.shifts), location: action.location};
    case PLACE_ITEM:
      const coverage = state.location.coverage || 1;
      return {...state, shifts: placeItem(state.shifts, action, {
        maxItems: coverage,
        defaultGranularity: calendar.getDefaultGranularity(coverage)
      })};
    case REMOVE_ITEM: return {...state, shifts: calendar.removeItem(state.shifts, action)};
    default: return state;
  }
}
