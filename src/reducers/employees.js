import { RECEIVE_EMPLOYEES } from '../constants/ActionTypes';
import { markGravatarLoadFailedInList } from '../utils/employees';

const initialState = [];

export default function employees(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_EMPLOYEES: return action.employees;
    default: return state;
  }
}
