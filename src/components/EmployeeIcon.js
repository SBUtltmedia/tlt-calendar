import md5 from 'js-md5';
import _ from 'lodash';

function getGravatarIconUrl(email) {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}?d=404`;
}

function getInitials(employee) {
  if (employee) {
    const initials = employee.name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }
  return '';
}

const DefaultEmployeeIcon = props => (
  <div {..._.omit(props, 'employee')}>
    {getInitials(props.employee)}
  </div>
);

const GravatarEmployeeIcon = props => (
  <img onError={() => console.log(this)} src={props.employee ? getGravatarIconUrl(props.employee.email) : ''} {..._.omit(props, 'employee')} />
);

export default props => (
  <GravatarEmployeeIcon {...props} />
);
