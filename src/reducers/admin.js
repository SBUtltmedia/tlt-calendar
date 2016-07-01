import { PLACE_ITEM, REMOVE_ITEM } from '../constants/ActionTypes';
//import { HOUR, HALF_HOUR } from '../constants/Constants';
import _ from 'lodash';
import * as calendar from '../utils/calendar';

const initialState = {
  calendarItems: [  // TODO: Eventually this needs to have one for each location
  	//{ day: 3, hour: 6, minute: 0, duration: HOUR, value: { name: 'Mario Mario', icon: 'mario.png' }}
  ]
};

export default function admin(state=initialState, action) {
  switch (action.type) {
    case PLACE_ITEM: return _.assign({}, state, {calendarItems: calendar.placeItem(state.calendarItems, action)});
    case REMOVE_ITEM: return _.assign({}, state, {calendarItems: calendar.removeItem(state.calendarItems, action)});
    default: return state;
  }
}
