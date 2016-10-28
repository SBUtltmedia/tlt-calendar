import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import HoursSettings from '../components/HoursSettings';
import LocationOrder from '../components/LocationOrder';
import Title from '../components/Title';
import CalendarInfoBox from '../components/CalendarInfoBox';
import EmployeeIcon from '../components/EmployeeIcon';
import styles from './HourPreferences.scss';
import HourPreferencesTimeline from '../components/HourPreferencesTimeline';
import { setEmployee } from '../actions/EmployeesActions';

class HourPreferences extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,  // Params from URL
    isAdmin: PropTypes.bool
  }

  componentWillMount() {
    const {setEmployee, params:{netId}} = this.props;
    setEmployee(netId);
  }

  render() {
    const {employee, isAdmin, removeItem} = this.props;
    return <div className={styles.container}>
      <Title icon={employee ? <EmployeeIcon employee={employee} /> : null}
        name={employee ? (employee.firstName || '') + ' ' + (employee.lastName || '') : ''} />
      <HourPreferencesTimeline disabled={isAdmin} />
      <div className="controls">
        <div className="hours-settings"><HoursSettings disabled={isAdmin} /></div>
        <div className="location-order"><LocationOrder disabled={isAdmin} /></div>
        <div className="info"><CalendarInfoBox /></div>
      </div>
    </div>;
  }
}

const mapStateToProps = state => ({
	employee: state.hourPreferences.employee,
  isAdmin: state.user.isAdmin  // user could be null but they should then be redirected to login anyway
});

export default connect(
  mapStateToProps,
  { setEmployee }
)(HourPreferences);
