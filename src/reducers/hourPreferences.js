import { PLACE_CHIP } from '../constants/ActionTypes';
import _ from 'lodash';
import * as utils from '../utils/hourPreferences';

const initialState = {
  chipsPlaced: []
};

export default function hourPreferences(state=initialState, action) {
  switch (action.type) {
    case PLACE_CHIP:
      const chip = { value: action.value, day: action.day, hour: action.hour };
      return _.assign({}, state, {chipsPlaced: utils.placeChip(state.chipsPlaced, chip)});
    default:
      return state;
  }
}
