import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

const LocationList = ({locations, path}) => (
  <ul>
    {_.map(locations, (loc, i) => <li key={i}><Link to={`${path}/${loc.id}`}>{loc.title}</Link></li>)}
  </ul>
);

LocationList.propTypes = {
  path: PropTypes.string.isRequired
};

export default connect(
  state => ({locations: state.locations}),
  {}
)(LocationList);
