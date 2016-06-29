import { Link } from 'react-router';

export default () => (
  <ul>
    <li><Link to={`/admin/calendar`}>Calendar</Link></li>
    <li><Link to={`/admin/table`}>Table</Link></li>
  </ul>
);