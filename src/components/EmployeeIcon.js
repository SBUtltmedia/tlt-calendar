import { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import md5 from 'js-md5';
import _ from 'lodash';

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

function getSvgString(props) {
  return "data:image/svg+xml;charset=utf-8," + renderToStaticMarkup(<DefaultEmployeeIcon {...props} />);
}

const DefaultEmployeeIcon = props => (
  <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>
    <circle cx='50' cy='50' r='40' stroke='green' strokeWidth='4' fill='yellow' />
  </svg>
);

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { imageSrc: props.employee ? getGravatarIconUrl(props.employee.email) : '' }
  }

  render() {
    return <img src={this.state.imageSrc} {..._.omit(this.props, 'employee')}
            onError={() => this.setState({imageSrc: getSvgString(this.props)})} />
  }
}
