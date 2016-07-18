import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import styles from './Dashboard';
import { fetchUser } from '../actions/UserActions';

import { Button } from 'react-bootstrap';
const DevelopmentOnlyLogin = ({onSelectUser}) => (
  <div style={{textAlign:'center'}}>
    <Button onClick={() => onSelectUser('rzou')} style={{margin:10}}>Student login</Button>
    <Button onClick={() => onSelectUser('admin')} style={{margin:10}}>Admin login</Button>
  </div>
);

function renderAdmin(user) {
  return <ul>
    <li><Link to={`/schedules`}>Schedules</Link></li>
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

const Dashboard = ({user, fetchUser}) => (
  <div>
    { user ? (user.isAdmin ? renderAdmin(user) : renderEmployee(user))
           : <DevelopmentOnlyLogin onSelectUser={fetchUser} /> }
  </div>
);

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  fetchUser: netid => dispatch(fetchUser(netid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);