import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import _ from 'lodash'
import {fetchAllHourPreferences} from '../actions/HourPreferencesActions'

class HourPreferencesList extends Component {

  componentWillMount() {
    this.props.fetchAllHourPreferences()
  }

  render() {
    const {employees} = this.props
    return (
      <div>
        <ul>
          {_.map(employees, (emp, i) => (
            <li key={i}>
              <Link to={`/preferences/${emp.netId}`}>
                {emp.lastName}, {emp.firstName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  employees: state.admin.hourPreferences.map(p => p.employee)
})

export default connect(
  mapStateToProps,
  {fetchAllHourPreferences}
)(HourPreferencesList)
