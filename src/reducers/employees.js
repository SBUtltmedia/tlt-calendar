import { RECEIVE_EMPLOYEES, GRAVATAR_LOAD_FAILED } from '../constants/ActionTypes';
import { markGravatarLoadFailedInList } from '../utils/employees';

const initialState = [];

export default function employees(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_EMPLOYEES: return action.employees;
    case GRAVATAR_LOAD_FAILED: return markGravatarLoadFailedInList(state, action.employee);
    default: return state;
  }
}
