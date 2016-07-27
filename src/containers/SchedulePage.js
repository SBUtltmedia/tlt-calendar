import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AdminScheduleGrid from '../components/admin/AdminScheduleGrid';
import AdminScheduleBank from '../components/admin/AdminScheduleBank';
import Trash from '../components/Trash';
import CalendarInfoBox from '../components/CalendarInfoBox';
import styles from './SchedulePage.scss';
import _ from 'lodash';
import { setLocation, fetchSchedule, removeItem } from '../actions/ScheduleActions';

@DragDropContext(HTML5Backend)
class SchedulePage extends Component {
	static propTypes = {
		isAdmin: PropTypes.bool
	}

	componentDidMount() {
		const {fetchSchedule, setLocation} = this.props;
		fetchSchedule();
		setLocation();
	}

	render () {
		const {loc, isAdmin, removeItem} = this.props;
		return <div className={styles.container}>
			<h1>{loc ? loc.name : ''}</h1>
			<AdminScheduleGrid disabled={!isAdmin} />
      <div className="controls">
        <div className="bank"><AdminScheduleBank disabled={!isAdmin} /></div>
        <div className="trash"><Trash disabled={!isAdmin} removeItem={removeItem} /></div>
        <div className="info"><CalendarInfoBox /></div>
      </div>
		</div>;
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		loc: _.find(state.locations, loc => loc.id === parseInt(ownProps.params.location)),
		isAdmin: state.user.isAdmin
	}
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setLocation: () => dispatch(setLocation(parseInt(ownProps.params.location))),
	fetchSchedule: () => dispatch(fetchSchedule(parseInt(ownProps.params.location))),
	removeItem: item => dispatch(removeItem(item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedulePage);
