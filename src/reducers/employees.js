import { RECEIVE_EMPLOYEES } from '../constants/ActionTypes';

const initialState = [];

export default function schedules(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_EMPLOYEES: return action.employees;
    default: return state;
  }
}
