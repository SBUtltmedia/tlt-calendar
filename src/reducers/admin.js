import { PLACE_RESERVE, REMOVE_RESERVE } from '../constants/ActionTypes';
//import { HOUR, HALF_HOUR } from '../constants/Constants';
import _ from 'lodash';
import * as utils from '../utils/admin';

const initialState = {
  calendarItems: [  // TODO: Eventually this needs to have one for each location
  	//{ day: 3, hour: 6, minute: 0, duration: HOUR, value: { name: 'Mario Mario', icon: 'mario.png' }}
  ]
};

export default function admin(state=initialState, action) {
  switch (action.type) {
    case PLACE_RESERVE: return _.assign({}, state, {calendarItems: utils.placeReserve(state.calendarItems, action)});
    case REMOVE_RESERVE: return _.assign({}, state, {calendarItems: utils.removeItem(state.calendarItems, action)});
    default: return state;
  }
}
