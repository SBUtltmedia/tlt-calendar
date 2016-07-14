import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import styles from './AdminDashboard';

export default () => (
  <ul>
    <li><Link to={`/schedules`}>Calendar</Link></li>
    <li><Link to={`/preferences`}>Student preferences</Link></li>
    <li><Link to={`/admin/table`}>Table (experimental)</Link></li>
  </ul>
);
