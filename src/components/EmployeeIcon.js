import { PropTypes, Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { connect } from 'react-redux';
import Dimensions from 'react-dimensions';
import md5 from 'js-md5';
import _ from 'lodash';
import { gravatarLoadFailed } from '../actions/EmployeesActions';
import styles from './EmployeeIcon.scss';

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
      <text textAnchor="middle" alignmentBaseline="central" x="50%" y="50%" fill="#444"
      fontFamily="sans-serif" fontSize={`${Math.round(props.containerWidth / 2.5)}px`}>
        {getInitials(props.employee)}
      </text>
    </g>
  </svg>
);

function getSvgString(props) {
  console.log(renderToStaticMarkup(<DefaultEmployeeIcon {...props} />));
  return "data:image/svg+xml;charset=utf-8," + renderToStaticMarkup(<DefaultEmployeeIcon {...props} />);
}

function getImageSrc(props) {
  const { employee } = props;
  if (employee) {
    return employee.missingGravatar ? getSvgString(props) : getGravatarIconUrl(employee.email);
  }
  return '';
}

class EmployeeIcon extends Component {
  render() {
    const {onImageError, employee} = this.props;

    console.log(this.props);

    return <img className={styles.icon} src={getImageSrc(this.props)} onError={() => onImageError(employee)}
            {..._.omit(this.props, ['employee', 'onImageError', 'containerWidth', 'containerHeight', 'updateDimensions'])} />;
  }
}

EmployeeIcon.propTypes = {
  employee: PropTypes.object
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onImageError: () => dispatch(gravatarLoadFailed(ownProps.employee))
});

export default Dimensions()(connect(
  state => ({}),
  mapDispatchToProps
)(EmployeeIcon));
