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
    <table>
      <tbody>
        <tr>
          <td>Icon</td>
          <td>
            <EmployeeIcon className="user-icon" employee={user} />
            <div>
              <div><a type="button" className="btn btn-default" target="_blank" href="http://gravatar.com">Change icon</a></div>
              <div>
                To get a custom icon, use <a target="_blank" href="http://gravatar.com">Gravatar</a> with your stonybrook.edu email.
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
  </div>
);

const SettingsPage = ({user}) => (
  <div className={styles.container}>
    <h2>Settings</h2>
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
