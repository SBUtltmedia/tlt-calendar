import { PLACE_CHIP } from '../constants/ActionTypes';
import _ from 'lodash';
import * as utils from '../utils/hourPreferences';
import { HOUR, HALF_HOUR } from '../constants/Constants';

const initialState = {
  chipsPlaced: []  // Array of integers (values)
};

export default function hourPreferences(state=initialState, action) {
  const {type, day, hour, minute} = action;
  switch (type) {
    case PLACE_CHIP:
      const chip = _.omit(action, 'type');
      return _.assign({}, state, {chipsPlaced: utils.placeChip(state.chipsPlaced, chip)});
    default:
      return state;
  }
}
