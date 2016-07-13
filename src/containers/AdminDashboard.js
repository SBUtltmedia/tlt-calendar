import { Link } from 'react-router';

export default () => (
  <ul>
    <li><Link to={`/schedules`}>Calendar</Link></li>
    <li><Link to={`/admin/table`}>Table</Link></li>
  </ul>
);
