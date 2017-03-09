import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import HoursSettings from '../components/HoursSettings'
import LocationOrder from '../components/LocationOrder'
import EmployeeTitle from '../components/EmployeeTitle'
import HourPreferencesGrid from '../components/HourPreferencesGrid'
import styles from './HourPreferences.scss'
import {fetchHourPreferences} from '../actions/HourPreferencesActions'

class HourPreferences extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,  // Params from URL
    isAdmin: PropTypes.bool
  }

  componentWillMount() {
    const {fetchHourPreferences, params:{netId}} = this.props
    fetchHourPreferences(netId)
  }

  render() {
    const {isAdmin, removeItem, employee} = this.props
    return (
      <div className={styles.container}>
        <EmployeeTitle employee={employee} />
        <div className='legend' />
        <HourPreferencesGrid />
        <div className="controls">
          <div className="hours-settings">
            <HoursSettings />
          </div>
          <div className="location-order">
            <LocationOrder />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  employee: _.find(state.employees, e => e.netId === ownProps.params.netId)
})

export default connect(
  mapStateToProps,
  {fetchHourPreferences}
)(HourPreferences)
