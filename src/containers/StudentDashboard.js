import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import styles from './StudentDashboard';

const StudentDashboard = ({id}) => (
  <ul>
    <li><Link to={`/schedules`}>Schedules</Link></li>
    <li><Link to={`/preferences/${id}`}>Update hour preferences</Link></li>
  </ul>
);

const mapStateToProps = state => ({
  id: state.hourPreferences.id
});

export default connect(
  mapStateToProps,
  {}
)(StudentDashboard);
