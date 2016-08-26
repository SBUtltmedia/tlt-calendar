import { RECEIVE_USER, CHANGE_SETTINGS, GRAVATAR_LOAD_FAILED, LOGGED_OUT } from '../constants/ActionTypes';
import { markGravatarLoadFailed } from '../utils/employees';

const initialState = {
  managesSites: []
};

export default function user(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_USER: return {...action.user, name: action.user.firstname + ' ' + action.user.lastname};
    case CHANGE_SETTINGS: return action.settings;
    case GRAVATAR_LOAD_FAILED: return markGravatarLoadFailed(state);
    case LOGGED_OUT: return null;
    default: return state;
  }
}
