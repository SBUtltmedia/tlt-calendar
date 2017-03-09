import { RECEIVE_USER, CHANGE_SETTINGS, LOGGED_OUT } from '../constants/ActionTypes';

const initialState = {
  managesSites: []
};

export default function user(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_USER: return action.user;
    case CHANGE_SETTINGS: return action.settings;
    case LOGGED_OUT: return null;
    default: return state;
  }
}
