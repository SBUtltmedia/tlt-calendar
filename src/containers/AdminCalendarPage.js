import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AdminCalendarGrid from '../components/admin/AdminCalendarGrid';
import AdminBank from '../components/admin/AdminBank';
import AdminCalendarTrash from '../components/admin/AdminCalendarTrash';
import CalendarInfoBox from '../components/CalendarInfoBox';
import styles from './AdminCalendarPage.scss';
import * as ScheduleActions from '../actions/ScheduleActions';

@DragDropContext(HTML5Backend)
class AdminCalendarPage extends Component {
	componentWillMount() {
		this.props.fetchSchedule();
		this.props.setLocation();
	}
	render () {
		return <div className={styles.container}>
			<h1>{this.props.location}</h1>
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
	return {
		location: ownProps.params.location
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const location = ownProps.params.location;
  const scheduleActions = bindActionCreators(ScheduleActions, dispatch);
  return {
    setLocation: _.bind(scheduleActions.setLocation, {}, location),
		fetchSchedule: _.bind(scheduleActions.fetchSchedule, {}, location)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCalendarPage);
