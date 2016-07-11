import { RECEIVE_SCHEDULES } from '../constants/ActionTypes';

const initialState = {
  schedules: []
};

export default function schedules(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_SCHEDULES: return action.schedules;
    default: return state;
  }
}
