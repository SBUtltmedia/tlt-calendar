import _ from 'lodash';

export function markGravatarLoadFailed(employee) {
  return {...employee, missingGravatar: true};
}

export function markGravatarLoadFailedInList(employees, employee) {
  if (employee) {
    const index = _.findIndex(employees, e => e.id === employee.id);
    return [...employees.slice(0, index), markGravatarLoadFailed(employee), ...employees.slice(index + 1)]
  }
  return employees;
}
