import md5 from 'js-md5';
import _ from 'lodash';

function getGravatarIconUrl(email) {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${email}?d=mm`;
}

function getInitials(employee) {
  if (employee) {
    const initials = employee.name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }
  return '';
}

const DefaultEmployeeIcon = props => (
  <div {..._.without(props, 'employee')}>
    {getInitials(props.employee)}
  </div>
);

const GravatarEmployeeIcon = props => (
  <img src={props.employee ? getGravatarIconUrl(props.employee.email) : ''} {..._.without(props, 'employee')} />
);

export default props => (
  <GravatarEmployeeIcon {...props} />
);
