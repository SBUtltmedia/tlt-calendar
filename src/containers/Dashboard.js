import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import styles from './Dashboard';

function renderAdmin(user) {
  return <ul>
    <li><Link to={`/slots`}>Change shift slots</Link></li>
    <li><Link to={`/schedules`}>Schedules</Link></li>
    <li><Link to={`/preferences`}>Student preferences</Link></li>
  </ul>;
}

function renderSiteManager(user) {
  return <ul>
    <li><Link to={`/preferences/${user.netId}`}>Update hour preferences</Link></li>
    <li><Link to={`/schedules`}>Schedules</Link></li>
  </ul>;
}

function renderEmployee(user) {
  return <ul>
    <li><Link to={`/preferences/${user.netId}`}>Update hour preferences</Link></li>
    <li><Link to={`/schedules`}>Schedules</Link></li>
  </ul>;
}

const Dashboard = ({user}) => (
  <div>
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
