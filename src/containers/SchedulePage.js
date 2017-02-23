import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import styles from './SchedulePage.scss'
import SpreadsheetDashboard from '../components/SpreadsheetDashboard'
import SpreadsheetView from '../components/SpreadsheetView'
import { receiveSchedule } from '../actions/ScheduleActions'
import _ from 'lodash'

class SchedulePage extends Component {
	static propTypes = {
		isAdmin: PropTypes.bool
	}

	render () {
		const {loc, isAdmin, removeItem} = this.props
		return <div className={styles.container}>
		<div className="controls">
			<SpreadsheetDashboard endpoint='/schedule' downloadFilename='schedule.csv'
				mapStateToData={state => state.schedule} receiveAction={receiveSchedule} />
		</div>
		<br />
		<div>
			<SpreadsheetView columns={['Day', 'Start Time', 'End Time', 'Shift Length']}
				mapStateToData={state => state.schedule} />
		</div>
		</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	const locationNumber = parseInt(ownProps.params.location)
	return {
		isAdmin: state.user.isAdmin || _.includes(state.user.managesSites, locationNumber)
	}
}

export default connect(
  mapStateToProps,
  {}
)(SchedulePage)
