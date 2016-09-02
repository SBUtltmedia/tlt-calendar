import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ScheduleGrid from '../components/ScheduleGrid';
import ScheduleBank from '../components/ScheduleBank';
import Trash from '../components/Trash';
import CalendarInfoBox from '../components/CalendarInfoBox';
import Title from '../components/Title';
import SlotsOverlayToggle from '../components/SlotsOverlayToggle';
import LocationIcon from '../components/LocationIcon';
import styles from './SchedulePage.scss';
import _ from 'lodash';
import { fetchSchedule, removeItem } from '../actions/ScheduleActions';
import { fetchSlots } from '../actions/SlotsActions';

@DragDropContext(HTML5Backend)
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
				<Title icon={loc ? <LocationIcon id={loc.id} /> : null} name={loc ? loc.name : ''} />
				<SlotsOverlayToggle />
			</div>
			<ScheduleGrid disabled={!isAdmin} />
      <div className="controls">
        <div className="bank"><ScheduleBank disabled={!isAdmin} /></div>
        <div className="trash"><Trash disabled={!isAdmin} removeItem={removeItem} /></div>
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
