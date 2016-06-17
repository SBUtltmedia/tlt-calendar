import { PLACE_CHIP } from '../constants/ActionTypes';
import _ from 'lodash';
import * as utils from '../utils/hourPreferences';
import { HOUR, HALF_HOUR } from '../constants/Constants';
import { dayHourPlus1Hour } from '../utils/time';

const initialState = {
  chipsPlaced: []
};

export default function hourPreferences(state=initialState, action) {
  const {type, day, hour, minutes} = action;
  switch (type) {
    case PLACE_CHIP:
      const chip = _.omit(action, 'type');
      switch (minutes) {
        case 0:
          const fullChip = _.assign({}, chip, {duration: HOUR});
          return _.assign({}, state, {chipsPlaced: utils.placeChip(state.chipsPlaced, fullChip)});
        case 30:
          const half1 = _.assign({}, chip, {duration: HALF_HOUR});
          const half2 = _.assign({}, half1, {...dayHourPlus1Hour(day, hour), minutes: 0});
          return _.assign({}, state, {chipsPlaced: utils.placeChip(utils.placeChip(state.chipsPlaced, half1), half2)});
        default: throw new Error(`Invalid minutes ${minutes}`);
      }
    default:
      return state;
  }
}
