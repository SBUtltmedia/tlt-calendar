import { connect } from 'react-redux';
import EmployeeIcon from '../components/EmployeeIcon';
import styles from './SettingsPage.scss';
import { changeSettings } from '../actions/UserActions';

const AdminSettings = () => (
  <div>
    Admin Settings
  </div>
);

const EmployeeSettings = ({user}) => (
  <div>
    <h3>Icon</h3>
    <EmployeeIcon className="user-icon" employee={user} />
    <p>
      To get a custom icon, use
      <a target="_blank" href="http://gravatar.com">Gravatar</a>
      with your stonybrook.edu email.
    </p>
  </div>
);

const SettingsPage = ({user}) => (
  <div className={styles.container}>
    <h1>Settings</h1>
    {user.isAdmin ? <AdminSettings /> : <EmployeeSettings user={user} />}
  </div>
);

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  changeSettings: dispatch(changeSettings)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsPage);
