import { PLACE_CHIP, REMOVE_CHIP } from '../constants/ActionTypes';
import _ from 'lodash';
import * as calendar from '../utils/calendar';

const initialState = {
  chipsPlaced: []  // Array of integers (values)
};

export default function hourPreferences(state=initialState, action) {
  switch (action.type) {
    case PLACE_CHIP: return _.assign({}, state, {chipsPlaced: calendar.placeItem(action, state.chipsPlaced)});
    case REMOVE_CHIP: return _.assign({}, state, {chipsPlaced: calendar.removeItem(action, state.chipsPlaced)});
    default: return state;
  }
}
