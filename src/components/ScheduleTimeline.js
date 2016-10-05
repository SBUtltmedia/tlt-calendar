import Timeline from './Timeline';
import { connect } from 'react-redux';
import _ from 'lodash';
import ScheduleModal from './ScheduleModal';

const mapStateToProps = state => ({
	groups: state.locations,
  items: state.schedule.shifts,
	Modal: ScheduleModal
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
