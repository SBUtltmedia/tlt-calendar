require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import { DATA_PATH } from '../constants/Settings';
import { RECEIVE_EMPLOYEES } from '../constants/ActionTypes';

function receiveEmployees(json) {
  return {
    type: RECEIVE_EMPLOYEES,
    employees: json
  }
}

export function fetchEmployees() {
  return dispatch => {
    return fetch(`${DATA_PATH}/employees.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveEmployees(json)))
  }
}
