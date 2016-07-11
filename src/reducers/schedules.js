import { RECEIVE_SCHEDULES, PLACE_ITEM, REMOVE_ITEM } from '../constants/ActionTypes';
import _ from 'lodash';
import * as calendar from '../utils/calendar';

const initialState = [];

function updateSchedule(schedules, location, fn) {
  const index = _.findIndex(schedules, s => s.location === location);
  return [...schedules.slice(0, index), fn(schedules[index]), ...schedules.slice(index + 1)];
}

export default function schedules(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_SCHEDULES: return action.schedules;
    case PLACE_ITEM: return updateSchedule(state, action.location, _.bind(calendar.placeItem, {}, action));
    case REMOVE_ITEM: return updateSchedule(state, action.location, _.bind(calendar.removeItem, {}, action));
    default: return state;
  }
}
