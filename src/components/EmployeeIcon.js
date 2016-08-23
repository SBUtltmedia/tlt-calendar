import { PropTypes, Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { connect } from 'react-redux';
import md5 from 'js-md5';
import _ from 'lodash';
import { gravatarLoadFailed } from '../actions/EmployeesActions';
import styles from './EmployeeIcon.scss';

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

const DefaultEmployeeIcon = ({employee}) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox="0 0 50 50">
    <g>
      <rect width='100%' height='100%' style={{fill:"#CCC"}} />
      <text textAnchor="middle" alignmentBaseline="central" x="50%" y="50%" fill="#444"
      fontFamily="sans-serif" fontSize="20">
        {getInitials(employee)}
      </text>
    </g>
  </svg>
);

function getSvgString(employee, width) {
  return "data:image/svg+xml;charset=utf-8," + renderToStaticMarkup(<DefaultEmployeeIcon employee={employee} />);
}

export function getImageSrc(employee) {
  if (employee) {
    return employee.missingGravatar ? getSvgString(employee) : getGravatarIconUrl(employee.email);
  }
  return '';
}

class EmployeeIcon extends Component {
  render() {
    const {onImageError, employee} = this.props;
    return <img className={styles.icon} src={getImageSrc(employee)} onError={() => onImageError(employee)}
        {..._.pick(this.props, ['style', 'disabled'])} />;
  }
}

EmployeeIcon.propTypes = {
  employee: PropTypes.object
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onImageError: () => dispatch(gravatarLoadFailed(ownProps.employee))
});

export default connect(
  state => ({}),
  mapDispatchToProps
)(EmployeeIcon);
