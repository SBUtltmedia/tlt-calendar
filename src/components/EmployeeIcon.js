import { PropTypes } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { connect } from 'react-redux';
import md5 from 'js-md5';
import _ from 'lodash';
import { gravatarLoadFailed } from '../actions/EmployeesActions';

const DOMProperty = require('react/lib/ReactInjection').DOMProperty;
DOMProperty.injectDOMPropertyConfig({
  Properties: {
    xmlns: DOMProperty.MUST_USE_ATTRIBUTE
  },
  isCustomAttribute: (attributeName) => {
    return attributeName === 'xmlns';
  }
});

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
  <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
    <g>
      <rect width='100%' height='100%' style={{fill:"#CCC"}} />
      <text textAnchor="middle" alignmentBaseline="central" x="50%" y="50%" fill="#444" fontFamily="sans-serif" fontSize="1.5em">
        {getInitials(props.employee)}
      </text>
    </g>
  </svg>
);

function getSvgString(props) {
  return "data:image/svg+xml;charset=utf-8," + renderToStaticMarkup(<DefaultEmployeeIcon {...props} />);
}

function getImageSrc(props) {
  const { employee } = props;
  if (employee) {
    return employee.missingGravatar ? getSvgString(props) : getGravatarIconUrl(employee.email);
  }
  return '';
}

const EmployeeIcon = props => (
  <img src={getImageSrc(props)} onError={() => props.onImageError(props.employee)}
    {..._.omit(props, ['employee', 'onImageError'])} />
);

EmployeeIcon.propTypes = {
  employee: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onImageError: () => dispatch(gravatarLoadFailed(ownProps.employee))
});

export default connect(
  state => ({}),
  mapDispatchToProps
)(EmployeeIcon);
