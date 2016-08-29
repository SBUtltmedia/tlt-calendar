import { RECEIVE_EMPLOYEES, GRAVATAR_LOAD_FAILED } from '../constants/ActionTypes';
import { markGravatarLoadFailedInList } from '../utils/employees';
import _ from 'lodash';

const initialState = [];

export default function employees(state=initialState, action) {
  switch (action.type) {
    case RECEIVE_EMPLOYEES: return _.map(action.employees, e => ({...e, name: e.firstname + ' ' + e.lastname}));
    case GRAVATAR_LOAD_FAILED: return markGravatarLoadFailedInList(state, action.employee);
    default: return state;
  }
}
