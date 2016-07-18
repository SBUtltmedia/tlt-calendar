import { RECEIVE_USER, CHANGE_SETTINGS } from '../constants/ActionTypes';

const initialState = null;

export default function user(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_USER: return action.user;
    case CHANGE_SETTINGS: return action.settings;
    default: return state;
  }
}
