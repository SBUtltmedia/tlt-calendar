import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AdminCalendarGrid from '../components/admin/AdminCalendarGrid';
import AdminBank from '../components/admin/AdminBank';
import AdminCalendarTrash from '../components/admin/AdminCalendarTrash';
import CalendarInfoBox from '../components/CalendarInfoBox';
import styles from './SchedulePage.scss';
import _ from 'lodash';
import { setLocation, fetchSchedule } from '../actions/ScheduleActions';

@DragDropContext(HTML5Backend)
class SchedulePage extends Component {
	componentDidMount() {
		const {fetchSchedule, setLocation} = this.props;
		fetchSchedule();
		setLocation();
	}
	render () {
		console.log(this.props);
		return <div className={styles.container}>
			<h1>{this.props.loc.name}</h1>
			<AdminCalendarGrid />
      <div className="controls">
        <div className="bank"><AdminBank /></div>
        <div className="trash"><AdminCalendarTrash /></div>
        <div className="info"><CalendarInfoBox /></div>
      </div>
		</div>;
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log(state.locations);
	return {
		loc: _.find(state.locations, loc => loc.id === parseInt(ownProps.params.location))
	}
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setLocation: () => dispatch(setLocation(parseInt(ownProps.params.location))),
	fetchSchedule: () => dispatch(fetchSchedule(parseInt(ownProps.params.location)))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedulePage);
