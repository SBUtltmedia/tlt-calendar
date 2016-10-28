import { SET_EMPLOYEE, RECEIVE_EMPLOYEES, GRAVATAR_LOAD_FAILED } from '../constants/ActionTypes';
import { fetch } from '../utils/api';
import _ from 'lodash';

export function setEmployee(netId) {
  return {
    type: SET_EMPLOYEE,
    employee: {netId}
  };
}

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

export function gravatarLoadFailed(employee) {
  return {
    type: GRAVATAR_LOAD_FAILED,
    employee: employee
  }
}
