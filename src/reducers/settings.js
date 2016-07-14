import { CHANGE_SETTINGS } from '../constants/ActionTypes';

const initialState = {};

export default function settings(state=initialState, action) {
  switch (action.type) {
    case CHANGE_SETTINGS: return action.settings;
    default: return state;
  }
}
