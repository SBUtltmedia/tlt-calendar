import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import HoursSettings from '../components/HoursSettings'
import LocationOrder from '../components/LocationOrder'
import Title from '../components/Title'
import HourPreferencesGrid from '../components/HourPreferencesGrid'
import EmployeeIcon from '../components/EmployeeIcon'
import styles from './HourPreferences.scss'
import {setEmployee} from '../actions/EmployeesActions'
import {fetchHourPreferences} from '../actions/HourPreferencesActions'

class HourPreferences extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,  // Params from URL
    isAdmin: PropTypes.bool
  }

  componentWillMount() {
    const {setEmployee, fetchHourPreferences, params:{netId}} = this.props
    setEmployee(netId)
    fetchHourPreferences(netId)
  }

  render() {
    const {employee, isAdmin, removeItem} = this.props
    return <div className={styles.container}>
      <Title icon={employee ? <EmployeeIcon employee={employee} /> : null}
        name={employee ? (employee.firstName || '') + ' ' + (employee.lastName || '') : ''} />
      <div className='legend' />
      <HourPreferencesGrid disabled={isAdmin} />
      <div className="controls">
        <div className="hours-settings">
          <HoursSettings disabled={isAdmin} />
        </div>
        <div className="location-order">
          <LocationOrder disabled={isAdmin} />
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
	employee: state.user,
  isAdmin: state.user.isAdmin  // user could be null but they should then be redirected to login anyway
})

export default connect(
  mapStateToProps,
  { setEmployee, fetchHourPreferences }
)(HourPreferences)
