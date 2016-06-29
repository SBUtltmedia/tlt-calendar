import { PLACE_CHIP, REMOVE_CHIP } from '../constants/ActionTypes';
import _ from 'lodash';
import * as utils from '../utils/hourPreferences';

const initialState = {
  chipsPlaced: []  // Array of integers (values)
};

export default function hourPreferences(state=initialState, action) {
  switch (action.type) {
    case PLACE_CHIP: return _.assign({}, state, {chipsPlaced: utils.placeChip(state.chipsPlaced, action)});
    case REMOVE_CHIP: return _.assign({}, state, {chipsPlaced: utils.removeChip(state.chipsPlaced, action)});
    default: return state;
  }
}
