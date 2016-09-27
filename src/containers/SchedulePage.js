import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CalendarInfoBox from '../components/CalendarInfoBox';
import ScheduleTimeline from '../components/ScheduleTimeline';
import Title from '../components/Title';
import SlotsOverlayToggle from '../components/SlotsOverlayToggle';
import LocationIcon from '../components/LocationIcon';
import styles from './SchedulePage.scss';
import _ from 'lodash';
import { fetchSchedule, removeItem } from '../actions/ScheduleActions';
import { fetchSlots } from '../actions/SlotsActions';

class SchedulePage extends Component {
	static propTypes = {
		isAdmin: PropTypes.bool
	}

	componentDidMount() {
		const {fetchSchedule, fetchSlots} = this.props;
		fetchSchedule();
		fetchSlots();
	}

	render () {
		const {loc, isAdmin, removeItem} = this.props;
		return <div className={styles.container}>
			<div className="header">
				<Title icon={loc ? <LocationIcon id={loc.id} /> : null} name={loc ? loc.title : ''} />
				<SlotsOverlayToggle />
			</div>
			<ScheduleTimeline disabled={!isAdmin} />
      <div className="controls">
        <div className="info"><CalendarInfoBox /></div>
      </div>
		</div>;
	}
}

const mapStateToProps = (state, ownProps) => {
	const locationNumber = parseInt(ownProps.params.location);
	return {
		loc: _.find(state.locations, loc => loc.id === locationNumber),
		isAdmin: state.user.isAdmin || _.includes(state.user.managesSites, locationNumber)
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const locationNumber = parseInt(ownProps.params.location);
	return {
		fetchSchedule: () => dispatch(fetchSchedule(locationNumber)),
		fetchSlots: () => dispatch(fetchSlots(locationNumber)),
		removeItem: item => dispatch(removeItem(item))
	};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedulePage);
