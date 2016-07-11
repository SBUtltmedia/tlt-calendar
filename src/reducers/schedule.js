import { SET_LOCATION, RECEIVE_SCHEDULE, PLACE_ITEM, REMOVE_ITEM } from '../constants/ActionTypes';
import _ from 'lodash';
import * as calendar from '../utils/calendar';

const initialState = {};

export default function schedules(state=initialState, action) {
  switch (action.type) {
    case SET_LOCATION: return {...state, location: action.location};
    case RECEIVE_SCHEDULE: return action.schedule;
    case PLACE_ITEM: return {...state, shifts: calendar.placeItem(action, state.shifts || [])};
    case REMOVE_ITEM: return {...state, shifts: calendar.removeItem(action, state.shifts || [])};
    default: return state;
  }
}
