import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import styles from './SlotsPage.scss'
import { fetchSlots } from '../actions/SlotsActions'
import SpreadsheetDashboard from './SpreadsheetDashboard'
import SlotsView from '../components/SlotsView'
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
      <div className="controls">
				<SpreadsheetDashboard />
      </div>
			<br />
			<div>
				<SlotsView schedule="Fall Temp" location="Central Reading Room" />
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
