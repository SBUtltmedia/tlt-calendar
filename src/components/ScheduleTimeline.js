import Timeline from './Timeline';
import TimelineModal from './TimelineModal';
import { connect } from 'react-redux';
import _ from 'lodash';
import { SCHEDULE, RESERVED } from '../constants/Constants';

const mapStateToProps = state => ({
	type: SCHEDULE,
	groups: state.locations,
  items: _.map(state.timeline.items,
		item => ({...item, title: item.value === RESERVED ? RESERVED : item.value.firstName + ' ' + item.value.lastName})),
	Modal: props => (<TimelineModal {...props} title='Schedule Item' useLocation={true} useEmployee={true} />)
});

export default connect(
  mapStateToProps,
  {}
)(Timeline);
