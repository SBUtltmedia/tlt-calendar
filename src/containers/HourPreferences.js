import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import HoursSettings from '../components/HoursSettings'
import LocationOrder from '../components/LocationOrder'
import EmployeeTitle from '../components/EmployeeTitle'
import HourPreferencesGrid from '../components/HourPreferencesGrid'
import {fetchHourPreferences} from '../actions/HourPreferencesActions'
import styles from './HourPreferences.scss'
import * as _ from 'lodash'

class HourPreferences extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,  // Params from URL
    isAdmin: PropTypes.bool
  }

  componentWillMount() {
    const {fetchHourPreferences, params:{netId}, isAdmin} = this.props
    if (!isAdmin) {
      fetchHourPreferences(netId)
    }
  }

  render() {
    const {isAdmin, removeItem, employee, hourPreferences} = this.props
    if (hourPreferences) {
      return (
        <div className={styles.container}>
          <EmployeeTitle employee={employee} />
          <div className='legend' />
          <HourPreferencesGrid items={hourPreferences.items} />
          <div className="controls">
            <div className="hours-settings">
              <HoursSettings numDesiredHours={hourPreferences.numDesiredHours} />
            </div>
            <div className="location-order">
              <LocationOrder locationOrder={hourPreferences.locationOrder} />
            </div>
          </div>
        </div>
      )
    }
    else {
      // List not loaded for admin, go back to list page
      window.location.href = '/#/preferences'
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const isAdmin = state.user.isAdmin
  const hourPreferences =
    isAdmin ?
      _.find(state.admin.hourPreferences, p => p.employee.netId === ownProps.params.netId) :
      state.hourPreferences
  return {
    isAdmin,
    hourPreferences,
    employee: isAdmin ? (hourPreferences ? hourPreferences.employee : null) : state.user
  }
}

export default connect(
  mapStateToProps,
  {fetchHourPreferences}
)(HourPreferences)
