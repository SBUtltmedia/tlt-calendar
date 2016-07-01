import { FILL_INFO_BOX, CLEAR_INFO_BOX } from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = {
  infoType: null,
  data: null
};

export default function hourPreferences(state=initialState, action) {
  switch (action.type) {
    case FILL_INFO_BOX: return {infoType: action.infoType, data: action.data};
    case CLEAR_INFO_BOX: return initialState;
    default: return state;
  }
}
