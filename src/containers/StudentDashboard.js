import { Link } from 'react-router';
import styles from './StudentDashboard';

export default () => (
  <ul>
    <li><Link to={`/schedules`}>Schedules</Link></li>
    <li><Link to={`/preferences`}>Update hour preferences</Link></li>
  </ul>
);
