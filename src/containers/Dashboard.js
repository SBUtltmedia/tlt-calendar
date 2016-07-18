import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import styles from './Dashboard';

function renderAdmin(user) {
  return <ul>
    <li><Link to={`/schedules`}>Calendar</Link></li>
    <li><Link to={`/preferences`}>Student preferences</Link></li>
    <li><Link to={`/admin/table`}>Table (experimental)</Link></li>
  </ul>;
}

function renderEmployee(user) {
  return <ul>
    <li><Link to={`/schedules`}>Schedules</Link></li>
    <li><Link to={`/preferences/${user.id}`}>Update hour preferences</Link></li>
  </ul>;
}

const Dashboard = ({user}) => (
  <div>{user.isAdmin ? renderAdmin(user) : renderEmployee(user)}</div>
);

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
