import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

const SchedulesPage = ({locations}) => (
  <ul>
    {_.map(locations, (loc, i) => <li key={i}><Link to={`/schedules/${loc.id}`}>{loc.name}</Link></li>)}
  </ul>
);

export default connect(
  state => ({locations: state.locations}),
  {}
)(SchedulesPage);
