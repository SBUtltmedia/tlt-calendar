import { RECEIVE_USER, CHANGE_SETTINGS, GRAVATAR_LOAD_FAILED } from '../constants/ActionTypes';
import { markGravatarLoadFailed } from '../utils/employees';

const initialState = null;

export default function user(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_USER: return action.user;
    case CHANGE_SETTINGS: return action.settings;
    case GRAVATAR_LOAD_FAILED: return markGravatarLoadFailed(state);
    default: return state;
  }
}
