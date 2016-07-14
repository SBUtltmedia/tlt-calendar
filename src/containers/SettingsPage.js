import { connect } from 'react-redux';
import styles from './SettingsPage.scss';
import { changeSettings } from '../actions/SettingsActions';

const SettingsPage = () => (
  <div className={styles.container}>
    Settings
  </div>
);

const mapStateToProps = state => ({
  employee: state.employee
});

const mapDispatchToProps = dispatch => ({
  changeSettings: dispatch(changeSettings)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsPage);
