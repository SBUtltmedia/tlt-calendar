import _ from 'lodash';

export function markGravatarLoadFailed(employees, employee) {
  if (employee) {
    const index = _.findIndex(employees, e => e.id === employee.id);
    return [...employees.slice(0, index), {...employee, missingGravatar: true}, ...employees.slice(index + 1)]
  }
  return employees;
}
