import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import styles from './SlotsPage.scss'
import { fetchSlots } from '../actions/SlotsActions'
import SpreadsheetDashboard from '../components/SpreadsheetDashboard'
import SpreadsheetView from '../components/SpreadsheetView'
import { receiveSlots } from '../actions/SlotsActions'
import _ from 'lodash'

class SchedulePage extends Component {
	static propTypes = {
		isAdmin: PropTypes.bool
	}

	componentWillMount() {
		this.props.fetchSlots()
	}

	render () {
		const {loc, isAdmin} = this.props
		return <div className={styles.container}>
			<h1>Edit available shift slots</h1>
      <div className="controls">
				<SpreadsheetDashboard endpoint='/slots' downloadFilename='slots.csv'
					mapStateToData={state => state.slots} receiveAction={receiveSlots} />
      </div>
			<br />
			<div>
			<SpreadsheetView columns={['Day', 'Start Time', 'End Time', 'Shift Length']}
				mapStateToData={state => state.slots} />
			</div>
		</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		isAdmin: state.user.isAdmin
	}
}

export default connect(
  mapStateToProps,
	{fetchSlots}
)(SchedulePage)
