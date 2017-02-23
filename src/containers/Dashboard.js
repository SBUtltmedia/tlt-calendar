import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import styles from './Dashboard.scss';

function renderAdmin(user) {
  return <ul>
    <li><Link to={`/slots`}>Edit availble shift slots</Link></li>
    <li><Link to={`/schedules`}>Edit generated schedule</Link></li>
    <li><Link to={`/preferences`}>Employee hour preferences</Link></li>
  </ul>;
}

function renderSiteManager(user) {
  return <ul>
    <li><Link to={`/preferences/${user.netId}`}>Update hour preferences</Link></li>
    <li><Link to={`/schedules`}>View generated schedule</Link></li>
  </ul>;
}

function renderEmployee(user) {
  return <ul>
    <li><Link to={`/preferences/${user.netId}`}>Update hour preferences</Link></li>
    <li><Link to={`/schedules`}>Edit generated schedule</Link></li>
  </ul>;
}

const Dashboard = ({user}) => (
  <div className={styles.container}>
    { user ? (user.isAdmin ? renderAdmin(user) : renderEmployee(user)) : '' }
  </div>
);

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
