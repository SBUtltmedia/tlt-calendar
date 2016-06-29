import { PLACE_RESERVE, REMOVE_RESERVE } from '../constants/ActionTypes';
import _ from 'lodash';
import * as utils from '../utils/admin';

const initialState = {
  reserves: []  // Array of bools
};

export default function admin(state=initialState, action) {
  switch (action.type) {
    case PLACE_RESERVE: return _.assign({}, state, {reserves: utils.placeReserve(state.reserves, action)});
    case REMOVE_RESERVE: return _.assign({}, state, {reserves: utils.removeReserve(state.reserves, action)});
    default: return state;
  }
}
