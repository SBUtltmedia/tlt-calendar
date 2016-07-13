import { LOCATIONS } from '../constants/Settings';
import { Link } from 'react-router';
import _ from 'lodash';

export default () => (
  <ul>
    {_.map(LOCATIONS, (loc, i) => <li key={i}><Link to={`/schedules/${loc.name}`}>{loc.name}</Link></li>)}
  </ul>
);
