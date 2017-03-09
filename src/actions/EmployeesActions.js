import { RECEIVE_EMPLOYEES } from '../constants/ActionTypes';
import { fetch } from '../utils/api';
import _ from 'lodash';

function receiveEmployees(json) {
  return {
    type: RECEIVE_EMPLOYEES,
    employees: json
  }
}

export function fetchEmployees() {
  return dispatch => {
    return fetch('/employees')
      .then(response => response.json())
      .then(json => dispatch(receiveEmployees(json)))
  }
}
